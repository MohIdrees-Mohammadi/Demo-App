import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, FolderKanban, ArrowLeft } from "lucide-react";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  summary: string;
  scope: string[];
  description: string;
  cover_image_url: string;
  gallery_urls: string[];
  sort_order: number;
}

const empty: Omit<ProjectItem, "id"> = {
  slug: "", title: "", category: "Construction Projects", location: "", summary: "",
  scope: [""], description: "", cover_image_url: "", gallery_urls: [""], sort_order: 0,
};

const CATEGORIES = ["Construction Projects", "Engineering & Design", "Drawings & Models"];

const AdminProjects = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<ProjectItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<ProjectItem, "id">>(empty);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects" as any).select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as any as ProjectItem[];
    },
  });

  const save = useMutation({
    mutationFn: async (item: Omit<ProjectItem, "id"> & { id?: string }) => {
      const cleaned = {
        ...item,
        scope: item.scope.filter((s) => s.trim()),
        gallery_urls: item.gallery_urls.filter((u) => u.trim()),
      };
      if (item.id) {
        const { error } = await supabase.from("projects" as any).update(cleaned).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects" as any).insert(cleaned);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["featured-projects"] });
      toast({ title: editing ? "Project updated" : "Project created" });
      reset();
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Project deleted" });
    },
  });

  const reset = () => { setEditing(null); setCreating(false); setForm(empty); };
  const startEdit = (p: ProjectItem) => {
    setEditing(p); setCreating(false);
    setForm({ ...p, scope: p.scope.length ? p.scope : [""], gallery_urls: p.gallery_urls.length ? p.gallery_urls : [""] });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    save.mutate({ ...form, slug, id: editing?.id });
  };

  const showForm = creating || editing;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl">
        <AdminPageHeader
          icon={FolderKanban}
          title={showForm ? (editing ? "Edit Project" : "New Project") : "Projects"}
          description={showForm ? "Update project details and gallery." : "Manage portfolio projects shown on the website."}
          actions={
            showForm ? (
              <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md hover:bg-muted">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <button onClick={() => { setCreating(true); setForm(empty); }} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-md hover:bg-primary/90">
                <Plus className="w-4 h-4" /> Add Project
              </button>
            )
          }
        />

        {showForm ? (
          <form onSubmit={submit} className="bg-card border border-border p-6 sm:p-8 rounded-xl space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="auto-from-title"
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Location</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Cover Image URL</label>
              <input value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                placeholder="https://..."
                className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Summary</label>
              <textarea rows={2} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Description</label>
              <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold">Scope of Work</label>
                <button type="button" onClick={() => setForm({ ...form, scope: [...form.scope, ""] })} className="text-xs text-primary hover:underline">+ Add Item</button>
              </div>
              {form.scope.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={s} onChange={(e) => setForm({ ...form, scope: form.scope.map((x, idx) => idx === i ? e.target.value : x) })}
                    className="flex-1 border border-border bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  {form.scope.length > 1 && (
                    <button type="button" onClick={() => setForm({ ...form, scope: form.scope.filter((_, idx) => idx !== i) })} className="text-destructive px-2"><Trash2 className="w-4 h-4" /></button>
                  )}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold">Gallery Image URLs</label>
                <button type="button" onClick={() => setForm({ ...form, gallery_urls: [...form.gallery_urls, ""] })} className="text-xs text-primary hover:underline">+ Add Image</button>
              </div>
              {form.gallery_urls.map((u, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={u} onChange={(e) => setForm({ ...form, gallery_urls: form.gallery_urls.map((x, idx) => idx === i ? e.target.value : x) })}
                    placeholder="https://..."
                    className="flex-1 border border-border bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  {form.gallery_urls.length > 1 && (
                    <button type="button" onClick={() => setForm({ ...form, gallery_urls: form.gallery_urls.filter((_, idx) => idx !== i) })} className="text-destructive px-2"><Trash2 className="w-4 h-4" /></button>
                  )}
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className="w-32 border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={save.isPending} className="btn-primary inline-flex items-center gap-2 text-sm">
                <Save className="w-4 h-4" /> {save.isPending ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={reset} className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted">Cancel</button>
            </div>
          </form>
        ) : isLoading ? (
          <div className="text-center py-16 text-muted-foreground">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-card border border-dashed border-border rounded-xl">
            <FolderKanban className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground mb-5">No projects yet.</p>
            <button onClick={() => setCreating(true)} className="btn-primary text-sm inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create First Project
            </button>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/40">
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Project</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground hidden md:table-cell">Location</th>
                <th className="text-right px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-muted shrink-0 border border-border">
                          {p.cover_image_url ? <img src={p.cover_image_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/30" />}
                        </div>
                        <p className="font-medium text-foreground line-clamp-1">{p.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{p.category}</td>
                    <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{p.location}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(p)} className="p-2 hover:bg-primary/10 text-primary rounded-md"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { if (confirm("Delete this project?")) del.mutate(p.id); }} className="p-2 hover:bg-destructive/10 text-destructive rounded-md"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
