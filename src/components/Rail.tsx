import { profile } from "../data/cv";
import { useCopyToClipboard } from "../lib/hooks";
import { Icon } from "./atoms";
import { cn } from "../utils/cn";

const NAV = [
  { id: "about", label: "Profile", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "work", label: "Selected Work", index: "03" },
  { id: "skills", label: "Skills & Tools", index: "04" },
  { id: "education", label: "Education", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

export function Rail({ active }: { active: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
      <div className="sticky top-24 space-y-6">
        <figure
          className="group relative bg-paper text-ink p-3 pb-4 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ease-out shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
          data-cursor
        >
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-lime/80 rotate-[3deg] shadow-sm" aria-hidden />
          <div className="overflow-hidden">
            <img
              src="/images/portrait.jpg"
              alt="Portrait of Ajay Thakur"
              className="w-full aspect-square object-cover grayscale-[0.35] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
              loading="lazy"
            />
          </div>
          <figcaption className="flex items-center justify-between pt-3 font-mono text-[10px] uppercase tracking-[0.18em]">
            <span>GWL — 2026</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-lime pulse-dot" aria-hidden />
              Open to work
            </span>
          </figcaption>
        </figure>

        <div className="border border-paper/12 bg-coal/60 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog mb-4">Quick facts</p>
          <ul className="space-y-3 font-mono text-xs">
            <li className="flex justify-between gap-3">
              <span className="text-fog">Name</span>
              <span className="text-paper">{profile.name}</span>
            </li>
            <li className="flex justify-between gap-3">
              <span className="text-fog">Role</span>
              <span className="text-paper text-right">Crypto · Quant</span>
            </li>
            <li className="flex justify-between gap-3">
              <span className="text-fog">Base</span>
              <span className="text-paper text-right">{profile.shortLocation}</span>
            </li>
            <li className="flex justify-between gap-3">
              <span className="text-fog">Email</span>
              <button
                onClick={() => copy(profile.email)}
                className={cn(
                  "flex items-center gap-1.5 transition-colors duration-300",
                  copied ? "text-lime" : "text-paper hover:text-lime"
                )}
                data-cursor
                aria-label="Copy email address"
              >
                {copied ? "copied ✓" : "ajaysingh@…"}
                <Icon name={copied ? "check" : "copy"} className="w-3 h-3" />
              </button>
            </li>
          </ul>
        </div>

        <nav className="border border-paper/12 bg-coal/60 p-5" aria-label="CV sections">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog mb-4">Index</p>
          <ul className="space-y-1">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    data-cursor
                    className={cn(
                      "group flex items-center gap-3 py-2 px-2 -mx-2 font-display font-bold uppercase tracking-wide text-sm transition-all duration-300",
                      isActive ? "text-ink" : "text-fog hover:text-paper hover:translate-x-1.5"
                    )}
                  >
                    <span
                      className={cn(
                        "h-px transition-all duration-400",
                        isActive ? "w-8 bg-ink" : "w-4 bg-paper/25 group-hover:w-6 group-hover:bg-lime"
                      )}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "relative transition-colors duration-300",
                        isActive && "bg-lime px-2 -mx-2 -skew-x-6"
                      )}
                    >
                      {item.label}
                    </span>
                    <span className={cn("ml-auto font-mono text-[10px]", isActive ? "text-ink/60" : "text-fog/50")}>
                      {item.index}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
                data-cursor
                aria-label={s.label}
                className="w-10 h-10 border border-paper/15 flex items-center justify-center text-fog hover:text-ink hover:bg-lime hover:border-lime hover:-translate-y-1 transition-all duration-300"
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
          <a
            href="#contact"
            data-cursor
            className="group flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog hover:text-lime transition-colors"
          >
            Say hi
            <Icon
              name="arrow-up-right"
              className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </aside>
  );
}
