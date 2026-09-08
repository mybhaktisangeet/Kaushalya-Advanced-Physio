import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, CheckCircle2, MessageCircle, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClinic, useDoctors, useNextAvailable } from "@/features/public/queries";
import { formatDate, telLink } from "@/lib/format";
import { track } from "@/lib/analytics";

const HERO_IMAGE = "https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";
const DOCTOR_AVATAR = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=srgb&fm=jpg&q=80&w=400";
const CLINIC_THUMB = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=srgb&fm=jpg&q=80&w=500";

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=srgb&fm=jpg&q=80&w=120",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&q=80&w=120",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=srgb&fm=jpg&q=80&w=120",
];

export function Hero() {
  const { data: clinicData } = useClinic();
  const { data: doctorsData } = useDoctors();
  const { next } = useNextAvailable();

  const clinic = clinicData?.clinic;
  const content = clinicData?.content;
  const leadDoctor = doctorsData?.doctors?.[0];

  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] pt-6 pb-16 lg:pt-10 lg:pb-24">
      {/* Ambient background soft light glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#F3E7DC] to-transparent opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-clay/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-20 h-80 w-80 rounded-full bg-[#E5D7CA]/40 blur-3xl" />

      <div className="container-x relative">
        {/* Top Header Row with Value Proposition & Social Proof Pill */}
        <div className="grid items-center gap-6 lg:grid-cols-12">
          {/* Left Value Proposition Banner */}
          <div className="flex flex-col items-start gap-3 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-white/70 px-3.5 py-1 text-xs font-semibold text-clay shadow-2xs backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-clay animate-pulse" />
              <span>{clinic?.city ? `Premier Rehabilitation in ${clinic.city}` : "Specialized Clinical Care"}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay text-white shadow-xs">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
              <p className="max-w-xl text-sm font-medium leading-snug text-ink/80 sm:text-base">
                Evidence-Led and Personalized Rehabilitation for Every Stage of Your{" "}
                <span className="font-semibold text-clay">Mobility & Recovery</span> Journey
              </p>
            </div>
          </div>

          {/* Right Social Proof Pill Stack */}
          <div className="flex items-center justify-start gap-3.5 lg:col-span-4 lg:justify-end">
            <div className="flex -space-x-2.5 overflow-hidden">
              {AVATARS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Recovered patient"
                  className="inline-block h-10 w-10 rounded-full border-2 border-white object-cover shadow-xs"
                />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span>4.9 / 5 Rating</span>
              </div>
              <p className="text-xs font-medium text-mute">
                Over <span className="font-bold text-ink">2,500+</span> recoveries in Nashik
              </p>
            </div>
          </div>
        </div>

        {/* Central Monumental Typographic Showcase */}
        <div className="relative mt-8 mb-10 flex flex-col items-center justify-center text-center sm:mt-12 sm:mb-16">
          {/* Monumental Sculptural Backdrop Typography */}
          <div className="relative w-full select-none text-center">
            <div className="flex flex-wrap items-center justify-center font-extrabold tracking-tight">
              <span className="text-5xl font-black uppercase tracking-tight text-clay/25 sm:text-7xl md:text-8xl lg:text-[108px] xl:text-[124px] leading-none">
                PREMIER
              </span>
              <span className="ml-3 sm:ml-6 text-5xl font-black uppercase tracking-tight text-clay/20 sm:text-7xl md:text-8xl lg:text-[108px] xl:text-[124px] leading-none">
                PHYSIO
              </span>
            </div>
          </div>

          {/* Central Floating Hero Card (Overlapping like reference image) */}
          <div className="relative -mt-10 sm:-mt-16 md:-mt-20 z-10 mx-auto w-full max-w-[340px] sm:max-w-md md:max-w-lg">
            <div className="group relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="Physiotherapy treatment session"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-white/80">Specialized In</p>
                    <p className="text-sm font-bold sm:text-base">Paralysis, Stroke & Orthopaedic Rehab</p>
                  </div>
                  {next && (
                    <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-wa animate-pulse" />
                      <span className="font-medium text-white">{formatDate(next.date)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Central Connecting Badge */}
          <div className="relative z-20 -mt-5 flex flex-col items-center gap-2">
            <Link
              to="/book"
              onClick={() => track("appointment_started", { source: "hero_central" })}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
              aria-label="Book consultation"
            >
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <a href="#services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-mute hover:text-ink transition-colors">
              <ArrowDown className="h-3 w-3 text-clay animate-bounce" />
              <span>Scroll to explore treatments</span>
            </a>
          </div>
        </div>

        {/* Dual Bottom Glassmorphic Shelf (Matching Reference Design) */}
        <div className="relative mx-auto mt-4 max-w-5xl rounded-3xl border border-white/80 bg-white/70 p-4 shadow-xl backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            
            {/* Left Card: Meet Our Team */}
            <div className="flex flex-col justify-between rounded-2xl border border-line/50 bg-white/90 p-5 shadow-xs transition-all hover:shadow-md md:col-span-6 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-clay">Meet Our Specialists</span>
                <Link
                  to="/doctors"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-canvas text-ink transition-colors hover:bg-brand hover:text-white"
                  aria-label="View all doctors"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <img
                  src={leadDoctor?.image_url || DOCTOR_AVATAR}
                  alt={leadDoctor?.name || "Dr. Ananya Kulkarni"}
                  className="h-16 w-16 rounded-2xl object-cover shadow-xs"
                />
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-ink">
                    {leadDoctor?.name || "Dr. Ananya Kulkarni"}
                  </h3>
                  <p className="text-xs text-mute font-medium">
                    {leadDoctor?.qualifications || "MPT (Neuro), BPT"} · {leadDoctor?.experience_years ? `${leadDoctor.experience_years}+ yrs exp` : "12+ yrs experience"}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-brand">
                    Lead Rehabilitation Specialist
                  </p>
                </div>
              </div>
            </div>

            {/* Center Quick Booking CTA (Divider/Anchor) */}
            <div className="flex flex-col items-center justify-center text-center md:col-span-12 lg:col-span-2">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-brand px-6 py-3 text-xs font-bold tracking-wide text-white shadow-md transition-all hover:bg-brand-hover hover:shadow-lg"
              >
                <Link to="/book" data-testid="hero-book-button" onClick={() => track("appointment_started", { source: "hero_shelf" })}>
                  Book Visit
                </Link>
              </Button>
              {clinicData?.whatsapp_link && (
                <a
                  href={clinicData.whatsapp_link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("whatsapp_clicked", { source: "hero_shelf" })}
                  data-testid="hero-whatsapp-button"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-wa hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              )}
            </div>

            {/* Right Card: Clinical Excellence / About */}
            <div className="flex flex-col justify-between rounded-2xl border border-line/50 bg-white/90 p-5 shadow-xs transition-all hover:shadow-md md:col-span-6 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-clay">Clinical Excellence</span>
                <Link
                  to="/about"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-canvas text-ink transition-colors hover:bg-brand hover:text-white"
                  aria-label="Learn about our clinic"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-3 flex items-center gap-4">
                <p className="text-xs leading-relaxed text-mute font-medium">
                  At Kaushalya Advanced Physio, we combine evidence-based manual therapy, advanced neuro-rehab technology, and personalized 1-on-1 care to restore independence.
                </p>
                <img
                  src={CLINIC_THUMB}
                  alt="Clinical equipment"
                  className="hidden sm:block h-16 w-20 shrink-0 rounded-xl object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
