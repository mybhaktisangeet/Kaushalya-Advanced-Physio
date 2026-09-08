import { Link } from "react-router-dom";
import { Activity, ArrowRight, ArrowUpRight, Bone, Brain, Dumbbell, Footprints, HelpCircle, PersonStanding, Stethoscope } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { useClinic } from "@/features/public/queries";

const ICONS = {
  back_pain: Activity,
  neck_pain: PersonStanding,
  knee_joint_pain: Bone,
  sports_injury: Dumbbell,
  post_surgery: Stethoscope,
  neuro: Brain,
  mobility: Footprints,
  other: HelpCircle,
};

export function ConditionsGrid({ compact = false }) {
  const { data } = useClinic();
  const conditions = data?.content?.conditions || [];

  return (
    <Section id="conditions" className="bg-[#FAF7F2]">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What brings you here?"
            title="Start with what you feel, not what it's called."
            text="You don't need a medical diagnosis to begin. Select the concern you are experiencing and our specialists will assess the root cause."
          />
          {!compact && (
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-white/80 px-5 py-2 text-xs font-bold text-clay shadow-2xs backdrop-blur-sm transition-all hover:bg-clay hover:text-white"
              data-testid="conditions-all-services"
            >
              <span>Explore All Treatments</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4" data-testid="conditions-grid">
          {conditions.map((c, i) => {
            const Icon = ICONS[c.key] || HelpCircle;
            const to = c.key === "other" ? "/book" : `/services/${c.service_slug}`;
            return (
              <li key={c.key} className={`reveal reveal-delay-${Math.min(i % 4, 3)}`}>
                <Link
                  to={to}
                  data-testid={`condition-card-${c.key}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line/60 bg-white/90 p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-md sm:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay/10 text-clay transition-all duration-300 group-hover:scale-105 group-hover:bg-clay group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line/50 bg-canvas text-mute opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-clay">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-bold text-ink transition-colors group-hover:text-brand">
                      {c.label}
                    </h3>
                    <p className="mt-2 hidden text-xs leading-relaxed text-mute sm:block">
                      {c.description}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 pt-3 border-t border-line/40 text-xs font-bold uppercase tracking-wider text-clay">
                    <span>Clinical care</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
