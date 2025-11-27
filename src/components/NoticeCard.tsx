import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoticeCardProps {
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  status: "approved" | "pending" | "draft";
  views?: number;
}

export const NoticeCard = ({ 
  title, 
  content, 
  author, 
  date, 
  category, 
  status,
  views = 0 
}: NoticeCardProps) => {
  const statusColors = {
    approved: "bg-notice-approved text-white",
    pending: "bg-notice-pending text-notice-pending-foreground",
    draft: "bg-muted text-muted-foreground",
  };

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <Badge className={statusColors[status]} variant="secondary">
            {status}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          {category}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {content}
        </p>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>{views}</span>
          </div>
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
