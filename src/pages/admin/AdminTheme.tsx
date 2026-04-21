import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useTheme, themeInfo, ThemeName } from "@/contexts/ThemeContext";
import { Check, Palette, Info } from "lucide-react";
import { toast } from "sonner";

const AdminTheme = () => {
  const { theme, setTheme } = useTheme();

  const handleSelect = async (t: ThemeName) => {
    await setTheme(t);
    toast.success(`Theme changed to "${themeInfo[t].label}"`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl">
        <AdminPageHeader
          icon={Palette}
          title="Color Palette"
          description="Choose a color theme for your website. Changes apply instantly to every visitor."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {(Object.keys(themeInfo) as ThemeName[]).map((key) => {
            const info = themeInfo[key];
            const active = theme === key;
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`group relative overflow-hidden text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                  active
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border bg-card hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {active && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full bg-primary text-primary-foreground">
                    <Check className="w-3 h-3" /> Active
                  </span>
                )}

                {/* Color preview strip */}
                <div className="flex h-20 rounded-lg overflow-hidden border border-border mb-5">
                  {info.preview.map((color, i) => (
                    <div
                      key={i}
                      className="flex-1 transition-transform duration-500 group-hover:scale-y-110 origin-bottom"
                      style={{ backgroundColor: `hsl(${color})` }}
                    />
                  ))}
                </div>

                {/* Color swatches */}
                <div className="flex gap-1.5 mb-4">
                  {info.preview.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-card shadow-sm"
                      style={{ backgroundColor: `hsl(${color})` }}
                    />
                  ))}
                </div>

                <h3 className="font-heading font-bold text-foreground text-lg tracking-tight">
                  {info.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {info.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="flex items-start gap-3 p-4 bg-muted/60 border border-border rounded-xl">
          <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Live Theme Updates</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Theme changes are saved to the database and applied instantly across the entire website
              for every visitor.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTheme;
