import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { useServices } from "@/features/public/queries";
import { LoadingState } from "@/components/shared/States";
import { cn } from "@/lib/utils";

export function ServiceCard({ service, featured = false }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      data-testid={`service-card-${service.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line/60 bg-white/95 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-lg",
        featured ? "md:row-span-2 md:col-span-1" : ""
      )}
    >
      {featured && service.hero_image_url && (
        <div className="relative h-56 w-full overflow-hidden sm:h-64">
          <img
            src={service.hero_image_url}
            alt={service.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand shadow-xs backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-clay" />
              Featured Care
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="inline-block rounded-full bg-clay/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-clay">
            {service.category || "Physiotherapy"}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line/60 bg-canvas text-mute transition-colors group-hover:bg-brand group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <h3 className="mt-4 font-serif text-xl font-bold text-ink transition-colors group-hover:text-brand">
          {service.name}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-mute line-clamp-3">
          {service.short_description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-line/40 pt-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-mute">
            <Clock className="h-3.5 w-3.5 text-clay" />
            <span>45 – 60 min sessions</span>
          </span>
          <span className="text-xs font-bold text-brand transition-colors group-hover:underline">
            View Protocol
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ServicesPreview() {
  const { data, isLoading } = useServices();
  const items = (data?.items || []).slice(0, 5);

  return (
    <Section id="services" tone="white" className="relative">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Key treatments"
            title="Care built around your recovery goals."
            text="From acute back pain to comprehensive paralysis and stroke rehabilitation, every treatment plan begins with a thorough clinical assessment and is adjusted as you progress."
          />
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-canvas px-5 py-2 text-xs font-bold text-brand transition-all hover:bg-brand hover:text-white"
            data-testid="services-view-all"
          >
            <span>View all 9 treatments</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <LoadingState className="mt-12" />
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3" data-testid="services-preview-grid">
            {items.map((s, i) => (
              <ServiceCard key={s.id} service={s} featured={i === 0} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
