
import Card, { CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { 
  Airplay, Clock6, Heart, HeartPulse, ShoppingCart, TrendingUp, icons 

} from "lucide-react";
import Image from "next/image";

export default function Home() {

  const cardData: CardProps[] = [
    {
      "label": "Total revenue",
      "icon": <Airplay />,
      "amount": "$55,555,555",
      "description": "+20.1% from last month"
    },
    {
      "label": "New customers",
      "icon": <Clock6 />,
      "amount": "555",
      "description": "+5.5% from last month"
    },
    {
      "label": "Customer satisfaction",
      "icon": <Heart />,
      "amount": "95%",
      "description": "+2.5% from last month"
    },
    {
      "label": "Operational efficiency",
      "icon": <HeartPulse />,
      "amount": "85%",
      "description": "+4.1% from last month"
    }
  ];
  return (
   <div className="flex flex-col gap-5">
    <PageTitle title="Dashboard" />
    <section 
      className="grid w-full grid-cols-1 gap-4 gap-x-8 
      transition-all sm:grid-cols-2 xl:grid-cols-4"
    >
      {
        cardData.map((d,i) => (
          <Card
            key={i}
            amount={d.amount}
            description={d.description}
            icon={d.icon}
            label={d.label}
          />
        ))
      }
    </section>
   </div>
  );
}
