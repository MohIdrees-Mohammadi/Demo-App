import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import {
  LayoutDashboard,
  Newspaper,
  Wrench,
  Briefcase,
  Palette,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Bell,
  Search,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, hint: "Overview" },
  { label: "News", href: "/admin/news", icon: Newspaper, hint: "Articles" },
  { label: "Services", href: "/admin/services", icon: Wrench, hint: "Catalog" },
  { label: "What We Do", href: "/admin/what-we-do", icon: Briefcase, hint: "Page" },
  { label: "Theme", href: "/admin/theme", icon: Palette, hint: "Appearance" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { loading, logout } = useAdmin();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full" />
          <p className="text-xs uppercase tracking-[3px] text-muted-foreground font-semibold">Loading</p>
        </div>
      </div>
    );
  }

  const currentItem = navItems.find((n) => n.href === location.pathname);

  return (
    <div className="min-h-screen bg-muted/40 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-secondary text-primary-foreground transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="px-6 pt-7 pb-6 border-b border-primary-foreground/10 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-md flex items-center justify-center font-heading font-bold text-primary-foreground shadow-lg shadow-primary/30">
              A
            </div>
            <div>
              <p className="text-sm font-heading font-bold leading-tight">
                <span className="text-primary">A</span>cero<span className="text-primary">E</span>ng
              </p>
              <p className="text-[10px] uppercase tracking-[3px] text-primary-foreground/50 mt-0.5">
                Admin Panel
              </p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section label */}
        <div className="px-6 pt-6 pb-3">
          <p className="text-[10px] uppercase tracking-[3px] text-primary-foreground/40 font-semibold">
            Manage
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all group ${
                  active
                    ? "bg-primary/15 text-primary-foreground"
                    : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-primary rounded-r-full" />
                )}
                <item.icon
                  className={`w-4 h-4 transition-colors ${
                    active ? "text-primary" : "text-primary-foreground/50 group-hover:text-primary"
                  }`}
                />
                <span className="flex-1">{item.label}</span>
                <span className="text-[10px] uppercase tracking-wider text-primary-foreground/30 group-hover:text-primary-foreground/50">
                  {item.hint}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer area */}
        <div className="p-4 border-t border-primary-foreground/10 space-y-2">
          {/* Admin user card */}
          <div className="flex items-center gap-3 px-3 py-3 bg-primary-foreground/5 rounded-md">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-primary-foreground truncate">Administrator</p>
              <p className="text-[11px] text-primary-foreground/40 truncate">admin@gmail.com</p>
            </div>
          </div>

          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 text-xs text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-md transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Website
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 text-xs text-primary-foreground/50 hover:text-destructive hover:bg-destructive/10 rounded-md w-full transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border px-4 sm:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-foreground p-2 -ml-2 hover:bg-muted rounded-md transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[3px] text-muted-foreground font-semibold hidden sm:block">
              Admin
            </p>
            <h1 className="text-base sm:text-lg font-heading font-bold text-foreground leading-tight truncate">
              {currentItem?.label || "Admin"}
            </h1>
          </div>

          {/* Header utilities */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                placeholder="Quick search..."
                className="w-64 pl-9 pr-3 py-2 text-sm bg-muted/60 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition"
              />
            </div>
            <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
          </div>
          <div className="md:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
