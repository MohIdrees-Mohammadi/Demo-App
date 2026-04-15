import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save } from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  hero_image_url: string;
  inline_image1_url: string;
  inline_image2_url: string;
  paragraphs: string[];
  sort_order: number;
}

const emptyService: Omit<ServiceItem, "id"> = {
  slug: "",
  title: "",
  description: "",
  image_url: "",
  hero_image_url: "",
  inline_image1_url: "",
  inline_image2_url: "",
  paragraphs: [""],
  sort_order: 0,
};

const AdminServices = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<ServiceItem, "id">>(emptyService);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data as ServiceItem[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: Omit<ServiceItem, "id"> & { id?: string }) => {
      if (item.id) {
        const { error } = await supabase.from("services").update(item).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert(item);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["admin-services-count"] });
      toast({ title: editing ? "Service updated" : "Service created" });
      resetForm();
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["admin-services-count"] });
      toast({ title: "Service deleted" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const resetForm = () => {
    setEditing(null);
    setCreating(false);
    setForm(emptyService);
  };

  const startEdit = (item: ServiceItem) => {
    setEditing(item);
    setCreating(false);
    setForm({
      slug: item.slug,
      title: item.title,
      description: item.description,
      image_url: item.image_url,
      hero_image_url: item.hero_image_url,
      inline_image1_url: item.inline_image1_url,
      inline_image2_url: item.inline_image2_url,
      paragraphs: item.paragraphs.length ? item.paragraphs : [""],
      sort_order: item.sort_order,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    saveMutation.mutate({ ...form, slug, id: editing?.id });
  };

  const addParagraph = () => setForm((f) => ({ ...f, paragraphs: [...f.paragraphs, ""] }));
  const removeParagraph = (i: number) =>
    setForm((f) => ({ ...f, paragraphs: f.paragraphs.filter((_, idx) => idx !== i) }));
  const updateParagraph = (i: number, val: string) =>
    setForm((f) => ({ ...f, paragraphs: f.paragraphs.map((p, idx) => (idx === i ? val : p)) }));

  const showForm = creating || editing;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-foreground">
            {showForm ? (editing ? "Edit Service" : "New Service") : "Services"}
          </h2>
          {!showForm && (
            <button
              onClick={() => { setCreating(true); setForm(emptyService); }}
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Add Service
            </button>
          )}
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit} className="bg-card border border-border p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Service title"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="auto-generated-from-title"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5">Short Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Brief description for card view"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Card Image URL</label>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Hero Image URL</label>
                <input
                  value={form.hero_image_url}
                  onChange={(e) => setForm((f) => ({ ...f, hero_image_url: e.target.value }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Inline Image 1 URL</label>
                <input
                  value={form.inline_image1_url}
                  onChange={(e) => setForm((f) => ({ ...f, inline_image1_url: e.target.value }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Inline Image 2 URL</label>
                <input
                  value={form.inline_image2_url}
                  onChange={(e) => setForm((f) => ({ ...f, inline_image2_url: e.target.value }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Sort Order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-secondary">Detail Page Paragraphs</label>
                <button type="button" onClick={addParagraph} className="text-xs text-primary hover:underline">
                  + Add Paragraph
                </button>
              </div>
              <div className="space-y-3">
                {form.paragraphs.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea
                      value={p}
                      onChange={(e) => updateParagraph(i, e.target.value)}
                      rows={3}
                      className="flex-1 border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder={`Paragraph ${i + 1}`}
                    />
                    {form.paragraphs.length > 1 && (
                      <button type="button" onClick={() => removeParagraph(i)} className="text-destructive px-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={saveMutation.isPending} className="btn-primary inline-flex items-center gap-2 text-sm">
                <Save className="w-4 h-4" /> {saveMutation.isPending ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={resetForm} className="px-4 py-2 text-sm border border-border hover:bg-muted transition-colors">
                Cancel
              </button>
            </div>
          </form>
        ) : isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border">
            <p className="text-muted-foreground mb-4">No services yet.</p>
            <button onClick={() => setCreating(true)} className="btn-primary text-sm inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create First Service
            </button>
          </div>
        ) : (
          <div className="bg-card border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Description</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Order</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium text-foreground">{item.title}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell max-w-xs truncate">{item.description}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{item.sort_order}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => startEdit(item)} className="p-1.5 hover:bg-primary/10 text-primary">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { if (confirm("Delete this service?")) deleteMutation.mutate(item.id); }}
                            className="p-1.5 hover:bg-destructive/10 text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
