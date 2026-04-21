import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg-new.jpg";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError || !roleData) {
        await supabase.auth.signOut();
        toast({
          title: "Access Denied",
          description: "You do not have admin privileges.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({ title: "Welcome back!", description: "Redirecting to dashboard..." });
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-secondary text-primary-foreground">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-primary/40" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>

          <div>
            <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[4px] text-primary font-semibold mb-5">
              <span className="block w-8 h-px bg-primary" />
              Admin Portal
            </p>
            <h1 className="text-4xl xl:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-5">
              Manage Your <br />
              <span className="text-primary italic">Steel Detailing</span> Site
            </h1>
            <p className="text-primary-foreground/60 text-base max-w-md leading-relaxed">
              Update services, publish news, and customize your site's appearance — all from a single,
              secure command center.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 max-w-sm">
              <div className="border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-4">
                <p className="text-2xl font-heading font-bold">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/50 mt-1">
                  Secure Access
                </p>
              </div>
              <div className="border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-4">
                <p className="text-2xl font-heading font-bold">24/7</p>
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/50 mt-1">
                  Always Available
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} AceroEngineering LLC
          </p>
        </div>
      </div>

      {/* Right: Form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 bg-muted/40 relative">
        {/* Mobile back link */}
        <Link
          to="/"
          className="lg:hidden absolute top-6 left-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>

        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-2xl font-heading font-bold text-foreground">
              <span className="text-primary">A</span>cero
              <span className="text-primary">E</span>ngineering
            </h1>
            <p className="text-muted-foreground text-xs uppercase tracking-[3px] mt-1">Admin Portal</p>
          </div>

          <div className="bg-card border border-border p-7 sm:p-9 shadow-xl rounded-xl">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md shadow-primary/20">
                <ShieldCheck className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-foreground text-xl tracking-tight">
                  Sign in
                </h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Enter your credentials to continue
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-border bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-md transition-all"
                    placeholder="admin@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-border bg-background pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-md transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider text-sm py-3.5 rounded-md hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-border">
              <p className="text-[11px] text-center text-muted-foreground">
                Authorized personnel only · Protected area
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
