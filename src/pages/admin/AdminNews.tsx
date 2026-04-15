import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: string;
  image_url: string;
}

const emptyNews: Omit<NewsItem, "id"> = {
  slug: "",
  title: "",
  excerpt: "",
  content: [""],
  date: new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
  category: "Latest News",
  image_url: "",
};

const AdminNews = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<NewsItem, "id">>(emptyNews);

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as NewsItem[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: Omit<NewsItem, "id"> & { id?: string }) => {
      if (item.id) {
        const { error } = await supabase.from("news").update(item).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert(item);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      queryClient.invalidateQueries({ queryKey: ["admin-news-count"] });
      toast({ title: editing ? "News updated" : "News created" });
      resetForm();
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      queryClient.invalidateQueries({ queryKey: ["admin-news-count"] });
      toast({ title: "News deleted" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const resetForm = () => {
    setEditing(null);
    setCreating(false);
    setForm(emptyNews);
  };

  const startEdit = (item: NewsItem) => {
    setEditing(item);
    setCreating(false);
    setForm({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content.length ? item.content : [""],
      date: item.date,
      category: item.category,
      image_url: item.image_url,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    saveMutation.mutate({ ...form, slug, id: editing?.id });
  };

  const addParagraph = () => setForm((f) => ({ ...f, content: [...f.content, ""] }));
  const removeParagraph = (i: number) =>
    setForm((f) => ({ ...f, content: f.content.filter((_, idx) => idx !== i) }));
  const updateParagraph = (i: number, val: string) =>
    setForm((f) => ({ ...f, content: f.content.map((p, idx) => (idx === i ? val : p)) }));

  const showForm = creating || editing;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-foreground">
            {showForm ? (editing ? "Edit Article" : "New Article") : "News Articles"}
          </h2>
          {!showForm && (
            <button
              onClick={() => { setCreating(true); setForm(emptyNews); }}
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Add Article
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
                  placeholder="Article title"
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Date</label>
                <input
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Category</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5">Image URL</label>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                rows={2}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Short description..."
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-secondary">Content Paragraphs</label>
                <button type="button" onClick={addParagraph} className="text-xs text-primary hover:underline">
                  + Add Paragraph
                </button>
              </div>
              <div className="space-y-3">
                {form.content.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea
                      value={p}
                      onChange={(e) => updateParagraph(i, e.target.value)}
                      rows={3}
                      className="flex-1 border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder={`Paragraph ${i + 1}`}
                    />
                    {form.content.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParagraph(i)}
                        className="text-destructive hover:text-destructive/80 px-2"
                      >
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
        ) : news.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border">
            <p className="text-muted-foreground mb-4">No news articles yet.</p>
            <button onClick={() => setCreating(true)} className="btn-primary text-sm inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create First Article
            </button>
          </div>
        ) : (
          <div className="bg-card border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium text-foreground">{item.title}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{item.date}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{item.category}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => startEdit(item)} className="p-1.5 hover:bg-primary/10 text-primary transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Delete this article?")) deleteMutation.mutate(item.id);
                            }}
                            className="p-1.5 hover:bg-destructive/10 text-destructive transition-colors"
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

export default AdminNews;
