import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Mail, Phone, Calendar, Trash2 } from "lucide-react";

const STATUSES = ["new", "read", "replied", "archived"];

const AdminMessages = () => {
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["admin-contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("contact_messages" as any).update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-contact-messages"] }),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_messages" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-contact-messages"] });
      toast({ title: "Message deleted" });
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl">
        <AdminPageHeader
          icon={MessageSquare}
          title="Contact Messages"
          description="Messages submitted through the Contact Us form."
        />

        {isLoading ? (
          <div className="text-center py-16 text-muted-foreground">Loading…</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16 bg-card border border-dashed border-border rounded-xl">
            <MessageSquare className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">No messages yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="bg-card border border-border rounded-xl p-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded bg-primary/10 text-primary">
                        {m.status}
                      </span>
                      <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(m.created_at).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground">{m.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                      <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 hover:text-primary">
                        <Mail className="w-3 h-3" /> {m.email}
                      </a>
                      {m.phone && (
                        <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1 hover:text-primary">
                          <Phone className="w-3 h-3" /> {m.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={m.status}
                      onChange={(e) => updateStatus.mutate({ id: m.id, status: e.target.value })}
                      className="border border-border bg-background px-3 py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => { if (confirm("Delete this message?")) del.mutate(m.id); }}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-muted/40 rounded-md p-4 text-sm text-foreground whitespace-pre-wrap">
                  {m.message}
                </div>

                <div className="mt-4">
                  <a
                    href={`mailto:${m.email}?subject=Re: Your message to Brandford Construction`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> Reply by Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
