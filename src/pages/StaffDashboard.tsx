import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FilePlus, Clock, CheckCircle, XCircle, Eye, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NoticeForm } from "@/components/staff/NoticeForm";

const StaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const stats = [
    { title: "My Drafts", value: "5", icon: FileText, color: "text-muted-foreground" },
    { title: "Pending Approval", value: "8", icon: Clock, color: "text-gold" },
    { title: "Published", value: "42", icon: CheckCircle, color: "text-notice-approved" },
    { title: "Total Views", value: "12.5K", icon: Eye, color: "text-primary" },
  ];

  const myNotices = [
    {
      title: "Faculty Meeting Schedule - December 2024",
      status: "pending",
      date: "2 hours ago",
      views: 0,
    },
    {
      title: "Research Grant Application Deadline",
      status: "approved",
      date: "1 day ago",
      views: 234,
    },
    {
      title: "Workshop on Academic Writing",
      status: "draft",
      date: "3 days ago",
      views: 0,
    },
  ];

  const pendingApprovals = [
    {
      title: "Final Exam Schedule - Semester 1",
      submittedBy: "Dr. John Mugisha",
      department: "Business Administration",
      date: "1 hour ago",
    },
    {
      title: "Student Exchange Program Announcement",
      submittedBy: "Prof. Sarah Namukasa",
      department: "International Relations",
      date: "3 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 md:px-6">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Staff Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your notices and approvals
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-light">
            <FilePlus className="mr-2 h-4 w-4" />
            Create New Notice
          </Button>
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

        {/* Notice Management Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[300px]">
            <TabsTrigger value="overview">
              <FileText className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="create">
              <Plus className="h-4 w-4 mr-2" />
              Create Notice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* My Notices */}
              <Card className="border-border/40">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>My Notices</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myNotices.map((notice, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-lg border border-border/40 hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm mb-1">{notice.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{notice.date}</span>
                            <span>•</span>
                            <span>{notice.views} views</span>
                          </div>
                        </div>
                        <div>
                          {notice.status === "approved" && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-notice-approved/10 text-notice-approved">
                              Approved
                            </span>
                          )}
                          {notice.status === "pending" && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold">
                              Pending
                            </span>
                          )}
                          {notice.status === "draft" && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                              Draft
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Approvals */}
              <Card className="border-border/40">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Pending Approvals</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((notice, index) => (
                      <div key={index} className="p-3 rounded-lg border border-border/40 hover:border-gold/50 transition-colors cursor-pointer">
                        <h3 className="font-medium text-sm mb-2">{notice.title}</h3>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>By {notice.submittedBy}</p>
                          <p>{notice.department}</p>
                          <p>{notice.date}</p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="flex-1 bg-notice-approved hover:bg-notice-approved/90">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                            <XCircle className="mr-1 h-3 w-3" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="create">
            <NoticeForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StaffDashboard;
