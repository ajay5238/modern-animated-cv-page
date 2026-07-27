import {
  education,
  experience,
  languages,
  profile,
  projects,
  recognition,
  skillGroups,
  talks,
  testimonials,
  tools,
} from "../data/cv";
import { useCountUp, useInView } from "../lib/hooks";
import { Icon, MaskText, Reveal, SectionTitle } from "./atoms";
import { cn } from "../utils/cn";

function Stat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const n = useCountUp(value, inView);
  return (
    <div ref={ref} className={cn("reveal", inView && "reveal-in")} style={{ transitionDelay: `${delay}ms` }}>
      <div className="group h-full border border-paper/12 bg-coal/50 p-5 md:p-6 hover:border-lime/50 hover:bg-coal hover:-translate-y-1 transition-all duration-500">
        <p className="font-display font-extrabold text-4xl md:text-5xl text-paper group-hover:text-lime transition-colors duration-300 tabular-nums">
          {n}
          <span className="text-lime">{suffix}</span>
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fog">{label}</p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section className="pt-20 md:pt-28">
      <SectionTitle index="01" title="Profile" note="the short version" id="about" />
      <div className="space-y-6 text-lg md:text-2xl leading-relaxed font-body text-paper/90 max-w-3xl">
        <Reveal>
          <p>
            I bridge <span className="bg-lime text-ink px-1.5 font-semibold">engineering and markets</span>. After nearly a
            decade shipping full-stack systems — many of them{" "}
            <span className="underline decoration-ember decoration-2 underline-offset-4">fully independently</span> — I
            moved into quantitative finance and became a{" "}
            <span className="text-paper font-semibold">crypto market expert</span>, combining code, data and capital
            allocation.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-fog">
            Stack: <span className="text-paper">Node, React, Python, PHP, Docker</span>. Edge: crypto market structure,
            derivatives, on-chain signal and portfolio construction.{" "}
            <em className="font-display font-bold not-italic text-paper">Craft in code. Discipline in markets.</em>
          </p>
        </Reveal>
      </div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {profile.stats.map((s, i) => (
          <Stat key={s.label} {...s} delay={i * 90} />
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="pt-24 md:pt-36">
      <SectionTitle index="02" title="Experience" note={`${experience.length} chapters · 2016 — now`} id="experience" />
      <div className="border-t border-paper/15">
        {experience.map((job, i) => (
          <Reveal key={job.index} delay={i * 60}>
            <article className="group relative border-b border-paper/15 transition-colors duration-400 hover:bg-paper">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-2 md:px-5 py-7 md:py-9">
                <div className="md:col-span-1 flex md:block items-center gap-3">
                  <span className="font-mono text-xs text-lime group-hover:text-ember transition-colors duration-300">
                    /{job.index}
                  </span>
                  {job.current && (
                    <span className="md:mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-lime group-hover:text-ember">
                      <span className="w-1.5 h-1.5 rounded-full bg-current pulse-dot" aria-hidden />
                      Now
                    </span>
                  )}
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-display font-extrabold uppercase text-xl md:text-2xl leading-tight text-paper group-hover:text-ink transition-colors duration-300">
                    {job.role}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.18em] text-fog group-hover:text-ink/60 transition-colors duration-300">
                    {job.company} — {job.place}
                  </p>
                  <p className="mt-3 text-sm md:text-base text-fog group-hover:text-ink/70 max-w-md transition-colors duration-300">
                    {job.summary}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <ul className="space-y-2.5">
                    {job.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-2.5 text-sm leading-snug text-paper/80 group-hover:text-ink/85 transition-colors duration-300"
                      >
                        <span
                          className="mt-[7px] w-2.5 h-px shrink-0 bg-lime group-hover:bg-ember transition-colors duration-300"
                          aria-hidden
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-1 flex md:flex-col items-center md:items-end justify-between gap-3">
                  <span className="font-mono text-[11px] tracking-[0.15em] text-fog group-hover:text-ink/60 whitespace-nowrap transition-colors duration-300">
                    {job.period}
                  </span>
                  <span className="w-9 h-9 rounded-full border border-paper/20 group-hover:border-ink group-hover:bg-ember group-hover:text-paper flex items-center justify-center text-fog transition-all duration-300 group-hover:rotate-45">
                    <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
              <div className="px-2 md:px-5 pb-6 -mt-2 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] border border-paper/15 text-fog px-2.5 py-1 group-hover:border-ink/25 group-hover:text-ink/70 transition-colors duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section className="pt-24 md:pt-36">
      <SectionTitle index="03" title="Selected Work" note="40+ shipped · many solo" id="work" />
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 100} className={cn(i === 0 && "md:col-span-2")}>
            <a
              href="#contact"
              data-cursor
              className={cn(
                "group block border border-paper/12 bg-coal/50 hover:border-lime/50 transition-all duration-500 ease-out",
                i === 0 ? "md:rotate-[-0.6deg]" : i === 1 ? "md:rotate-[1deg]" : "md:rotate-[-1.2deg]",
                "md:hover:rotate-0 md:hover:-translate-y-2"
              )}
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.title} — ${p.subtitle}`}
                  className={cn(
                    "w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]",
                    i === 0 ? "aspect-[16/8]" : "aspect-[16/10]"
                  )}
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-ink/85 backdrop-blur-sm text-lime font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5">
                  {p.metric}
                </span>
                <span className="absolute bottom-4 right-4 w-11 h-11 bg-lime text-ink rounded-full flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  <Icon name="arrow-up-right" className="w-4 h-4" />
                </span>
              </div>
              <div className="p-5 md:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display font-extrabold uppercase text-2xl md:text-3xl tracking-tight">
                    {p.title}
                    <span className="text-lime">.</span>
                  </h3>
                  <span className="font-mono text-[11px] tracking-[0.18em] text-fog">{p.year}</span>
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
                  {p.subtitle} — {p.role}
                </p>
                <p className="mt-3 text-sm md:text-base text-fog leading-relaxed max-w-xl">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] border border-paper/15 px-2.5 py-1 text-fog group-hover:text-paper group-hover:border-paper/30 transition-colors duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SkillBar({
  name,
  level,
  delay,
  play,
}: {
  name: string;
  level: number;
  delay: number;
  play: boolean;
}) {
  return (
    <li>
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-display font-bold text-sm md:text-base uppercase tracking-wide">{name}</span>
        <span className="font-mono text-[11px] text-lime tabular-nums">{level}%</span>
      </div>
      <div className="h-[3px] bg-paper/12 overflow-hidden">
        <div
          className={cn("bar-fill h-full bg-lime", play && "bar-in")}
          style={{ width: `${level}%`, transitionDelay: `${delay}ms` }}
        />
      </div>
    </li>
  );
}

export function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  return (
    <section className="pt-24 md:pt-36">
      <SectionTitle index="04" title="Skills & Tools" note="crypto · full stack" id="skills" />
      <div ref={ref} className="grid md:grid-cols-2 gap-6 md:gap-8">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 120}>
            <div className="border border-paper/12 bg-coal/50 p-6 md:p-8 h-full">
              <div className="flex items-baseline justify-between mb-7">
                <h3 className="font-display font-extrabold uppercase text-2xl md:text-3xl">
                  {group.title}
                  <span className="text-lime">_</span>
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">{group.note}</span>
              </div>
              <ul className="space-y-6">
                {group.skills.map((s, si) => (
                  <SkillBar key={s.name} {...s} delay={si * 110} play={inView} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={150}>
        <div className="mt-6 md:mt-8 border border-paper/12 bg-coal/50 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h3 className="font-display font-extrabold uppercase text-xl md:text-2xl">
              Daily drivers<span className="text-lime">*</span>
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">hover to inspect</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {tools.map((tool, i) => (
              <span
                key={tool}
                data-cursor
                className="font-mono text-xs uppercase tracking-[0.14em] border border-paper/15 px-4 py-2 text-fog cursor-default hover:bg-lime hover:text-ink hover:border-lime hover:-translate-y-0.5 transition-all duration-300"
                style={{ transitionDelay: `${(i % 6) * 15}ms` }}
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-paper/10 grid sm:grid-cols-2 gap-5 max-w-md">
            {languages.map((l) => (
              <div key={l.name} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-display font-bold uppercase tracking-wide text-sm">{l.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog mt-0.5">{l.level}</p>
                </div>
                <div className="flex gap-1.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, di) => (
                    <span key={di} className={cn("w-2 h-2 rounded-full", di < l.dots ? "bg-lime" : "bg-paper/15")} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function EducationSection() {
  return (
    <section className="pt-24 md:pt-36">
      <SectionTitle index="05" title="Education & Record" note="first division throughout" id="education" />
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-6">
          <Reveal>
            <div className="border border-paper/12 bg-coal/50 p-6 md:p-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime mb-6">Education</h3>
              <ul className="divide-y divide-paper/10">
                {education.map((e) => (
                  <li key={`${e.school}-${e.period}`} className="group py-5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-display font-bold uppercase tracking-wide text-base md:text-lg group-hover:text-lime transition-colors duration-300">
                        {e.school}
                      </p>
                      <span className="font-mono text-[11px] text-fog whitespace-nowrap">{e.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-paper/80">{e.degree}</p>
                    <p className="mt-1.5 font-mono text-[11px] text-fog">↳ {e.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-paper/12 bg-coal/50 p-6 md:p-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime mb-6">Talks & Circles</h3>
              <ul className="space-y-4">
                {talks.map((t) => (
                  <li key={t.title} className="group flex items-center gap-4">
                    <span className="w-8 h-8 shrink-0 border border-paper/15 rounded-full flex items-center justify-center text-fog group-hover:bg-lime group-hover:text-ink group-hover:border-lime transition-all duration-300">
                      <Icon name="asterisk" className="w-3 h-3" />
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 w-full">
                      <p className="font-display font-bold uppercase tracking-wide text-sm md:text-base group-hover:text-lime transition-colors duration-300">
                        {t.title}
                      </p>
                      <p className="font-mono text-[10px] text-fog whitespace-nowrap">
                        {t.venue} · {t.year}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={80}>
            <div className="border border-paper/12 bg-coal/50 p-6 md:p-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime mb-6">Academic & Career Record</h3>
              <ul className="divide-y divide-paper/10">
                {recognition.map((r) => (
                  <li key={r.award} className="group flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-[11px] text-fog tabular-nums w-14 shrink-0 pt-0.5">{r.year}</span>
                      <div>
                        <p className="font-display font-bold uppercase tracking-wide text-sm md:text-base group-hover:translate-x-1.5 transition-transform duration-300">
                          {r.award}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog mt-0.5">{r.project}</p>
                      </div>
                    </div>
                    <Icon
                      name="asterisk"
                      className="w-4 h-4 text-paper/20 group-hover:text-lime group-hover:rotate-90 transition-all duration-500 shrink-0"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={160 + i * 100}>
              <blockquote className="relative border border-paper/12 bg-slab/60 p-6 md:p-8">
                <Icon name="quote" className="w-8 h-8 text-lime mb-4" />
                <p className="text-base md:text-lg leading-relaxed text-paper/90 italic">“{t.quote}”</p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-lime/15 border border-lime/40 flex items-center justify-center font-display font-extrabold text-lime text-sm">
                    {t.name[0]}
                  </span>
                  <div>
                    <p className="font-display font-bold uppercase tracking-wide text-sm">{t.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SignalStrip() {
  return (
    <Reveal className="pt-24 md:pt-36">
      <div className="relative overflow-hidden border border-paper/12 bg-coal/60 px-6 py-10 md:px-12 md:py-14 grid-bg">
        <span
          className="absolute -right-6 -top-10 outline-faint font-display font-extrabold text-[8rem] leading-none select-none pointer-events-none"
          aria-hidden
        >
          ✳
        </span>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime mb-4">Operating principles</p>
        <p className="font-display font-extrabold uppercase leading-[1.05] text-2xl sm:text-3xl md:text-4xl max-w-3xl">
          <MaskText
            text="Ship independently. Read the market. Stake capital only on systems you'd build yourself."
            stagger={45}
          />
        </p>
      </div>
    </Reveal>
  );
}
