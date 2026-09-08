import { Award, Clock, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Hero } from "@/components/marketing/Hero";
import { ConditionsGrid } from "@/components/marketing/ConditionsGrid";
import { ServicesPreview } from "@/components/marketing/ServicesPreview";
import { DoctorsPreview } from "@/components/marketing/DoctorsPreview";
import { FaqSection, FinalCta, JourneySteps, LocationSection, TestimonialsSection, WhyChoose } from "@/components/marketing/Sections";
import { useClinic } from "@/features/public/queries";
import { useSeo } from "@/lib/seo";

export default function Home() {
  const { data } = useClinic();
  const c = data?.clinic;

  useSeo({
    title: "Physiotherapy & Paralysis Rehabilitation in Nashik",
    description: c?.tagline || "Personalised physiotherapy and paralysis rehabilitation in Nashik. Book an appointment online in under a minute.",
    path: "/",
    jsonLd: c && {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: c.name,
      telephone: c.phone,
      medicalSpecialty: "Physiotherapy",
      address: {
        "@type": "PostalAddress",
        streetAddress: c.address_line,
        addressLocality: c.city,
        addressRegion: c.state,
        postalCode: c.pincode,
        addressCountry: "IN",
      },
      url: window.location.origin,
      hasMap: c.map_url,
      openingHoursSpecification: (data.working_hours || [])
        .filter((h) => h.is_open)
        .map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][h.weekday],
          opens: h.open,
          closes: h.close,
        })),
    },
  });

  const trustMetrics = [
    { icon: Award, label: "12+ Years", sub: "Clinical Experience" },
    { icon: ShieldCheck, label: "Evidence-Based", sub: "Custom Protocols" },
    { icon: HeartHandshake, label: "2,500+ Patients", sub: "Restored Mobility" },
    { icon: Clock, label: "Zero Wait Time", sub: "Confirmed Time Slots" },
  ];

  return (
    <>
      <Hero />

      {/* Trust & Credibility Strip */}
      <div className="border-y border-line/60 bg-[#FAF7F2]/80 backdrop-blur-md">
        <div className="container-x py-6" data-testid="trust-bar">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustMetrics.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-clay shadow-2xs border border-clay/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-serif text-sm font-bold leading-tight text-ink sm:text-base">
                      {item.label}
                    </p>
                    <p className="text-xs font-medium text-mute">
                      {item.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ConditionsGrid />
      <ServicesPreview />
      <DoctorsPreview />
      <JourneySteps />
      <WhyChoose />
      <TestimonialsSection />
      <FaqSection />
      <LocationSection />
      <FinalCta />
    </>
  );
}
