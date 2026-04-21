import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, Wrench, ArrowLeft } from "lucide-react";

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
      <div className="space-y-6 max-w-7xl">
        <AdminPageHeader
          icon={Wrench}
          title={showForm ? (editing ? "Edit Service" : "New Service") : "Services"}
          description={
            showForm
              ? "Update service details, imagery, and content paragraphs."
              : "Manage the services displayed across your website."
          }
          actions={
            showForm ? (
              <button
                onClick={resetForm}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <button
                onClick={() => { setCreating(true); setForm(emptyService); }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-md hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Service
              </button>
            )
          }
        />

        {showForm ? (
          <form onSubmit={handleSubmit} className="bg-card border border-border p-6 sm:p-8 rounded-xl space-y-5 shadow-sm">
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
          <div className="text-center py-16 bg-card border border-border rounded-xl text-muted-foreground">
            <div className="animate-spin w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full mx-auto mb-3" />
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 bg-card border border-dashed border-border rounded-xl">
            <Wrench className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground mb-5">No services yet.</p>
            <button onClick={() => setCreating(true)} className="btn-primary text-sm inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create First Service
            </button>
          </div>
        ) : (
          <div className="bg-card border border-border overflow-hidden rounded-xl shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Title</th>
                    <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground hidden md:table-cell">Description</th>
                    <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground hidden sm:table-cell">Order</th>
                    <th className="text-right px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden bg-muted shrink-0 border border-border">
                            {item.image_url ? (
                              <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/30" />
                            )}
                          </div>
                          <p className="font-medium text-foreground line-clamp-1">{item.title}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground hidden md:table-cell max-w-md truncate">{item.description}</td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="inline-block px-2 py-0.5 text-xs font-mono bg-muted text-foreground rounded">
                          #{item.sort_order}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => startEdit(item)} className="p-2 hover:bg-primary/10 text-primary rounded-md transition-colors" title="Edit">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => { if (confirm("Delete this service?")) deleteMutation.mutate(item.id); }}
                            className="p-2 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
