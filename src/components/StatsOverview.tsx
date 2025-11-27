import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, Eye } from "lucide-react";

export const StatsOverview = () => {
  const stats = [
    {
      icon: FileText,
      label: "Total Notices",
      value: "248",
      trend: "+12 this week",
      color: "text-primary",
    },
    {
      icon: CheckCircle,
      label: "Approved",
      value: "234",
      trend: "94.4% approval rate",
      color: "text-notice-approved",
    },
    {
      icon: Clock,
      label: "Pending",
      value: "14",
      trend: "Avg. 2 days review",
      color: "text-notice-pending",
    },
    {
      icon: Eye,
      label: "Total Views",
      value: "12.4K",
      trend: "+2.3K this week",
      color: "text-gold",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="transition-all duration-300 hover:shadow-md">
          <CardContent className="flex items-start gap-4 p-6">
            <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.trend}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
