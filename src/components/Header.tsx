import { downloadCv, profile } from "../data/cv";
import { useClock, useScrollProgress } from "../lib/hooks";
import { Icon, Magnetic } from "./atoms";
import { cn } from "../utils/cn";

const NAV = [
  { id: "about", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
];

export function Header({ active }: { active: string }) {
  const progress = useScrollProgress();
  const time = useClock(profile.timezone);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="bg-ink/80 backdrop-blur-md border-b border-paper/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-16 flex items-center justify-between gap-4">
          <a href="#profile" className="group flex items-center gap-3" data-cursor>
            <span className="w-8 h-8 rounded-full bg-lime text-ink flex items-center justify-center font-display font-extrabold text-sm transition-transform duration-500 group-hover:rotate-[360deg]">
              A
            </span>
            <span className="font-display font-bold uppercase tracking-widest text-sm hidden sm:block">
              Ajay Thakur<span className="text-lime">©26</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Sections">
            {NAV.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-cursor
                className={cn(
                  "relative px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
                  active === item.id ? "text-ink" : "text-fog hover:text-paper"
                )}
              >
                {active === item.id && (
                  <span className="absolute inset-0 bg-lime -skew-x-12 scale-y-[0.85]" aria-hidden />
                )}
                <span className="relative">
                  <span className="text-lime mr-1" style={active === item.id ? { color: "var(--color-ink)" } : undefined}>
                    0{i + 1}
                  </span>
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <span
              className="hidden md:flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-fog"
              aria-label="Local time in Gwalior"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime pulse-dot" aria-hidden />
              IST {time}
            </span>
            <Magnetic strength={0.25}>
              <button
                onClick={downloadCv}
                className="group flex items-center gap-2 bg-paper text-ink font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2.5 hover:bg-lime transition-colors duration-300"
                data-cursor
              >
                <Icon name="download" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span className="hidden sm:inline">Download CV</span>
                <span className="sm:hidden">CV</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
      <div
        className="h-[2px] bg-lime origin-left transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
    </header>
  );
}
