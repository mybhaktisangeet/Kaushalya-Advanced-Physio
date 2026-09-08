import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Award, Calendar, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { useDoctors } from "@/features/public/queries";
import { DemoBadge } from "@/components/shared/Primitives";
import { LoadingState } from "@/components/shared/States";

export function DoctorCard({ doctor }) {
  return (
    <Link
      to={`/doctors/${doctor.slug}`}
      data-testid={`doctor-card-${doctor.slug}`}
      className="group flex flex-col justify-between rounded-3xl border border-line/60 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-lg"
    >
      <div>
        <div className="relative mb-5 flex items-start justify-between">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-white shadow-sm">
            <img
              src={doctor.photo_url || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=srgb&fm=jpg&q=80&w=300"}
              alt={doctor.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {doctor.is_demo ? (
            <DemoBadge />
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-wa/10 px-2.5 py-0.5 text-[11px] font-semibold text-wa">
              <CheckCircle2 className="h-3 w-3" /> Verified
            </span>
          )}
        </div>

        <h3 className="font-serif text-lg font-bold text-ink transition-colors group-hover:text-brand">
          {doctor.name}
        </h3>
        
        <p className="mt-1 text-xs font-semibold text-clay">
          {doctor.designation}
        </p>

        <p className="mt-0.5 text-xs text-mute font-medium">
          {doctor.qualification}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {(doctor.specializations || []).slice(0, 3).map((s) => (
            <li key={s} className="rounded-full bg-brand-soft/70 px-2.5 py-0.5 text-[11px] font-medium text-brand">
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line/40 pt-4 text-xs font-semibold">
        <span className="inline-flex items-center gap-1 text-mute">
          <Award className="h-3.5 w-3.5 text-clay" />
          <span>{doctor.experience_years ? `${doctor.experience_years}+ Years Experience` : "Expert Clinician"}</span>
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas text-brand transition-colors group-hover:bg-brand group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function DoctorsPreview() {
  const { data, isLoading } = useDoctors();
  const items = (data?.items || []).slice(0, 4);

  return (
    <Section tone="canvas" className="bg-[#FAF7F2]">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Meet the specialists"
            title="An experienced team, focused on your recovery."
            text="Qualified physiotherapists across neurological, orthopaedic, sports injury and post-operative rehabilitation."
          />
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-white/90 px-5 py-2 text-xs font-bold text-clay shadow-2xs backdrop-blur-sm transition-all hover:bg-clay hover:text-white"
            data-testid="doctors-view-all"
          >
            <span>Meet All Doctors</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <LoadingState className="mt-12" />
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-testid="doctors-preview-grid">
            {items.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
