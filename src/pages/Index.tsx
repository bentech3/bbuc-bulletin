import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { NoticeCard } from "@/components/NoticeCard";
import { StatsOverview } from "@/components/StatsOverview";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { loading: authLoading } = useAuth();
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

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
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 md:px-6 md:py-12">
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary via-secondary to-gold py-12 md:py-20">
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Bishop Barham University College
            </h1>
            <p className="text-lg text-primary-foreground/90 md:text-xl">
              Digital Notice Board System - Your central hub for official university communications, announcements, and updates.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </section>

      {/* Main Content */}
      <main className="container px-4 py-8 md:px-6 md:py-12">
        {/* Stats Overview */}
        <section className="mb-8">
          <StatsOverview />
        </section>

        {/* Filters */}
        <section className="mb-8">
          <FilterBar />
        </section>

        {/* Notices Grid */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Latest Notices</h2>
            <p className="text-sm text-muted-foreground">
              Showing {notices.length} notices
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                views={notice.views}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 Bishop Barham University College. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">About</a>
              <a href="#" className="transition-colors hover:text-foreground">Contact</a>
              <a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
