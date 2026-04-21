import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ThemeName = "classic" | "dark-blue" | "midnight" | "forest";

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => Promise<void>;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "classic",
  setTheme: async () => {},
  loading: true,
});

export const useTheme = () => useContext(ThemeContext);

const themes: Record<ThemeName, Record<string, string>> = {
  classic: {
    "--background": "0 0% 100%",
    "--foreground": "216 28% 17%",
    "--card": "0 0% 100%",
    "--card-foreground": "216 28% 17%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "216 28% 17%",
    "--primary": "0 62% 32%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "216 28% 17%",
    "--secondary-foreground": "0 0% 100%",
    "--muted": "220 14% 96%",
    "--muted-foreground": "220 9% 46%",
    "--accent": "43 96% 56%",
    "--accent-foreground": "216 28% 17%",
    "--destructive": "0 84.2% 60.2%",
    "--destructive-foreground": "0 0% 100%",
    "--border": "220 13% 91%",
    "--input": "220 13% 91%",
    "--ring": "0 62% 32%",
    "--navy": "216 28% 17%",
    "--navy-light": "216 20% 25%",
    "--maroon": "0 62% 32%",
    "--maroon-light": "0 55% 40%",
    "--gold": "43 96% 56%",
    "--steel": "220 9% 46%",
    "--light-gray": "220 14% 96%",
  },
  "dark-blue": {
    "--background": "220 20% 97%",
    "--foreground": "220 40% 13%",
    "--card": "0 0% 100%",
    "--card-foreground": "220 40% 13%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "220 40% 13%",
    "--primary": "217 71% 45%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "220 40% 13%",
    "--secondary-foreground": "0 0% 100%",
    "--muted": "220 20% 94%",
    "--muted-foreground": "220 10% 50%",
    "--accent": "199 89% 48%",
    "--accent-foreground": "0 0% 100%",
    "--destructive": "0 84% 60%",
    "--destructive-foreground": "0 0% 100%",
    "--border": "220 15% 90%",
    "--input": "220 15% 90%",
    "--ring": "217 71% 45%",
    "--navy": "220 40% 13%",
    "--navy-light": "220 30% 22%",
    "--maroon": "217 71% 45%",
    "--maroon-light": "217 60% 55%",
    "--gold": "199 89% 48%",
    "--steel": "220 10% 50%",
    "--light-gray": "220 20% 94%",
  },
  midnight: {
    "--background": "230 15% 96%",
    "--foreground": "230 30% 15%",
    "--card": "0 0% 100%",
    "--card-foreground": "230 30% 15%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "230 30% 15%",
    "--primary": "250 60% 50%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "230 30% 15%",
    "--secondary-foreground": "0 0% 100%",
    "--muted": "230 15% 93%",
    "--muted-foreground": "230 10% 48%",
    "--accent": "280 65% 60%",
    "--accent-foreground": "0 0% 100%",
    "--destructive": "0 84% 60%",
    "--destructive-foreground": "0 0% 100%",
    "--border": "230 12% 89%",
    "--input": "230 12% 89%",
    "--ring": "250 60% 50%",
    "--navy": "230 30% 15%",
    "--navy-light": "230 22% 24%",
    "--maroon": "250 60% 50%",
    "--maroon-light": "250 50% 60%",
    "--gold": "280 65% 60%",
    "--steel": "230 10% 48%",
    "--light-gray": "230 15% 93%",
  },
  forest: {
    "--background": "140 10% 97%",
    "--foreground": "160 30% 15%",
    "--card": "0 0% 100%",
    "--card-foreground": "160 30% 15%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "160 30% 15%",
    "--primary": "160 55% 30%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "160 30% 15%",
    "--secondary-foreground": "0 0% 100%",
    "--muted": "140 12% 93%",
    "--muted-foreground": "150 10% 45%",
    "--accent": "45 80% 50%",
    "--accent-foreground": "160 30% 15%",
    "--destructive": "0 84% 60%",
    "--destructive-foreground": "0 0% 100%",
    "--border": "140 10% 90%",
    "--input": "140 10% 90%",
    "--ring": "160 55% 30%",
    "--navy": "160 30% 15%",
    "--navy-light": "160 22% 24%",
    "--maroon": "160 55% 30%",
    "--maroon-light": "160 45% 40%",
    "--gold": "45 80% 50%",
    "--steel": "150 10% 45%",
    "--light-gray": "140 12% 93%",
  },
};

export const themeInfo: Record<ThemeName, { label: string; description: string; preview: string[] }> = {
  classic: {
    label: "Classic Industrial",
    description: "Original maroon, navy & gold palette",
    preview: ["0 62% 32%", "216 28% 17%", "43 96% 56%"],
  },
  "dark-blue": {
    label: "Ocean Blue",
    description: "Professional deep blue & cyan palette",
    preview: ["217 71% 45%", "220 40% 13%", "199 89% 48%"],
  },
  midnight: {
    label: "Midnight Purple",
    description: "Elegant indigo & violet palette",
    preview: ["250 60% 50%", "230 30% 15%", "280 65% 60%"],
  },
  forest: {
    label: "Forest Green",
    description: "Natural teal & amber palette",
    preview: ["160 55% 30%", "160 30% 15%", "45 80% 50%"],
  },
};

function applyTheme(themeName: ThemeName) {
  const vars = themes[themeName];
  if (!vars) return;
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeName>("classic");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      const { data } = await supabase
        .from("site_settings" as any)
        .select("value")
        .eq("key", "theme")
        .single();
      const t = (data as any)?.value as ThemeName;
      if (t && themes[t]) {
        setThemeState(t);
        applyTheme(t);
      }
      setLoading(false);
    };
    fetchTheme();
  }, []);

  const setTheme = async (newTheme: ThemeName) => {
    applyTheme(newTheme);
    setThemeState(newTheme);
    await (supabase.from("site_settings" as any) as any)
      .update({ value: newTheme, updated_at: new Date().toISOString() })
      .eq("key", "theme");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};
