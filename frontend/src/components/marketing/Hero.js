import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, ChevronRight, MessageCircle, MousePointer, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClinic, useDoctors, useNextAvailable } from "@/features/public/queries";
import { formatDate, telLink } from "@/lib/format";
import { track } from "@/lib/analytics";

const HERO_IMAGE = "https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";
const DOCTOR_AVATAR = "https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=srgb&fm=jpg&q=80&w=400";
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
  const leadDoctor = doctorsData?.doctors?.[0] || doctorsData?.items?.[0];

  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] pt-6 pb-16 lg:pt-10 lg:pb-20">
      {/* Ambient background soft light glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[580px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#F7ECE4] via-[#FCEEE5]/60 to-transparent opacity-80 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -left-28 h-96 w-96 rounded-full bg-[#F3E2D5]/50 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-[#EFE3D5]/50 blur-3xl" />

      {/* Decorative Faint Outline Typography in Corners (Magazine Luxury Feel) */}
      <div className="pointer-events-none absolute -bottom-10 -left-12 select-none text-8xl font-black tracking-widest text-[#EBD9CC]/30 lg:text-9xl -rotate-12">
        CARE
      </div>
      <div className="pointer-events-none absolute -bottom-10 -right-12 select-none text-8xl font-black tracking-widest text-[#EBD9CC]/30 lg:text-9xl rotate-12">
        REHAB
      </div>

      <div className="container-x relative z-10">
        
        {/* Main Flanking Monumental Hero Composition (Faithful to Reference Design) */}
        <div className="relative mt-2 mb-8 lg:mt-6 lg:mb-14">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-4">
            
            {/* Left Column: Monumental 'PREMIER' + Value Proposition */}
            <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left order-2 lg:order-1">
              {/* City Pill Tag */}
              <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-white/80 px-3.5 py-1 text-xs font-semibold text-clay shadow-2xs backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-clay animate-pulse" />
                <span>{clinic?.city ? `Premier Rehabilitation in ${clinic.city}` : "Premier Physio Clinic"}</span>
              </div>

              {/* Monumental Word: PREMIER */}
              <div className="mt-4 mb-3">
                <span className="font-black uppercase tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[104px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#D96830] via-[#F49756] to-[#C85920] select-none filter drop-shadow-[0_4px_16px_rgba(217,104,48,0.16)]">
                  PREMIER
                </span>
              </div>

              {/* Left Value Proposition Card/Badge */}
              <div className="mt-2 flex max-w-sm items-start gap-3 rounded-2xl border border-white/80 bg-white/60 p-3.5 shadow-2xs backdrop-blur-md">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D96830] text-white shadow-xs">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <p className="text-xs font-medium leading-relaxed text-ink/80 sm:text-sm">
                  Comprehensive and Expert Solutions for Every Stage of Your{" "}
                  <span className="font-bold text-[#D96830]">Mobility & Paralysis Recovery</span> Journey
                </p>
              </div>
            </div>

            {/* Center Column: The Floating Clinical Squircle Card & Connected Scroll Cue */}
            <div className="relative flex flex-col items-center justify-center lg:col-span-4 order-1 lg:order-2">
              
              {/* Floating Center Squircle Card with Thick White Frame */}
              <div className="group relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px]">
                <div className="relative overflow-hidden rounded-[36px] border-[6px] border-white bg-white shadow-[0_24px_60px_-15px_rgba(200,100,50,0.22)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-15px_rgba(200,100,50,0.3)]">
                  <div className="relative aspect-[4/3.8] w-full overflow-hidden">
                    <img
                      src={HERO_IMAGE}
                      alt="Specialized physiotherapy rehabilitation session"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                    
                    {/* Bottom Floating Tag on Image */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-white/85">Clinical Specialty</p>
                        <p className="text-sm font-bold sm:text-base leading-tight">Paralysis, Stroke & Orthopaedic Rehab</p>
                      </div>
                      {next && (
                        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/25 px-2.5 py-1 text-[11px] backdrop-blur-md border border-white/30">
                          <span className="h-1.5 w-1.5 rounded-full bg-wa animate-pulse" />
                          <span className="font-semibold text-white">{formatDate(next.date)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Interactive Connector & Scroll Indicator (Matching Reference Image) */}
              <div className="relative z-20 mt-4 flex flex-col items-center">
                {/* Purple Action Pill with Arrow ↗ */}
                <Link
                  to="/book"
                  onClick={() => track("appointment_started", { source: "hero_central_circle" })}
                  className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] text-white shadow-lg shadow-purple-600/30 transition-all duration-300 hover:scale-110 hover:shadow-purple-600/50 active:scale-95"
                  aria-label="Book appointment now"
                >
                  <ArrowUpRight className="h-6 w-6 stroke-[2.5]" />
                </Link>

                {/* Vertical Fine Connecting Line */}
                <div className="h-6 w-px border-l-2 border-dotted border-clay/50 my-1" />

                {/* Orange/Amber Scroll Pill Button */}
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-[#EA580C]/30 bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD5] px-4 py-1.5 text-xs font-semibold text-[#C2410C] shadow-2xs transition-all hover:bg-orange-100 hover:shadow-xs"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#EA580C] text-white">
                    <ArrowDown className="h-2.5 w-2.5 animate-bounce" />
                  </span>
                  <span>Please scroll to find more information</span>
                </a>
              </div>

            </div>

            {/* Right Column: Monumental 'PHYSIO' + Social Proof Stack */}
            <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-end lg:text-right order-3">
              {/* Social Proof Stack (Avatars + Star Rating) */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/60 p-2.5 shadow-2xs backdrop-blur-md">
                <div className="flex -space-x-2.5 overflow-hidden">
                  {AVATARS.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Recovered patient"
                      className="inline-block h-9 w-9 rounded-full border-2 border-white object-cover shadow-xs"
                    />
                  ))}
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>4.9 / 5 Clinical Rating</span>
                  </div>
                  <p className="text-[11px] font-medium text-mute">
                    Restoring <span className="font-bold text-ink">2,500+</span> recoveries in Nashik
                  </p>
                </div>
                <Link
                  to="/testimonials"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FAF6F0] border border-line text-ink hover:bg-brand hover:text-white transition-colors"
                  aria-label="View patient testimonials"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Monumental Word: PHYSIO */}
              <div className="mt-4 mb-3">
                <span className="font-black uppercase tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[104px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#D96830] via-[#F49756] to-[#C85920] select-none filter drop-shadow-[0_4px_16px_rgba(217,104,48,0.16)]">
                  PHYSIO
                </span>
              </div>

              {/* Right Descriptive Accent Pill */}
              <p className="max-w-xs text-xs font-medium leading-relaxed text-ink/70 sm:text-sm">
                Advanced stroke rehabilitation, orthopaedic relief, and neurological re-education delivered with dignity.
              </p>
            </div>

          </div>
        </div>

        {/* Dual Bottom Glassmorphic Shelf (Faithful to Reference Layout) */}
        <div className="relative mx-auto mt-6 max-w-5xl rounded-[32px] border border-white/80 bg-white/75 p-4 shadow-[0_20px_50px_rgba(180,90,40,0.06)] backdrop-blur-2xl sm:p-6 lg:p-7">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            
            {/* Left Card: Meet Our Specialists */}
            <div className="flex flex-col justify-between rounded-2xl border border-line/50 bg-white/90 p-5 shadow-xs transition-all hover:border-clay/40 hover:shadow-md md:col-span-6 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-clay">Meet Our Team</span>
                <Link
                  to="/doctors"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-[#FAF6F0] text-ink transition-colors hover:bg-brand hover:text-white"
                  aria-label="View all doctors"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <img
                  src={leadDoctor?.photo_url && leadDoctor.photo_url.startsWith("http") && !leadDoctor.photo_url.includes("1594824813581") ? leadDoctor.photo_url : DOCTOR_AVATAR}
                  alt={leadDoctor?.name || "Dr. Ananya Kulkarni"}
                  onError={(e) => { e.currentTarget.src = DOCTOR_AVATAR; }}
                  className="h-16 w-16 rounded-2xl object-cover shadow-xs border border-white"
                />
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-ink">
                    {leadDoctor?.name || "Dr. Ananya Kulkarni"}
                  </h3>
                  <p className="text-xs text-mute font-medium">
                    {leadDoctor?.qualification || "MPT (Neuro), BPT"} · {leadDoctor?.experience_years ? `${leadDoctor.experience_years}+ yrs exp` : "12+ yrs experience"}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-brand">
                    Lead Rehabilitation Specialist
                  </p>
                </div>
              </div>
            </div>

            {/* Center Quick Action Divider */}
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
              <p className="mt-2 text-[11px] font-medium text-mute">
                Mon - Sat: 9 AM - 8 PM
              </p>
            </div>

            {/* Right Card: About / Clinical Excellence */}
            <div className="flex flex-col justify-between rounded-2xl border border-line/50 bg-white/90 p-5 shadow-xs transition-all hover:border-clay/40 hover:shadow-md md:col-span-6 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-clay">About</span>
                <Link
                  to="/about"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-[#FAF6F0] text-ink transition-colors hover:bg-brand hover:text-white"
                  aria-label="Learn about our clinic"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-3 flex items-center gap-4">
                <p className="text-xs leading-relaxed text-mute font-medium">
                  At Kaushalya Advanced Physio, we believe that restoring mobility changes lives. Combining evidence-based care with advanced neuro-rehab technology.
                </p>
                <img
                  src={CLINIC_THUMB}
                  alt="Modern clinic equipment"
                  className="hidden sm:block h-16 w-20 shrink-0 rounded-xl object-cover border border-white shadow-2xs"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
