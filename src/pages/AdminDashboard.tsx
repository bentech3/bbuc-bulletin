import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, Shield, BarChart3, Settings, AlertCircle, Building2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserManagement } from "@/components/admin/UserManagement";
import { DepartmentManagement } from "@/components/admin/DepartmentManagement";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // In production, check if user has admin role
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, color: "text-primary" },
    { title: "Total Notices", value: "456", icon: FileText, color: "text-secondary" },
    { title: "Pending Approvals", value: "23", icon: AlertCircle, color: "text-gold" },
    { title: "Active Roles", value: "11", icon: Shield, color: "text-notice-approved" },
  ];

  const quickActions = [
    { label: "Manage Users", icon: Users, description: "Add, edit, or remove users" },
    { label: "Role Management", icon: Shield, description: "Assign roles and permissions" },
    { label: "Department Setup", icon: Settings, description: "Configure departments and faculties" },
    { label: "View Analytics", icon: BarChart3, description: "System usage and statistics" },
    { label: "Audit Logs", icon: FileText, description: "Review system activity logs" },
    { label: "System Settings", icon: Settings, description: "Configure system preferences" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 md:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and system configuration
          </p>
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

        {/* Management Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="departments">
              <Building2 className="h-4 w-4 mr-2" />
              Departments
            </TabsTrigger>
            <TabsTrigger value="activity">
              <BarChart3 className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="departments">
            <DepartmentManagement />
          </TabsContent>

          <TabsContent value="activity">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">User "john@bbuc.ac.ug" created a new notice</span>
                    <span className="ml-auto text-xs text-muted-foreground">2 mins ago</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="h-2 w-2 rounded-full bg-gold"></div>
                    <span className="text-muted-foreground">Role "Dean" assigned to "mary@bbuc.ac.ug"</span>
                    <span className="ml-auto text-xs text-muted-foreground">15 mins ago</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="h-2 w-2 rounded-full bg-notice-approved"></div>
                    <span className="text-muted-foreground">Notice "Exam Schedule" approved</span>
                    <span className="ml-auto text-xs text-muted-foreground">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
