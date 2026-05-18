import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { FileText, Save, Upload, Plus, Trash2, Loader2, Image as ImageIcon, X, ChevronRight, Type, AlignLeft, Link2, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// Default images currently used on the website (shown as the "current photo" until admin replaces them)
import defHero from "@/assets/brandford-hero.jpg";
import defAbout from "@/assets/brandford-about.jpg";
import defCareers from "@/assets/brandford-careers.jpg";

// ---------- Schema ----------
type FieldType = "text" | "textarea" | "image" | "url" | "repeater";

interface RepeaterSubField {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "image";
}

interface Field {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  default?: string;
  subFields?: RepeaterSubField[]; // for repeater
}

interface Section {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
}

interface Tab {
  id: string;
  label: string;
  sections: Section[];
}

const TABS: Tab[] = [
  {
    id: "site",
    label: "Site-wide",
    sections: [
      {
        id: "brand",
        title: "Brand",
        fields: [
          { key: "site.brand.name", label: "Brand Name", type: "text", default: "Brandford" },
          { key: "site.brand.short", label: "Brand Initial / Logo Letter", type: "text", default: "B" },
          { key: "site.brand.tagline_small", label: "Small Tagline (under logo on menu)", type: "text", default: "Construction" },
        ],
      },
      {
        id: "contact",
        title: "Contact Information",
        fields: [
          { key: "site.contact.address_line1", label: "Address Line 1", type: "text", default: "5000 Thayer Center Ste C" },
          { key: "site.contact.address_line2", label: "Address Line 2", type: "text", default: "Oakland, MD 21550" },
          { key: "site.contact.phone", label: "Phone", type: "text", default: "(804) 372-0615" },
          { key: "site.contact.email", label: "Email", type: "text", default: "info@brandford.us" },
          { key: "site.contact.hours", label: "Working Hours", type: "text", default: "Mon - Fri: 7AM - 5PM" },
        ],
      },
      {
        id: "footer",
        title: "Footer",
        fields: [
          {
            key: "site.footer.tagline",
            label: "Footer Tagline",
            type: "textarea",
            default:
              "Brandford Construction delivers integrated construction and engineering services that keep projects moving efficiently, on schedule, and within budget.",
          },
          {
            key: "site.footer.cta_text",
            label: "Footer CTA Card Text",
            type: "textarea",
            default: "Tell us about your project and we'll get back to you with pricing and next steps.",
          },
          {
            key: "site.footer.copyright",
            label: "Copyright Notice (use {year} for current year)",
            type: "text",
            default: "© {year} Brandford Construction. All Rights Reserved.",
          },
        ],
      },
    ],
  },
  {
    id: "home",
    label: "Home Page",
    sections: [
      {
        id: "hero",
        title: "Hero Section",
        fields: [
          { key: "home.hero.eyebrow", label: "Eyebrow (small text)", type: "text", default: "Brandford Construction" },
          { key: "home.hero.title_line1", label: "Title Line 1", type: "text", default: "Engineering." },
          { key: "home.hero.title_line2", label: "Title Line 2", type: "text", default: "Construction." },
          { key: "home.hero.title_line3", label: "Title Line 3 (highlighted)", type: "text", default: "Delivered." },
          {
            key: "home.hero.description",
            label: "Description",
            type: "textarea",
            default:
              "From engineering and detailing to procurement and construction, we deliver integrated solutions that drive projects from concept to completion.",
          },
          { key: "home.hero.cta1_label", label: "Primary Button Label", type: "text", default: "Get a Quote" },
          { key: "home.hero.cta1_link", label: "Primary Button Link", type: "url", default: "/quote" },
          { key: "home.hero.cta2_label", label: "Secondary Button Label", type: "text", default: "View Projects" },
          { key: "home.hero.cta2_link", label: "Secondary Button Link", type: "url", default: "/projects" },
          { key: "home.hero.background", label: "Background Image", type: "image", default: defHero },
          {
            key: "home.hero.stats",
            label: "Stats Bar",
            type: "repeater",
            subFields: [
              { key: "number", label: "Number", type: "text" },
              { key: "label", label: "Label", type: "text" },
            ],
          },
        ],
      },
      {
        id: "about",
        title: "About Section (Who We Are)",
        fields: [
          { key: "home.about.eyebrow", label: "Eyebrow", type: "text", default: "Who We Are" },
          { key: "home.about.title", label: "Heading", type: "textarea", default: "Building with purpose, delivering with precision" },
          { key: "home.about.paragraph1", label: "Paragraph 1", type: "textarea", default: "" },
          { key: "home.about.paragraph2", label: "Paragraph 2", type: "textarea", default: "" },
          { key: "home.about.image", label: "Image", type: "image", default: defAbout },
          {
            key: "home.about.badges",
            label: "Highlight Badges",
            type: "repeater",
            subFields: [{ key: "label", label: "Label", type: "text" }],
          },
        ],
      },
      {
        id: "approach",
        title: "Our Approach",
        fields: [
          { key: "home.approach.eyebrow", label: "Eyebrow", type: "text", default: "Our Approach" },
          { key: "home.approach.title", label: "Heading", type: "textarea", default: "Clear communication. Careful planning." },
          { key: "home.approach.description", label: "Description", type: "textarea", default: "" },
        ],
      },
      {
        id: "whatwedo",
        title: "What We Do (4 cards)",
        fields: [
          { key: "home.whatwedo.eyebrow", label: "Eyebrow", type: "text", default: "What We Do" },
          { key: "home.whatwedo.title", label: "Heading", type: "textarea", default: "Capabilities that cover every stage" },
          {
            key: "home.whatwedo.items",
            label: "Items",
            type: "repeater",
            subFields: [{ key: "label", label: "Label", type: "text" }],
          },
        ],
      },
      {
        id: "commitment",
        title: "Our Commitment",
        fields: [
          { key: "home.commitment.eyebrow", label: "Eyebrow", type: "text", default: "Our Commitment" },
          { key: "home.commitment.title", label: "Heading", type: "textarea", default: "Quality, safety, and complete delivery" },
          { key: "home.commitment.description", label: "Description", type: "textarea", default: "" },
          { key: "home.commitment.cta_label", label: "Button Label", type: "text", default: "Start Your Project" },
          { key: "home.commitment.cta_link", label: "Button Link", type: "url", default: "/quote" },
        ],
      },
      {
        id: "features",
        title: "Why Choose Us",
        fields: [
          { key: "home.features.eyebrow", label: "Eyebrow", type: "text", default: "Why Choose Us" },
          { key: "home.features.title", label: "Title", type: "text", default: "A Partner You Can Build On" },
          { key: "home.features.description", label: "Description", type: "textarea", default: "" },
          {
            key: "home.features.items",
            label: "Reasons",
            type: "repeater",
            subFields: [{ key: "label", label: "Reason", type: "text" }],
          },
        ],
      },
      {
        id: "cta",
        title: "Bottom CTA Section",
        fields: [
          { key: "home.cta.eyebrow", label: "Eyebrow", type: "text", default: "Call to Action" },
          { key: "home.cta.title_line1", label: "Title Line 1", type: "text", default: "Have a project in mind?" },
          { key: "home.cta.title_line2", label: "Title Line 2 (highlighted)", type: "text", default: "We'll help you get started." },
          { key: "home.cta.description", label: "Description", type: "textarea", default: "" },
          { key: "home.cta.button_label", label: "Button Label", type: "text", default: "Get a Quote" },
          { key: "home.cta.button_link", label: "Button Link", type: "url", default: "/quote" },
        ],
      },
      {
        id: "testimonials",
        title: "Testimonials",
        fields: [
          { key: "home.testimonials.eyebrow", label: "Eyebrow", type: "text", default: "Testimonials" },
          { key: "home.testimonials.title", label: "Title", type: "text", default: "What Our Clients Say" },
          { key: "home.testimonials.description", label: "Description", type: "textarea", default: "" },
          {
            key: "home.testimonials.items",
            label: "Testimonials",
            type: "repeater",
            subFields: [
              { key: "name", label: "Name", type: "text" },
              { key: "role", label: "Role", type: "text" },
              { key: "location", label: "Location", type: "text" },
              { key: "text", label: "Quote", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact Page",
    sections: [
      {
        id: "contactsection",
        title: "Contact Section",
        fields: [
          { key: "contact.eyebrow", label: "Eyebrow", type: "text", default: "Get In Touch" },
          { key: "contact.title", label: "Title", type: "text", default: "Contact Us" },
          { key: "contact.description", label: "Description", type: "textarea", default: "Have questions or need more information? Contact us today." },
          { key: "contact.form_title", label: "Form Heading", type: "text", default: "Send Us a Message" },
          { key: "contact.form_subtitle", label: "Form Subheading", type: "text", default: "We typically respond within 24 hours." },
          { key: "contact.map_embed", label: "Map Embed URL (optional)", type: "url" },
        ],
      },
    ],
  },
  {
    id: "headers",
    label: "Page Headers",
    sections: [
      {
        id: "banners",
        title: "Inner Page Titles & Banners",
        fields: [
          { key: "page.about.title", label: "About — Title", type: "text", default: "About Us" },
          { key: "page.about.banner", label: "About — Banner Image", type: "image", default: defHero },
          { key: "page.services.title", label: "Services — Title", type: "text", default: "Our Services" },
          { key: "page.services.banner", label: "Services — Banner Image", type: "image", default: defHero },
          { key: "page.projects.title", label: "Projects — Title", type: "text", default: "Our Projects" },
          { key: "page.projects.banner", label: "Projects — Banner Image", type: "image", default: defHero },
          { key: "page.careers.title", label: "Careers — Title", type: "text", default: "Careers" },
          { key: "page.careers.banner", label: "Careers — Banner Image", type: "image", default: defCareers },
          { key: "page.contact.title", label: "Contact — Title", type: "text", default: "Contact Us" },
          { key: "page.contact.banner", label: "Contact — Banner Image", type: "image", default: defHero },
          { key: "page.quote.title", label: "Quote — Title", type: "text", default: "Request a Quote" },
          { key: "page.quote.banner", label: "Quote — Banner Image", type: "image", default: defHero },
        ],
      },
    ],
  },
];

// ---------- Helpers ----------
const allFields = (): Field[] => TABS.flatMap((t) => t.sections.flatMap((s) => s.fields));

// Compress images in the browser before upload: resize to max 1920px on the longest edge
// and re-encode as WebP at quality 0.82. Falls back to the original file if anything fails.
async function compressImage(file: File, maxDim = 1920, quality = 0.82): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/webp", quality));
    if (!blob) return file;
    // Only use compressed version if it's actually smaller
    if (blob.size >= file.size) return file;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}.webp`, { type: "image/webp" });
  } catch {
    return file;
  }
}

async function uploadImage(file: File): Promise<string> {
  const optimized = await compressImage(file);
  const ext = (optimized.name.split(".").pop() || "webp").toLowerCase();
  const path = `content/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const { error } = await supabase.storage
    .from("site-assets")
    .upload(path, optimized, { upsert: false, contentType: optimized.type });
  if (error) throw error;
  const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
  return data.publicUrl;
}

// ---------- Components ----------
const ImageField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const doUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) doUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) doUpload(file);
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="group relative w-full aspect-video bg-muted/40 border border-border rounded-lg overflow-hidden">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-background text-foreground rounded-md cursor-pointer hover:bg-background/90 shadow">
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {uploading ? "Uploading..." : "Replace"}
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 shadow"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            dragOver ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center mb-2">
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">Drop image or click to upload</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">PNG, JPG, WEBP — up to 20MB</p>
            </>
          )}
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL"
        className="w-full text-xs px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
      />
    </div>
  );
};

