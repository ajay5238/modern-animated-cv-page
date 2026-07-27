import { downloadCv, profile } from "../data/cv";
import { useClock, useCopyToClipboard } from "../lib/hooks";
import { Icon, Magnetic, MaskText, Reveal } from "./atoms";
import { cn } from "../utils/cn";

export function Contact() {
  const { copied, copy } = useCopyToClipboard();
  const time = useClock(profile.timezone);

  return (
    <footer id="contact" className="relative mt-24 md:mt-36 border-t border-paper/12 overflow-hidden grid-bg">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -bottom-40 left-1/3 w-[36rem] h-[36rem] rounded-full bg-lime/[0.06] blur-3xl animate-drift" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime mb-6 flex items-center gap-3">
            <span className="w-10 h-px bg-lime" aria-hidden />
            ( 06 ) — Contact
          </p>
        </Reveal>

        <h2 className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[17vw] sm:text-[13vw] lg:text-[10rem]">
          <MaskText text="Let's" className="block" />
          <span className="block outline-text">
            <MaskText text="talk_" delay={120} />
          </span>
        </h2>

        <div className="mt-12 md:mt-16 grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          <Reveal className="lg:col-span-5" delay={80}>
            <p className="text-fog text-base md:text-lg leading-relaxed max-w-md">
              Open to{" "}
              <span className="text-paper">
                crypto market work, portfolio mandates, PE advisory, and full-stack engineering
              </span>{" "}
              where tech and markets meet. Based in Gwalior — working worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Magnetic strength={0.3}>
                <button
                  onClick={() => copy(profile.email)}
                  data-cursor
                  className={cn(
                    "group flex items-center gap-3 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] transition-all duration-300",
                    copied ? "bg-lime text-ink" : "bg-paper text-ink hover:bg-lime"
                  )}
                >
                  <Icon name={copied ? "check" : "mail"} className="w-4 h-4" />
                  {copied ? "Copied to clipboard" : profile.email}
                </button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <button
                  onClick={downloadCv}
                  data-cursor
                  className="group flex items-center gap-3 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] border border-paper/25 text-paper hover:border-lime hover:text-lime transition-all duration-300"
                >
                  <Icon name="download" className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download CV (.txt)
                </button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={160}>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog mb-5">Elsewhere</p>
            <ul className="border-t border-paper/12">
              {profile.socials.map((s) => (
                <li key={s.label} className="border-b border-paper/12">
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    data-cursor
                    className="group flex items-center justify-between py-4 px-1 hover:px-4 hover:bg-paper transition-all duration-300"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name={s.icon} className="w-4 h-4 text-lime group-hover:text-ember transition-colors duration-300" />
                      <span className="font-display font-bold uppercase tracking-wide text-base group-hover:text-ink transition-colors duration-300">
                        {s.label}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[11px] text-fog group-hover:text-ink/60 transition-colors duration-300">
                      {s.handle}
                      <Icon
                        name="arrow-up-right"
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={240}>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog mb-5">Coordinates</p>
            <div className="border border-paper/12 bg-coal/60 p-6 space-y-4 font-mono text-xs">
              <p className="flex items-center gap-3">
                <Icon name="pin" className="w-4 h-4 text-lime shrink-0" />
                <span>
                  Gwalior, Madhya Pradesh
                  <br />
                  India · 26.21°N — 78.18°E
                </span>
              </p>
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-lime pulse-dot shrink-0" aria-hidden />
                <span>Local time — {time} IST</span>
              </p>
              <p className="flex items-center gap-3">
                <Icon name="asterisk" className="w-4 h-4 text-lime shrink-0" />
                <span>Replies within 48h</span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24 border-t border-paper/12 pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          <span>© 2026 Ajay Thakur — All rights reserved</span>
          <span className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" aria-hidden />
            Engineered with care · Gwalior
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cursor
            className="group flex items-center gap-2 text-fog hover:text-lime transition-colors duration-300"
          >
            Back to top
            <Icon name="arrow-down" className="w-3.5 h-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
