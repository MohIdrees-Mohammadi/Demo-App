import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Newspaper,
  Wrench,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Palette,
  Activity,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

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

  const { data: recentNews = [] } = useQuery({
    queryKey: ["admin-recent-news"],
    queryFn: async () => {
      const { data } = await supabase
        .from("news")
        .select("id, title, date, category, image_url, slug")
        .order("created_at", { ascending: false })
        .limit(4);
      return data ?? [];
    },
  });

  const stats = [
    {
      label: "News Articles",
      count: newsCount ?? 0,
      icon: Newspaper,
      tone: "from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-500/20",
      href: "/admin/news",
    },
    {
      label: "Services",
      count: servicesCount ?? 0,
      icon: Wrench,
      tone: "from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-500/20",
      href: "/admin/services",
    },
    {
      label: "Pages",
      count: 1,
      icon: Briefcase,
      tone: "from-amber-500/10 to-amber-500/5 text-amber-600 border-amber-500/20",
      href: "/admin/what-we-do",
    },
    {
      label: "Theme",
      count: "Active",
      icon: Palette,
      tone: "from-primary/10 to-primary/5 text-primary border-primary/20",
      href: "/admin/theme",
    },
  ];

  const quickActions = [
    { label: "New Article", icon: Newspaper, href: "/admin/news", desc: "Publish news" },
    { label: "Edit Service", icon: Wrench, href: "/admin/services", desc: "Update offerings" },
    { label: "Update Page", icon: Briefcase, href: "/admin/what-we-do", desc: "What We Do" },
    { label: "Change Theme", icon: Palette, href: "/admin/theme", desc: "Appearance" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl">
        {/* Welcome banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary/40 text-primary-foreground p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[3px] text-primary-foreground/60 font-semibold mb-3">
                <Activity className="w-3.5 h-3.5" />
                Dashboard Overview
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold leading-tight">
                Welcome Back, <span className="text-primary">Admin</span>
              </h2>
              <p className="text-primary-foreground/65 text-sm mt-2 max-w-md">
                Manage news, services, pages, and the appearance of your website — all from here.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-primary-foreground/50">
              <Calendar className="w-3.5 h-3.5" />
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.href}
              className={`group relative overflow-hidden bg-card border border-border p-5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30 transition-all`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.tone} opacity-60 pointer-events-none`}
              />
              <div className="relative flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-heading font-bold text-foreground leading-none">
                    {stat.count}
                  </p>
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

        {/* Two-column: Quick actions + Recent news */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick actions */}
          <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-foreground">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="group flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <div className="w-9 h-9 rounded-md bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors shrink-0">
                    <action.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{action.label}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{action.desc}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent news */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <Newspaper className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-foreground">Recent News</h3>
              </div>
              <Link
                to="/admin/news"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2 transition-all"
              >
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentNews.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-border rounded-lg">
                <Newspaper className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">No articles yet</p>
                <Link
                  to="/admin/news"
                  className="btn-primary inline-flex items-center gap-2 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Create First Article
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {recentNews.map((item: any) => (
                  <li key={item.id}>
                    <Link
                      to="/admin/news"
                      className="flex items-center gap-4 py-3.5 group hover:bg-muted/40 -mx-3 px-3 rounded-md transition-colors"
                    >
                      <div className="w-14 h-14 rounded-md overflow-hidden bg-muted shrink-0 border border-border">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-primary/10 text-primary rounded">
                            {item.category}
                          </span>
                          <span className="text-[11px] text-muted-foreground">{item.date}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
