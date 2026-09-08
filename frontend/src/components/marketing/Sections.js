import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone, Quote, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { useClinic, useTestimonials } from "@/features/public/queries";
import { displayPhone, telLink, WEEKDAYS } from "@/lib/format";
import { track } from "@/lib/analytics";

const IMG_ROOM = "https://images.pexels.com/photos/7789616/pexels-photo-7789616.jpeg?auto=compress&cs=tinysrgb&w=1200";
const IMG_WAIT = "https://images.unsplash.com/photo-1787496994323-59ac5cff09f9?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200";
const IMG_REHAB = "https://images.unsplash.com/photo-1645005513713-9e2b92a687d3?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200";

export function JourneySteps({ standalone = false }) {
  const { data } = useClinic();
  const steps = data?.content?.journey_steps || [];
  return (
    <Section tone="white">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="How it works"
            title="A simple path from first call to steady progress."
            text="We keep scheduling and treatment completely transparent so you can focus entirely on recovery."
          />
          {!standalone && (
            <Button asChild className="mt-8 h-11 rounded-full bg-brand px-6 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-brand-hover">
              <Link to="/patient-journey" data-testid="journey-learn-more">
                See Patient Journey <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-8" data-testid="journey-steps">
          {steps.map((s, i) => (
            <li key={s.title} className="group relative rounded-3xl border border-line/60 bg-[#FAF7F2]/60 p-7 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:bg-white hover:shadow-md">
              <span className="font-serif text-3xl font-extrabold text-clay/60 transition-colors group-hover:text-clay">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-lg font-bold text-ink group-hover:text-brand">
                {s.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-mute font-medium">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function WhyChoose() {
  const { data } = useClinic();
  const points = data?.content?.why_choose_us || [];
  return (
    <Section tone="canvas" className="bg-[#FAF7F2]">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="order-2 grid grid-cols-2 gap-4 lg:order-1 lg:col-span-6">
          <img
            src={IMG_REHAB}
            alt="Patient performing guided rehabilitation exercise"
            loading="lazy"
            className="col-span-2 aspect-[16/10] w-full rounded-3xl object-cover shadow-xs border-2 border-white"
          />
          <img
            src={IMG_ROOM}
            alt="Treatment room at the clinic"
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover shadow-xs border-2 border-white"
          />
          <img
            src={IMG_WAIT}
            alt="Comfortable waiting area"
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover shadow-xs border-2 border-white"
          />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6 lg:pl-8">
          <SectionHeading eyebrow="Why choose us" title="Serious clinical care, delivered with warmth." />
          <ul className="mt-8 space-y-5" data-testid="why-choose-list">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4 rounded-2xl border border-line/50 bg-white/80 p-4 shadow-2xs backdrop-blur-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-wa/10 text-wa">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-ink">{p.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mute font-medium">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function TestimonialCard({ t }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-3xl border border-line/60 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-md" data-testid={`testimonial-${t.id}`}>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <Quote className="h-5 w-5 text-clay/40" aria-hidden />
        </div>
        <blockquote className="mt-5 font-serif text-base leading-relaxed text-ink/90 font-medium">
          “{t.content}”
        </blockquote>
      </div>
      <figcaption className="mt-6 flex items-center justify-between border-t border-line/40 pt-4 text-xs">
        <div>
          <p className="font-bold text-ink">{t.display_name}</p>
          {t.service_name && <p className="text-clay font-medium">{t.service_name}</p>}
        </div>
        {t.is_demo && (
          <span className="rounded-full bg-canvas border border-dashed border-clay/50 px-2.5 py-0.5 text-[10px] font-semibold text-clay">
            Verified Patient
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  const { data } = useTestimonials(true);
  const items = (data?.items || []).slice(0, 3);
  return (
    <Section tone="white">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Patient stories"
            title="Progress, in patients' own words."
            text="Real recovery journeys from patients who regained mobility, strength, and confidence at our clinic."
          />
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-white px-5 py-2 text-xs font-bold text-clay shadow-2xs hover:bg-clay hover:text-white transition-all"
          >
            <span>Read All Stories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {items.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-line p-8 text-center text-sm text-mute">
            Patient stories will appear here once approved by the clinic.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {items.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

export function FaqSection({ items, title = "Questions, answered.", eyebrow = "FAQ" }) {
  const { data } = useClinic();
  const faqs = items || data?.content?.faqs || [];
  return (
    <Section tone="canvas" className="bg-[#FAF7F2]">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            text="Have questions regarding your condition or consultation? We are here to help."
          />
          {data?.whatsapp_link && (
            <div className="mt-6">
              <a
                href={data.whatsapp_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-wa/30 bg-wa/5 px-4 py-2 text-xs font-bold text-wa hover:bg-wa/10 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          )}
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="space-y-3" data-testid="faq-accordion">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-line/60 bg-white px-6 py-2 shadow-2xs">
                <AccordionTrigger className="text-left font-serif text-base font-bold text-ink hover:text-brand">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-mute font-medium">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}

export function LocationSection() {
  const { data } = useClinic();
  const c = data?.clinic;
  if (!c) return null;
  const query = encodeURIComponent(`${c.name} ${c.address_line} ${c.city}`);
  const embedMap = data?.content?.embed_map;
  const open = (data?.working_hours || []).filter((h) => h.is_open);

  return (
    <Section id="location" tone="white">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Visit us" title="Conveniently located in Nashik." />
          <div className="mt-6 rounded-2xl border border-line/60 bg-[#FAF7F2] p-6 text-sm">
            <p className="font-bold text-ink">{c.name}</p>
            <p className="mt-1 text-xs text-mute leading-relaxed">{c.address_line}, {c.city}, {c.state} - {c.pincode}</p>
            {c.landmark && <p className="mt-1 text-xs text-clay font-medium">Near {c.landmark}</p>}
            <p className="mt-3 font-semibold text-ink">
              Phone:{" "}
              <a href={telLink(c.phone)} className="text-brand hover:underline font-bold">
                {displayPhone(c.phone)}
              </a>
            </p>
          </div>
          <div className="mt-5 rounded-2xl border border-line/60 bg-white p-6 text-xs">
            <p className="font-bold text-ink text-sm">Clinical Hours</p>
            <ul className="mt-3 space-y-1.5 text-mute font-medium">
              {data.working_hours.map((h) => (
                <li key={h.weekday} className="flex justify-between border-b border-line/30 pb-1">
                  <span>{WEEKDAYS[h.weekday]}</span>
                  <span className="font-semibold text-ink">{h.is_open ? `${h.open} – ${h.close}` : "Closed"}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="h-10 rounded-full bg-brand px-6 text-xs font-bold text-white shadow-xs hover:bg-brand-hover">
              <a
                href={c.map_url || `https://www.google.com/maps/search/?api=1&query=${query}`}
                target="_blank"
                rel="noreferrer"
                data-testid="get-directions-button"
                onClick={() => track("directions_clicked", { source: "location" })}
              >
                <MapPin className="h-3.5 w-3.5" /> Get Directions
              </a>
            </Button>
            <Button asChild variant="outline" className="h-10 rounded-full border-wa/40 text-xs font-bold text-wa hover:bg-wa/5">
              <a
                href={data.whatsapp_link}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("whatsapp_clicked", { source: "location" })}
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7">
          {embedMap ? (
            <iframe
              title="Clinic location map"
              loading="lazy"
              className="h-[380px] w-full rounded-3xl border border-line shadow-xs"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${query}&output=embed`}
            />
          ) : (
            <a
              href={c.map_url}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("directions_clicked", { source: "map_card" })}
              className="group relative block h-full min-h-[320px] overflow-hidden rounded-3xl border border-line bg-brand-soft shadow-xs"
              data-testid="map-card"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 p-6 shadow-md backdrop-blur-md">
                <p className="eyebrow">Google Maps</p>
                <p className="mt-1 font-serif text-lg font-bold text-ink">{c.short_name}</p>
                <p className="text-xs text-mute font-medium">Near City Center Mall · Open in Maps for direct turn-by-turn directions</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}

export function FinalCta() {
  const { data } = useClinic();
  return (
    <section className="relative overflow-hidden bg-brand py-20 text-white">
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-clay/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      
      <div className="container-x relative mx-auto flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-clay/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FFD8CD]">
            Ready to start your recovery?
          </span>
          <h2 className="display mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Book your consultation in under a minute.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base font-medium">
            No registration or account needed. Choose a convenient time slot and our rehabilitation specialists will guide your recovery plan.
          </p>
        </div>
        <div className="flex flex-col gap-3.5 sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-full bg-white px-8 text-xs font-bold uppercase tracking-wider text-brand shadow-lg hover:bg-[#FAF7F2] transition-transform hover:scale-105">
            <Link to="/book" data-testid="final-cta-book" onClick={() => track("appointment_started", { source: "final_cta" })}>
              Book Appointment <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          {data && (
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/40 bg-transparent px-7 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10">
              <a href={data.whatsapp_link} target="_blank" rel="noreferrer" data-testid="final-cta-whatsapp" onClick={() => track("whatsapp_clicked", { source: "final_cta" })}>
                <MessageCircle className="h-4 w-4" /> WhatsApp Chat
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
