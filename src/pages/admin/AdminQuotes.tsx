import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Inbox, Mail, Phone, MapPin, Calendar, Trash2, FileText } from "lucide-react";

const STATUSES = ["new", "in_progress", "won", "lost"];

const AdminQuotes = () => {
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ["admin-quotes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("quote_requests" as any).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("quote_requests" as any).update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-quotes"] }),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("quote_requests" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-quotes"] });
      toast({ title: "Quote deleted" });
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl">
        <AdminPageHeader
          icon={Inbox}
          title="Quote Requests"
          description="Inbound quote requests submitted through the website."
        />

        {isLoading ? (
          <div className="text-center py-16 text-muted-foreground">Loading…</div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-16 bg-card border border-dashed border-border rounded-xl">
            <Inbox className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">No quote requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((q) => (
              <div key={q.id} className="bg-card border border-border rounded-xl p-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded bg-primary/10 text-primary">
                        {q.service_needed}
                      </span>
                      <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(q.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground">{q.contact_name}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                      <a href={`mailto:${q.contact_email}`} className="inline-flex items-center gap-1 hover:text-primary"><Mail className="w-3 h-3" /> {q.contact_email}</a>
                      <a href={`tel:${q.contact_phone}`} className="inline-flex items-center gap-1 hover:text-primary"><Phone className="w-3 h-3" /> {q.contact_phone}</a>
                      {q.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {q.location}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={q.status} onChange={(e) => updateStatus.mutate({ id: q.id, status: e.target.value })}
                      className="border border-border bg-background px-3 py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30">
                      {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                    </select>
                    <button onClick={() => { if (confirm("Delete this quote request?")) del.mutate(q.id); }} className="p-2 hover:bg-destructive/10 text-destructive rounded-md">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-muted/40 rounded-md p-4 text-sm text-foreground whitespace-pre-wrap mb-3">
                  {q.project_description}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                  {q.budget && <div><span className="font-semibold text-foreground">Budget:</span> {q.budget}</div>}
                  {q.timeline && <div><span className="font-semibold text-foreground">Timeline:</span> {q.timeline}</div>}
                </div>

                {q.file_urls?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {q.file_urls.map((url: string, i: number) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-muted hover:bg-primary/10 hover:text-primary rounded-md transition-colors">
                        <FileText className="w-3.5 h-3.5" /> File {i + 1}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminQuotes;
