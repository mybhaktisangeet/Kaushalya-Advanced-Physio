import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, MessageCircle, Phone, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClinic } from "@/features/public/queries";
import { telLink } from "@/lib/format";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/doctors", label: "Doctors" },
  { to: "/patient-journey", label: "Patient Journey" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { data } = useClinic();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const clinic = data?.clinic;

  return (
    <header className="sticky top-0 z-40 w-full px-3 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/70 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl transition-all sm:px-6">
        
        {/* Brand Logo */}
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2.5" aria-label="Home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white shadow-sm transition-transform hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" strokeLinecap="round" />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-base font-bold leading-tight text-ink sm:text-lg">
              {clinic?.short_name || "Kaushalya"}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-clay">
              Advanced Physio
            </span>
          </div>
        </Link>

        {/* Center Navigation Pills */}
        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-line/60 bg-canvas/80 px-3 py-1.5 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide transition-all",
                  isActive
                    ? "bg-white text-brand shadow-xs"
                    : "text-mute hover:text-ink"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-clay animate-pulse" />}
                  {l.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-2.5 sm:flex">
          {clinic && (
            <a
              href={telLink(clinic.phone)}
              onClick={() => track("call_clicked", { source: "nav" })}
              data-testid="nav-call-link"
              className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-mute transition-colors hover:text-ink lg:flex"
            >
              <Phone className="h-3.5 w-3.5 text-clay" />
              <span>Call</span>
            </a>
          )}

          {data && (
            <a
              href={data.whatsapp_link}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "nav" })}
              data-testid="nav-whatsapp-link"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-wa/30 bg-wa/5 px-3.5 text-xs font-semibold text-wa transition-colors hover:bg-wa/10"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
          )}

          <Button
            asChild
            className="h-9 rounded-full bg-brand px-5 text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-brand-hover hover:shadow-md"
          >
            <Link to="/book" data-testid="nav-book-button">
              Book Appointment
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          data-testid="nav-menu-toggle"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-canvas text-ink lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-7xl rounded-2xl border border-line bg-white/95 p-4 shadow-lg backdrop-blur-xl lg:hidden"
          data-testid="mobile-menu"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                    isActive ? "bg-brand-soft text-brand font-bold" : "text-mute hover:bg-canvas hover:text-ink"
                  )
                }
              >
                <span>{l.label}</span>
              </NavLink>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-line/60 pt-3">
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="rounded-full bg-brand py-2.5 text-center text-sm font-semibold text-white shadow-sm"
                data-testid="mobile-menu-book"
              >
                Book Appointment
              </Link>
              {location.pathname !== "/admin" && (
                <Link
                  to="/admin/login"
                  onClick={() => setOpen(false)}
                  className="text-center text-xs text-mute hover:underline"
                >
                  Clinic staff sign in
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
