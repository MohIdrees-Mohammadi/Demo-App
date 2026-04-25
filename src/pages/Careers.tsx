import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, MapPin, Clock, ArrowRight, TrendingUp, Heart, Layers } from "lucide-react";
import careersImg from "@/assets/brandford-careers.jpg";
import { Link } from "react-router-dom";

const benefits = [
  { icon: TrendingUp, label: "Professional growth opportunities", desc: "Continuous learning, mentorship, and a clear path forward." },
  { icon: Heart, label: "Supportive work environment", desc: "Collaborative teams that value your contributions and well-being." },
  { icon: Layers, label: "Diverse project experience", desc: "Work on commercial, residential, and infrastructure projects." },
];

const Careers = () => {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["job-postings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_postings" as any)
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

  const applyHref = (title: string) =>
    `mailto:careers@brandford.com?subject=${encodeURIComponent(`Application: ${title}`)}&body=${encodeURIComponent("Hi Brandford team,\n\nPlease find my application attached.\n\nName:\nPhone:\nLinkedIn:\n\n— ")}`;

  return (
    <WithPageLoader>
      <Layout>
        <PageBanner title="Careers" breadcrumb="Careers" description="Join Our Team — we are always looking for motivated individuals." />

        {/* Intro */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="section-eyebrow mb-4">Join Our Team</p>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mb-5 leading-tight">
                  Build your career with <span className="text-primary">Brandford</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We are always looking for motivated individuals to join our team. If you're driven, curious, and ready to make an impact on real projects, we'd love to hear from you.
                </p>
                <a href="#open-positions" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
                  See Open Positions <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img src={careersImg} alt="Brandford team collaborating on site" className="w-full h-auto" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="section-eyebrow mb-4 justify-center">Why Work With Us</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground">What we offer</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((b) => (
                <div key={b.label} className="bg-card border border-border rounded-xl p-7 hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <b.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">{b.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <p className="section-eyebrow mb-4 justify-center">Open Positions</p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground">Roles we're hiring for</h2>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading roles…</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12 bg-muted/40 rounded-xl border border-dashed border-border">
                <Briefcase className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">No open positions right now. Check back soon.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-extrabold text-xl text-foreground mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                          <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}</span>
                          <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> {job.employment_type}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{job.description}</p>
                        {job.requirements?.length > 0 && (
                          <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-foreground">
                            {job.requirements.map((r: string) => (
                              <li key={r} className="flex items-start gap-1.5"><span className="text-primary">•</span> {r}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <a
                        href={applyHref(job.title)}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shrink-0"
                      >
                        Apply Now <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-10 text-sm text-muted-foreground">
              Don't see a fit? <Link to="/contact" className="text-primary font-semibold hover:underline">Send us your resume</Link> and we'll keep you in mind.
            </div>
          </div>
        </section>
      </Layout>
    </WithPageLoader>
  );
};

export default Careers;