const RepeaterField = ({
  value,
  onChange,
  subFields,
}: {
  value: string;
  onChange: (v: string) => void;
  subFields: RepeaterSubField[];
}) => {
  let items: Record<string, string>[] = [];
  try {
    const parsed = value ? JSON.parse(value) : [];
    if (Array.isArray(parsed)) items = parsed;
  } catch {}

  const update = (next: Record<string, string>[]) => onChange(JSON.stringify(next));

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-border bg-background rounded-md p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Item {idx + 1}</span>
            <button
              type="button"
              onClick={() => update(items.filter((_, i) => i !== idx))}
              className="text-destructive hover:bg-destructive/10 p-1 rounded"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          {subFields.map((sf) => (
            <div key={sf.key}>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">{sf.label}</label>
              {sf.type === "image" ? (
                <ImageField
                  value={item[sf.key] || ""}
                  onChange={(v) => {
                    const next = [...items];
                    next[idx] = { ...next[idx], [sf.key]: v };
                    update(next);
                  }}
                />
              ) : sf.type === "textarea" ? (
                <textarea
                  rows={2}
                  value={item[sf.key] || ""}
                  onChange={(e) => {
                    const next = [...items];
                    next[idx] = { ...next[idx], [sf.key]: e.target.value };
                    update(next);
                  }}
                  className="w-full text-sm px-3 py-2 bg-background border border-border rounded-md"
                />
              ) : (
                <input
                  type={sf.type === "url" ? "text" : sf.type}
                  value={item[sf.key] || ""}
                  onChange={(e) => {
                    const next = [...items];
                    next[idx] = { ...next[idx], [sf.key]: e.target.value };
                    update(next);
                  }}
                  className="w-full text-sm px-3 py-2 bg-background border border-border rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const blank: Record<string, string> = {};
          subFields.forEach((sf) => (blank[sf.key] = ""));
          update([...items, blank]);
        }}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
      >
        <Plus className="w-3.5 h-3.5" /> Add item
      </button>
    </div>
  );
};

const FieldEditor = ({ field, value, onChange }: { field: Field; value: string; onChange: (v: string) => void }) => {
  if (field.type === "image") return <ImageField value={value} onChange={onChange} />;
  if (field.type === "repeater") return <RepeaterField value={value} onChange={onChange} subFields={field.subFields || []} />;
  if (field.type === "textarea") {
    return (
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
      />
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-sm px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
    />
  );
};

// ---------- Main ----------
const AdminContent = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("key, value").limit(2000);
      const map: Record<string, string> = {};
      (data ?? []).forEach((r: any) => (map[r.key] = r.value ?? ""));
      // Fill in defaults for missing OR empty keys so the admin previews the current website image
      allFields().forEach((f) => {
        if (f.default !== undefined && (!(f.key in map) || !map[f.key])) map[f.key] = f.default;
      });
      setValues(map);
      setLoading(false);
    })();
  }, []);

  const tab = useMemo(() => TABS.find((t) => t.id === activeTab)!, [activeTab]);
  const [activeSection, setActiveSection] = useState<string>(tab.sections[0].id);

  useEffect(() => {
    setActiveSection(tab.sections[0].id);
  }, [activeTab]);

  // Count images present in current tab for the summary chip
  const imageStats = useMemo(() => {
    let total = 0;
    let filled = 0;
    tab.sections.forEach((s) =>
      s.fields.forEach((f) => {
        if (f.type === "image") {
          total++;
          if (values[f.key]) filled++;
        }
      })
    );
    return { total, filled };
  }, [tab, values]);

  const save = async () => {
    setSaving(true);
    try {
      const rows = allFields().map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
      const { error } = await supabase
        .from("site_settings")
        .upsert(rows, { onConflict: "key" });
      if (error) throw error;
      toast.success("Content saved");
      queryClient.invalidateQueries({ queryKey: ["site_settings_all"] });
    } catch (e: any) {
      toast.error(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const fieldIcon = (type: FieldType) => {
    if (type === "image") return <ImageIcon className="w-3.5 h-3.5" />;
    if (type === "textarea") return <AlignLeft className="w-3.5 h-3.5" />;
    if (type === "url") return <Link2 className="w-3.5 h-3.5" />;
    if (type === "repeater") return <Layers className="w-3.5 h-3.5" />;
    return <Type className="w-3.5 h-3.5" />;
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl">
        <AdminPageHeader
          icon={FileText}
          title="Site Content"
          description="Edit text, images, and contact details across every page of the website."
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-t-md transition-colors ${
                activeTab === t.id
                  ? "bg-card text-foreground border border-border border-b-card -mb-px"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
            {/* Section sidebar */}
            <aside className="lg:sticky lg:top-4 lg:self-start">
              <div className="bg-card border border-border rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold px-2 pt-1 pb-2">
                  {tab.label} Sections
                </p>
                <nav className="space-y-1">
                  {tab.sections.map((s) => {
                    const isActive = activeSection === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => {
                          setActiveSection(s.id);
                          document.getElementById(`section-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between group transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className="truncate">{s.title}</span>
                        <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isActive ? "translate-x-0.5" : "opacity-0 group-hover:opacity-100"}`} />
                      </button>
                    );
                  })}
                </nav>
                {imageStats.total > 0 && (
                  <div className="mt-3 px-3 py-2 bg-muted/40 rounded-md flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground">
                      <span className="font-bold text-foreground">{imageStats.filled}</span> / {imageStats.total} images set
                    </span>
                  </div>
                )}
              </div>
            </aside>

            {/* Sections */}
            <div className="space-y-6 min-w-0">
              {tab.sections.map((section) => {
                const imageFields = section.fields.filter((f) => f.type === "image");
                const otherFields = section.fields.filter((f) => f.type !== "image");
                return (
                  <div
                    key={section.id}
                    id={`section-${section.id}`}
                    className="bg-card border border-border rounded-xl p-5 sm:p-6 scroll-mt-4"
                  >
                    <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-border">
                      <div>
                        <h3 className="font-heading font-bold text-foreground text-lg">{section.title}</h3>
                        {section.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
                        )}
                      </div>
                      {imageFields.length > 0 && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground whitespace-nowrap">
                          <ImageIcon className="w-3 h-3" />
                          {imageFields.filter((f) => values[f.key]).length}/{imageFields.length}
                        </span>
                      )}
                    </div>

                    {/* Image fields displayed in a gallery grid first */}
                    {imageFields.length > 0 && (
                      <div className="mb-6">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-3">Media</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {imageFields.map((f) => (
                            <div key={f.key}>
                              <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                                {fieldIcon(f.type)} {f.label}
                              </label>
                              <FieldEditor
                                field={f}
                                value={values[f.key] ?? ""}
                                onChange={(v) => setValues((prev) => ({ ...prev, [f.key]: v }))}
                              />
                              {f.help && <p className="text-[11px] text-muted-foreground mt-1">{f.help}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Other fields */}
                    {otherFields.length > 0 && (
                      <div>
                        {imageFields.length > 0 && (
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-3">Content</p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                          {otherFields.map((f) => {
                            const wide = f.type === "textarea" || f.type === "repeater";
                            return (
                              <div key={f.key} className={wide ? "md:col-span-2" : ""}>
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                                  {fieldIcon(f.type)} {f.label}
                                </label>
                                <FieldEditor
                                  field={f}
                                  value={values[f.key] ?? ""}
                                  onChange={(v) => setValues((prev) => ({ ...prev, [f.key]: v }))}
                                />
                                {f.help && <p className="text-[11px] text-muted-foreground mt-1">{f.help}</p>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Sticky save bar */}
              <div className="sticky bottom-4 z-10 flex justify-end">
                <button
                  onClick={save}
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 disabled:opacity-60"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
