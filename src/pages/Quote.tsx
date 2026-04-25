import { useState } from "react";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { HardHat, Ruler, Package, Upload, Send, X, FileText, CheckCircle2 } from "lucide-react";

const SERVICES = [
  { value: "Construction", icon: HardHat, desc: "General contracting & build" },
  { value: "Engineering & Design", icon: Ruler, desc: "Drawings, design & PE stamping" },
  { value: "Material Supply", icon: Package, desc: "Sourcing & delivery" },
];

const quoteSchema = z.object({
  service_needed: z.string().min(1, "Please choose a service"),
  project_description: z.string().trim().min(1, "Please describe your project").max(2000),
  location: z.string().trim().min(1, "Location is required").max(200),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  contact_name: z.string().trim().min(1, "Name is required").max(100),
  contact_email: z.string().trim().email("Invalid email").max(255),
  contact_phone: z.string().trim().min(1, "Phone is required").max(40),
});

const Quote = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    service_needed: "",
    project_description: "",
    location: "",
    budget: "",
    timeline: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files).filter((f) => f.size <= 10 * 1024 * 1024); // 10MB cap
    setFiles((prev) => [...prev, ...incoming].slice(0, 5));
  };
  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = quoteSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "Please check the form", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      // Upload files
      const fileUrls: string[] = [];
      for (const f of files) {
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${f.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("quote-uploads").upload(path, f);
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("quote-uploads").getPublicUrl(path);
        fileUrls.push(pub.publicUrl);
      }

      const { error } = await supabase.from("quote_requests" as any).insert({ ...form, file_urls: fileUrls });
      if (error) throw error;
      setSuccess(true);
      setForm({ service_needed: "", project_description: "", location: "", budget: "", timeline: "", contact_name: "", contact_email: "", contact_phone: "" });
      setFiles([]);
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message ?? "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <WithPageLoader>
      <Layout>
        <PageBanner
          title="Request a Quote"
          breadcrumb="Get a Quote"
          description="Tell us about your project and we'll get back to you with pricing and next steps."
        />

        <section className="py-12 md:py-16 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            {success ? (
              <div className="bg-card border border-border rounded-xl p-10 text-center shadow-md">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-heading font-extrabold text-foreground mb-3">Thank you!</h2>
                <p className="text-muted-foreground mb-6">Your quote request has been received. Our team will reach out within 24 hours.</p>
                <button onClick={() => setSuccess(false)} className="btn-primary">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl shadow-md p-6 md:p-10 space-y-10">
                {/* 1. Service Needed */}
                <div>
                  <h3 className="text-xs uppercase tracking-[3px] font-bold text-primary mb-4">1. Service Needed</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SERVICES.map((s) => {
                      const active = form.service_needed === s.value;
                      return (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => update("service_needed", s.value)}
                          className={`text-left p-4 rounded-lg border-2 transition-all ${
                            active
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border hover:border-primary/40 hover:bg-muted/50"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-md flex items-center justify-center mb-3 transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            <s.icon className="w-5 h-5" />
                          </div>
                          <p className="font-heading font-bold text-sm text-foreground">{s.value}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Project Details */}
                <div>
                  <h3 className="text-xs uppercase tracking-[3px] font-bold text-primary mb-4">2. Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-secondary mb-1.5">Project Description *</label>
                      <textarea
                        rows={4} maxLength={2000}
                        value={form.project_description}
                        onChange={(e) => update("project_description", e.target.value)}
                        className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                        placeholder="Tell us about scope, square footage, special requirements..."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-secondary mb-1.5">Location *</label>
                        <input
                          maxLength={200}
                          value={form.location}
                          onChange={(e) => update("location", e.target.value)}
                          className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          placeholder="City, State"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-secondary mb-1.5">Timeline</label>
                        <select
                          value={form.timeline}
                          onChange={(e) => update("timeline", e.target.value)}
                          className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        >
                          <option value="">Select timeline</option>
                          <option>Less than 1 month</option>
                          <option>1–3 months</option>
                          <option>3–6 months</option>
                          <option>6–12 months</option>
                          <option>12+ months</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-secondary mb-1.5">Budget (optional)</label>
                      <select
                        value={form.budget}
                        onChange={(e) => update("budget", e.target.value)}
                        className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      >
                        <option value="">Select range</option>
                        <option>Under $50k</option>
                        <option>$50k – $250k</option>
                        <option>$250k – $1M</option>
                        <option>$1M – $5M</option>
                        <option>$5M+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Upload Files */}
                <div>
                  <h3 className="text-xs uppercase tracking-[3px] font-bold text-primary mb-4">3. Upload Files</h3>
                  <label className="block border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                    <input type="file" multiple onChange={handleFiles} className="hidden" accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.zip" />
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-semibold text-foreground">Drag and drop or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">Drawings, plans, or specifications (max 5 files, 10MB each)</p>
                  </label>
                  {files.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {files.map((f, i) => (
                        <li key={i} className="flex items-center justify-between bg-muted/50 rounded-md px-3 py-2 text-sm">
                          <span className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                            <span className="truncate">{f.name}</span>
                            <span className="text-xs text-muted-foreground shrink-0">({(f.size / 1024).toFixed(0)} KB)</span>
                          </span>
                          <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                            <X className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* 4. Contact Info */}
                <div>
                  <h3 className="text-xs uppercase tracking-[3px] font-bold text-primary mb-4">4. Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-secondary mb-1.5">Name *</label>
                      <input
                        maxLength={100}
                        value={form.contact_name}
                        onChange={(e) => update("contact_name", e.target.value)}
                        className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-secondary mb-1.5">Email *</label>
                      <input
                        type="email" maxLength={255}
                        value={form.contact_email}
                        onChange={(e) => update("contact_email", e.target.value)}
                        className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-secondary mb-1.5">Phone *</label>
                      <input
                        type="tel" maxLength={40}
                        value={form.contact_phone}
                        onChange={(e) => update("contact_phone", e.target.value)}
                        className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        placeholder="+1 555 000 0000"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground py-4 rounded-md font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 inline-flex items-center justify-center gap-2 disabled:opacity-60">
                  <Send className="w-4 h-4" /> {submitting ? "Submitting…" : "Request Quote"}
                </button>
              </form>
            )}
          </div>
        </section>
      </Layout>
    </WithPageLoader>
  );
};

export default Quote;
