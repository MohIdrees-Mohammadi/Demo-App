import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, Briefcase, ArrowLeft } from "lucide-react";

interface JobItem {
  id: string;
  title: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
  is_active: boolean;
  sort_order: number;
}

const empty: Omit<JobItem, "id"> = {
  title: "", location: "", employment_type: "Full-time", description: "",
  requirements: [""], is_active: true, sort_order: 0,
};

const TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const AdminCareers = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<JobItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<JobItem, "id">>(empty);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["admin-jobs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("job_postings" as any).select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as any as JobItem[];
    },
  });

  const save = useMutation({
    mutationFn: async (item: Omit<JobItem, "id"> & { id?: string }) => {
      const cleaned = { ...item, requirements: item.requirements.filter((r) => r.trim()) };
      if (item.id) {
        const { error } = await supabase.from("job_postings" as any).update(cleaned).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("job_postings" as any).insert(cleaned);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-jobs"] });
      qc.invalidateQueries({ queryKey: ["job-postings"] });
      toast({ title: editing ? "Role updated" : "Role created" });
      reset();
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("job_postings" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-jobs"] });
      qc.invalidateQueries({ queryKey: ["job-postings"] });
      toast({ title: "Role deleted" });
    },
  });

  const reset = () => { setEditing(null); setCreating(false); setForm(empty); };
  const startEdit = (j: JobItem) => {
    setEditing(j); setCreating(false);
    setForm({ ...j, requirements: j.requirements.length ? j.requirements : [""] });
  };
  const submit = (e: React.FormEvent) => { e.preventDefault(); save.mutate({ ...form, id: editing?.id }); };
  const showForm = creating || editing;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl">
        <AdminPageHeader
          icon={Briefcase}
          title={showForm ? (editing ? "Edit Role" : "New Role") : "Careers"}
          description={showForm ? "Update job posting details." : "Manage open positions shown on the Careers page."}
          actions={
            showForm ? (
              <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md hover:bg-muted">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <button onClick={() => { setCreating(true); setForm(empty); }} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-md hover:bg-primary/90">
                <Plus className="w-4 h-4" /> Add Role
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
                <label className="block text-xs font-semibold mb-1.5">Location</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Employment Type</label>
                <select value={form.employment_type} onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Sort Order</label>
                <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold">Requirements</label>
                <button type="button" onClick={() => setForm({ ...form, requirements: [...form.requirements, ""] })} className="text-xs text-primary hover:underline">+ Add</button>
              </div>
              {form.requirements.map((r, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={r} onChange={(e) => setForm({ ...form, requirements: form.requirements.map((x, idx) => idx === i ? e.target.value : x) })}
                    className="flex-1 border border-border bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  {form.requirements.length > 1 && (
                    <button type="button" onClick={() => setForm({ ...form, requirements: form.requirements.filter((_, idx) => idx !== i) })} className="text-destructive px-2"><Trash2 className="w-4 h-4" /></button>
                  )}
                </div>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="accent-primary" />
              Active (visible on the public Careers page)
            </label>
            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={save.isPending} className="btn-primary inline-flex items-center gap-2 text-sm">
                <Save className="w-4 h-4" /> {save.isPending ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={reset} className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted">Cancel</button>
            </div>
          </form>
        ) : isLoading ? (
          <div className="text-center py-16 text-muted-foreground">Loading roles...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-card border border-dashed border-border rounded-xl">
            <Briefcase className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground mb-5">No open roles yet.</p>
            <button onClick={() => setCreating(true)} className="btn-primary text-sm inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create First Role
            </button>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/40">
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Title</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground hidden sm:table-cell">Location</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground hidden md:table-cell">Type</th>
                <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Status</th>
                <th className="text-right px-5 py-3.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-4 font-medium text-foreground">{j.title}</td>
                    <td className="px-5 py-4 text-muted-foreground hidden sm:table-cell">{j.location}</td>
                    <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{j.employment_type}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded ${j.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {j.is_active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(j)} className="p-2 hover:bg-primary/10 text-primary rounded-md"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { if (confirm("Delete this role?")) del.mutate(j.id); }} className="p-2 hover:bg-destructive/10 text-destructive rounded-md"><Trash2 className="w-3.5 h-3.5" /></button>
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

export default AdminCareers;
