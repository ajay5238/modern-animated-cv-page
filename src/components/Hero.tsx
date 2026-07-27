import { profile } from "../data/cv";
import { useClock, useScramble } from "../lib/hooks";
import { Icon, OrbitBadge } from "./atoms";
import { useEffect, useState } from "react";

function RoleCycler() {
  const [index, setIndex] = useState(0);
  const role = profile.roles[index % profile.roles.length];
  const text = useScramble(role, 60);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => i + 1), 3400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-3 min-h-[1.6em]">
      <span className="font-display font-bold text-lime uppercase tracking-[0.08em] text-xl sm:text-2xl md:text-3xl">
        {text || "\u00A0"}
        <span className="caret-blink text-paper" aria-hidden>
          _
        </span>
      </span>
    </span>
  );
}

export function Hero() {
  const first = useScramble(profile.firstName, 250);
  const last = useScramble(profile.lastName, 700);
  const time = useClock(profile.timezone);

  return (
    <section id="profile" className="relative min-h-svh flex flex-col justify-end overflow-hidden grid-bg">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -right-32 w-[42rem] h-[42rem] rounded-full bg-lime/[0.05] blur-3xl animate-drift" />
        <div
          className="absolute top-1/3 -left-40 w-[30rem] h-[30rem] rounded-full bg-ember/[0.05] blur-3xl animate-drift"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      <div className="absolute -right-8 top-24 select-none pointer-events-none hidden md:block" aria-hidden>
        <span className="outline-faint font-display font-extrabold text-[11rem] xl:text-[15rem] leading-none tracking-tighter [writing-mode:vertical-rl]">
          CV·2026
        </span>
      </div>

      <div className="relative mx-auto max-w-[1400px] w-full px-5 md:px-10 pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="flex flex-wrap items-center gap-3 mb-8 md:mb-12">
          <span className="flex items-center gap-2.5 border border-lime/40 bg-lime/[0.07] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
            <span className="w-1.5 h-1.5 rounded-full bg-lime pulse-dot" aria-hidden />
            {profile.availability}
          </span>
          <span className="flex items-center gap-2 border border-paper/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
            <Icon name="pin" className="w-3.5 h-3.5" />
            {profile.location}
          </span>
        </div>

        <h1 className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.02em] select-none">
          <span className="block text-[19vw] sm:text-[16vw] lg:text-[11.5rem] xl:text-[13.5rem] whitespace-nowrap">
            {first || "\u00A0"}
          </span>
          <span className="block text-[19vw] sm:text-[16vw] lg:text-[11.5rem] xl:text-[13.5rem] outline-text whitespace-nowrap">
            {last || "\u00A0"}
            <span
              className="align-top text-[0.22em] text-lime font-mono tracking-normal ml-2"
              style={{ WebkitTextStroke: "0" }}
            >
              ©26
            </span>
          </span>
        </h1>

        <div className="mt-8 md:mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog mb-3">Currently decoding</p>
            <RoleCycler />
            <p className="mt-5 max-w-md text-fog text-sm md:text-base leading-relaxed">
              {profile.tagline} — bridging{" "}
              <em className="text-paper not-italic border-b border-lime/60">full-stack engineering</em> with{" "}
              <em className="text-paper not-italic border-b border-lime/60">crypto & capital markets</em>.
            </p>
          </div>

          <div className="flex items-end gap-8 md:gap-12">
            <dl className="grid grid-cols-2 gap-x-10 gap-y-5">
              {[
                { k: "Based in", v: profile.shortLocation },
                { k: "Experience", v: `${profile.years}+ years` },
                { k: "Currently", v: "Crypto · Quant" },
                { k: "Local time", v: time },
              ].map((item) => (
                <div key={item.k} className="border-l border-paper/15 pl-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog mb-1">{item.k}</dt>
                  <dd className="font-display font-bold text-sm md:text-base uppercase tracking-wide">{item.v}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#about"
              data-cursor
              className="hidden md:block shrink-0 text-fog hover:text-lime transition-colors duration-300"
              aria-label="Scroll to profile"
            >
              <OrbitBadge className="w-28 h-28" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-paper/10" aria-hidden>
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          <span>N° 001 — Curriculum Vitae</span>
          <span className="hidden sm:block">Gwalior · 26.21°N 78.18°E</span>
          <span>Est. 2016</span>
        </div>
      </div>
    </section>
  );
}
