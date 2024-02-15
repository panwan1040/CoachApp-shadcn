
import Card, { CardContent, CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import BarChart from "@/components/chart/bar-chart";
import GetData from "@/components/fn/get-data";
import UpdateRecent, { UpdateRecentProps } from "@/components/report-recent/update-recent";
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

  const teamUpdateData: UpdateRecentProps[] = [
    {
      name: "Olivia Martin",
      date: "20-12-2024-22:20",
      heartRate: 99.5
    },
    {
      name: "Jackson Lee",
      date: "25-11-2024-12:50",
      heartRate: 67
    },
    {
      name: "Isabella Nguyen",
      date: "18-11-2024-17:20",
      heartRate: 73
    },
    {
      name: "William Kim",
      date: "10-11-2024-11:20",
      heartRate: 82
    },
    {
      name: "Sofia Davis",
      date: "5-01-2024-19:20",
      heartRate: 114
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
    <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <GetData />
        </CardContent>

        <CardContent className="flex justify-between gap-4">
          <p className="p-4 font-semibold">Recent Heartrate Update</p>
          {
            teamUpdateData.map((d,i) => (
              <UpdateRecent
                key={i}
                name={d.name}
                heartRate={d.heartRate}
                date={d.date}
              />
            ))
          }
          
        </CardContent>
    </section>
   </div>
  );
}
