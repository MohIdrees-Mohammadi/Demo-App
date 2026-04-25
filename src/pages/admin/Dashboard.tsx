import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Wrench, FolderKanban, Briefcase, Inbox, ArrowUpRight, Palette, Activity, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: servicesCount } = useQuery({
    queryKey: ["admin-services-count"],
    queryFn: async () => {
      const { count } = await supabase.from("services").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });
  const { data: projectsCount } = useQuery({
    queryKey: ["admin-projects-count"],
    queryFn: async () => {
      const { count } = await supabase.from("projects" as any).select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });
  const { data: jobsCount } = useQuery({
    queryKey: ["admin-jobs-count"],
    queryFn: async () => {
      const { count } = await supabase.from("job_postings" as any).select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });
  const { data: quotesCount } = useQuery({
    queryKey: ["admin-quotes-count"],
    queryFn: async () => {
      const { count } = await supabase.from("quote_requests" as any).select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const stats = [
    { label: "Services", count: servicesCount ?? 0, icon: Wrench, tone: "from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-500/20", href: "/admin/services" },
    { label: "Projects", count: projectsCount ?? 0, icon: FolderKanban, tone: "from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-500/20", href: "/admin/projects" },
    { label: "Open Roles", count: jobsCount ?? 0, icon: Briefcase, tone: "from-amber-500/10 to-amber-500/5 text-amber-600 border-amber-500/20", href: "/admin/careers" },
    { label: "Quote Requests", count: quotesCount ?? 0, icon: Inbox, tone: "from-primary/10 to-primary/5 text-primary border-primary/20", href: "/admin/quotes" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl">
        <div className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary/40 text-primary-foreground p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[3px] text-primary-foreground/60 font-semibold mb-3">
                <Activity className="w-3.5 h-3.5" /> Dashboard
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold leading-tight">
                Welcome to <span className="text-primary">Brandford</span>
              </h2>
              <p className="text-primary-foreground/65 text-sm mt-2 max-w-md">
                Manage services, projects, careers, and incoming quote requests — all from here.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-primary-foreground/50">
              <Calendar className="w-3.5 h-3.5" />
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat) => (
            <Link key={stat.label} to={stat.href} className="group relative overflow-hidden bg-card border border-border p-5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30 transition-all">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.tone} opacity-60 pointer-events-none`} />
              <div className="relative flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{stat.label}</p>
                  <p className="text-3xl font-heading font-extrabold text-foreground leading-none">{stat.count}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center">
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="relative mt-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/70 group-hover:text-primary transition-colors">
                Manage <ArrowUpRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-foreground">Quick Links</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Edit Services", href: "/admin/services" },
              { label: "Add Project", href: "/admin/projects" },
              { label: "Post a Role", href: "/admin/careers" },
              { label: "View Quotes", href: "/admin/quotes" },
            ].map((a) => (
              <Link key={a.label} to={a.href} className="group flex items-center justify-between p-3 rounded-md border border-border hover:border-primary/40 hover:bg-primary/5 transition-all">
                <span className="text-sm font-medium text-foreground">{a.label}</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
