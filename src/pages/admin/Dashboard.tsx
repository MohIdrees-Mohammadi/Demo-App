import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Newspaper, Wrench, Briefcase, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { data: newsCount } = useQuery({
    queryKey: ["admin-news-count"],
    queryFn: async () => {
      const { count } = await supabase.from("news").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: servicesCount } = useQuery({
    queryKey: ["admin-services-count"],
    queryFn: async () => {
      const { count } = await supabase.from("services").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const stats = [
    { label: "News Articles", count: newsCount ?? 0, icon: Newspaper, color: "bg-blue-500/10 text-blue-600" },
    { label: "Services", count: servicesCount ?? 0, icon: Wrench, color: "bg-emerald-500/10 text-emerald-600" },
    { label: "What We Do", count: 1, icon: Briefcase, color: "bg-amber-500/10 text-amber-600" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">Manage your website content from here.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border p-6 flex items-center gap-4">
              <div className={`w-12 h-12 flex items-center justify-center rounded ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.count}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-bold text-foreground">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="/admin/news" className="block p-4 bg-muted hover:bg-primary/10 border border-border hover:border-primary transition-colors text-center">
              <Newspaper className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-foreground">Manage News</p>
            </a>
            <a href="/admin/services" className="block p-4 bg-muted hover:bg-primary/10 border border-border hover:border-primary transition-colors text-center">
              <Wrench className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-foreground">Manage Services</p>
            </a>
            <a href="/admin/what-we-do" className="block p-4 bg-muted hover:bg-primary/10 border border-border hover:border-primary transition-colors text-center">
              <Briefcase className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-foreground">Edit What We Do</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
