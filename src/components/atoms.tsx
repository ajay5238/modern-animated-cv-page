import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { useInView, usePrefersReducedMotion } from "../lib/hooks";

/* ---------------- Reveal ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "reveal-in", className)}
      style={{ transitionDelay: `${delay}ms`, ["--reveal-y" as string]: `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ---------------- MaskText (line-mask word reveal) ---------------- */
export function MaskText({
  text,
  className,
  delay = 0,
  stagger = 60,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] mr-[0.26em] last:mr-0 align-bottom">
          <span
            className={cn("mask-inner", inView && "mask-in")}
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ---------------- Magnetic wrapper ---------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={cn("inline-block transition-transform duration-300 ease-out will-change-transform", className)}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setOffset({
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </div>
  );
}

/* ---------------- Marquee ---------------- */
export function Marquee({
  items,
  reverse = false,
  speed = 32,
  className,
  separator = "✳",
  separatorClassName = "text-lime",
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
  className?: string;
  separator?: string;
  separatorClassName?: string;
}) {
  const row = (ariaHidden: boolean) => (
    <div className="flex items-center shrink-0" aria-hidden={ariaHidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display font-bold text-lg md:text-2xl uppercase tracking-wide px-6 md:px-10 whitespace-nowrap">
            {item}
          </span>
          <span className={cn("text-xl md:text-2xl", separatorClassName)} aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("marquee-wrap overflow-hidden border-y border-paper/10", className)}>
      <div
        className={cn("marquee-track py-4", reverse && "marquee-reverse")}
        style={{ ["--marquee-speed" as string]: `${speed}s` } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ---------------- Cursor ring ---------------- */
export function CursorRing() {
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-cursor]");
      ringRef.current?.classList.toggle("is-active", !!interactive);
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ringRef.current) {
        const r = ringRef.current.offsetWidth / 2;
        ringRef.current.style.transform = `translate(${rx - r}px, ${ry - r}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionTitle({
  index,
  title,
  note,
  id,
}: {
  index: string;
  title: string;
  note?: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-10 md:mb-14 scroll-mt-28">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs text-lime tracking-[0.25em]">( {index} )</span>
        <span className="h-px flex-1 bg-paper/15" />
        {note && <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog hidden sm:block">{note}</span>}
      </div>
      <h2 className="font-display font-extrabold uppercase leading-[0.95] text-4xl sm:text-5xl md:text-6xl tracking-tight">
        <MaskText text={title} />
      </h2>
    </div>
  );
}

/* ---------------- Custom SVG icons ---------------- */
export function Icon({ name, className }: { name: string; className?: string }) {
  const common = {
    className: cn("w-[18px] h-[18px]", className),
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };
  switch (name) {
    case "arrow-up-right":
      return (
        <svg {...common}>
          <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg {...common}>
          <path d="M12 4v16m0 0 6-6m-6 6-6-6" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 3v11m0 0 4.5-4.5M12 14 7.5 9.5M4 17.5V20h16v-2.5" />
        </svg>
      );
    case "copy":
      return (
        <svg {...common}>
          <rect x="8.5" y="8.5" width="11" height="11" rx="1.5" />
          <path d="M15.5 5.5v-1a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h1" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m4.5 12.5 5 5 10-11" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s-6.5-5.6-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.4 12 21 12 21Z" />
          <circle cx="12" cy="10.6" r="2.3" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
          <path d="m4.5 7.5 7.5 6 7.5-6" />
        </svg>
      );
    case "asterisk":
      return (
        <svg {...common}>
          <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M14.5 20.5v-3.2c0-.9-.2-1.5-.7-2 2.6-.3 5.2-1.3 5.2-5.7 0-1.3-.4-2.3-1.2-3.1.1-.3.5-1.5-.1-3.1 0 0-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C6.5 3.1 5.5 3.4 5.5 3.4c-.6 1.6-.2 2.8-.1 3.1-.8.8-1.2 1.8-1.2 3.1 0 4.4 2.6 5.4 5.2 5.7-.4.4-.7.9-.7 1.7v3.5" />
          <path d="M9.5 20.5c-4 1.2-7-1.5-7.5-3" />
        </svg>
      );
    case "dribbble":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M6 6.8c3.5 3.4 6 7.4 7.5 13M17.8 7.5C14 10 8.5 11.5 3.6 11.3M20.4 13.5c-4.5-1.6-9-.8-12.8 2.8" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
          <path d="M8 10.5V17M8 7.2v.1M12 17v-4a2.3 2.3 0 0 1 4.6 0v4" />
        </svg>
      );
    case "readcv":
      return (
        <svg {...common}>
          <path d="M6 3.5h9l3.5 3.5V20.5H6z" />
          <path d="M15 3.5V7h3.5M9 11h6.5M9 14.5h6.5M9 17.5H13" />
        </svg>
      );
    case "quote":
      return (
        <svg {...common} fill="currentColor" strokeWidth={0}>
          <path d="M5 16.5c-.8-1.4-1.2-2.9-1.2-4.6C3.8 8.6 5.9 6 9 4.5l.9 1.5c-1.9 1.1-3 2.5-3.3 4.1.3-.1.7-.2 1.1-.2 1.7 0 2.9 1.2 2.9 3s-1.4 3.1-3.2 3.1c-.9 0-1.8-.3-2.4-.5Zm9.5 0c-.8-1.4-1.2-2.9-1.2-4.6 0-3.3 2.1-5.9 5.2-7.4l.9 1.5c-1.9 1.1-3 2.5-3.3 4.1.3-.1.7-.2 1.1-.2 1.7 0 2.9 1.2 2.9 3s-1.4 3.1-3.2 3.1c-.9 0-1.8-.3-2.4-.5Z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------------- Rotating orbit badge ---------------- */
export function OrbitBadge({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-slow">
        <defs>
          <path id="orbit-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="font-mono" fontSize="9.5" letterSpacing="2.5" fill="currentColor">
          <textPath href="#orbit-circle">SCROLL TO EXPLORE · CV · 2026 ·</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="w-9 h-9 rounded-full border border-paper/25 flex items-center justify-center">
          <Icon name="arrow-down" className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
