import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";
import { CheckCircle2, MapPin, ArrowLeft, ArrowRight } from "lucide-react";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { data: project, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects" as any)
        .select("*")
        .eq("slug", slug as string)
        .maybeSingle();
      if (error) throw error;
      return data as any;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center text-muted-foreground">Loading…</div>
      </Layout>
    );
  }

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <WithPageLoader>
      <Layout>
        <PageBanner
          title={project.title}
          breadcrumb={project.title}
          parent={{ label: "Projects", href: "/projects" }}
        />

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>

            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                {/* Cover */}
                <div className="rounded-xl overflow-hidden border border-border shadow-md">
                  <img src={project.cover_image_url} alt={project.title} className="w-full h-auto" />
                </div>

                {/* Overview */}
                <div>
                  <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-4">Project Overview</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">{project.summary}</p>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                {/* Gallery */}
                {project.gallery_urls?.length > 0 && (
                  <div>
                    <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-4">Project Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.gallery_urls.map((url: string, i: number) => (
                        <div key={i} className="rounded-lg overflow-hidden border border-border">
                          <img src={url} alt={`${project.title} gallery ${i + 1}`} loading="lazy" className="w-full h-64 object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-5">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider mb-4">Project Info</h3>
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Category</dt>
                      <dd className="font-semibold text-foreground">{project.category}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Location</dt>
                      <dd className="font-semibold text-foreground flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> {project.location}
                      </dd>
                    </div>
                  </dl>
                </div>

                {project.scope?.length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider mb-4">Scope of Work</h3>
                    <ul className="space-y-2.5">
                      {project.scope.map((s: string) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-secondary text-primary-foreground rounded-xl p-6">
                  <h3 className="font-heading font-extrabold text-lg mb-2">Have a similar project?</h3>
                  <p className="text-primary-foreground/70 text-sm mb-5">Get a quote and we'll respond within 24 hours.</p>
                  <Link to="/quote" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors w-full justify-center">
                    Get a Quote <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </Layout>
    </WithPageLoader>
  );
};

export default ProjectDetail;
