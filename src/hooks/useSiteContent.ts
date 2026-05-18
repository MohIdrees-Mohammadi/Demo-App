import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteSettingsMap = Record<string, string>;

const fetchAllSettings = async (): Promise<SiteSettingsMap> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value")
    .limit(2000);
  if (error) throw error;
  const map: SiteSettingsMap = {};
  (data ?? []).forEach((r: { key: string; value: string }) => {
    map[r.key] = r.value ?? "";
  });
  return map;
};

export const useSiteContent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["site_settings_all"],
    queryFn: fetchAllSettings,
    staleTime: 60_000,
  });

  const get = (key: string, fallback = "") => {
    const v = data?.[key];
    return v && v.trim() !== "" ? v : fallback;
  };

  const getJSON = <T,>(key: string, fallback: T): T => {
    const v = data?.[key];
    if (!v) return fallback;
    try {
      return JSON.parse(v) as T;
    } catch {
      return fallback;
    }
  };

  return { get, getJSON, loading: isLoading, map: data ?? {} };
};
