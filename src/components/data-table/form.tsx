"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetClose, SheetFooter } from "../ui/sheet";


interface formProps {
  id: string;
  age: number;
  name: string;
  gender: string;
}


async function updateTeamData(
  documentId: string,
  id: string,
  age: number,
  name: string,
  gender: string
): Promise<void> {
  const docRef = doc(db, "teams", documentId);

  try {
    await updateDoc(docRef, {
      id: id,
      age: age,
      name: name,
      gender: gender,
    });
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

const formSchema = z.object({
  id: z.string(),
  age: z.string(),
  name: z.string().min(2).max(50),
  gender: z.string(),
});

export function ProfileForm( {
  id,
  age,
  name,
  gender
}: formProps ) {

  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id,
      age: age.toString(),
      name: name,
      gender: gender,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateTeamData(
      id,
      values.id,
      parseInt(values.age, 10),
      values.name,
      values.gender
    );
    form.reset();
    location.reload();

    // console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>id</FormLabel>
              <FormControl>
                <Input readOnly  value={id} placeholder={id} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>age</FormLabel>
              <FormControl>
                <Input {...field} type="number" pattern="[0-9]*" min={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="male" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">male</SelectItem>
                  <SelectItem value="female">female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <SheetFooter>
        <Button type="submit"  >Submit</Button>
          {/* <SheetClose asChild>
            
          </SheetClose> */}
        </SheetFooter>
      </form>
    </Form>
  );
}
