import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Bookmark, MessageSquare, Eye, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NoticeCard } from "@/components/NoticeCard";
import { Input } from "@/components/ui/input";

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      fetchNotices();
    }
  }, [user, navigate]);

  const fetchNotices = async () => {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select(`
          *,
          profiles:author_id (
            full_name
          )
        `)
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: "Unread Notices", value: "8", icon: Bell, color: "text-gold" },
    { title: "Bookmarked", value: "15", icon: Bookmark, color: "text-primary" },
    { title: "My Comments", value: "23", icon: MessageSquare, color: "text-secondary" },
    { title: "Total Viewed", value: "142", icon: Eye, color: "text-muted-foreground" },
  ];

  const categories = [
    { name: "Academic", count: 12, color: "bg-primary" },
    { name: "Events", count: 8, color: "bg-secondary" },
    { name: "Student Affairs", count: 15, color: "bg-gold" },
    { name: "Administration", count: 5, color: "bg-notice-approved" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 md:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest notices and announcements
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search notices by title or content..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/40">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - Latest Notices */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Latest Notices</h2>
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                View All
              </Button>
            </div>
            
            <div className="grid gap-6">
              {notices.map((notice) => (
                <NoticeCard 
                  key={notice.id}
                  title={notice.title}
                  content={notice.content}
                  author={notice.profiles?.full_name || "Unknown"}
                  date={new Date(notice.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                  category={notice.category}
                  status={notice.status}
                  views={notice.view_count || 0}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${category.color}`}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{category.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Push Notifications</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
