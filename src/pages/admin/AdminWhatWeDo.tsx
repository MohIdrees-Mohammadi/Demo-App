import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminWhatWeDo = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    video_url: "",
    brochure_url: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-what-we-do"],
    queryFn: async () => {
      const { data, error } = await supabase.from("what_we_do").select("*").eq("section_key", "main").single();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        video_url: data.video_url,
        brochure_url: data.brochure_url,
      });
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("what_we_do").update(form).eq("section_key", "main");
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-what-we-do"] });
      toast({ title: "What We Do updated successfully" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate();
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">What We Do Page</h2>
          <p className="text-muted-foreground text-sm mt-1">Edit the main content displayed on the What We Do page.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border p-6 space-y-5 max-w-2xl">
          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">Section Subtitle</label>
            <input
              value={form.subtitle}
              onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g. Our Expertise"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Main heading"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={4}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Page description"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">YouTube Embed URL</label>
            <input
              value={form.video_url}
              onChange={(e) => setForm((f) => ({ ...f, video_url: e.target.value }))}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="https://www.youtube.com/embed/..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1.5">Brochure URL</label>
            <input
              value={form.brochure_url}
              onChange={(e) => setForm((f) => ({ ...f, brochure_url: e.target.value }))}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="https://..."
            />
          </div>

          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" />
            {saveMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminWhatWeDo;
