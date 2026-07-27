import { marqueeItems } from "./data/cv";
import { useScrollSpy } from "./lib/hooks";
import { CursorRing, Marquee } from "./components/atoms";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Rail } from "./components/Rail";
import { About, EducationSection, Experience, SignalStrip, Skills, Work } from "./components/Sections";
import { Contact } from "./components/Footer";
import { cn } from "./utils/cn";

const SECTION_IDS = ["profile", "about", "experience", "work", "skills", "education", "contact"];

const MOBILE_NAV = [
  { id: "about", label: "Profile" },
  { id: "experience", label: "XP" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Edu" },
  { id: "contact", label: "Contact" },
];

function MobileNav({ active }: { active: string }) {
  return (
    <nav
      className="lg:hidden fixed bottom-4 inset-x-4 z-50 flex items-center gap-1 overflow-x-auto bg-coal/90 backdrop-blur-md border border-paper/12 rounded-full px-2 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      aria-label="CV sections (mobile)"
    >
      {MOBILE_NAV.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "shrink-0 px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300",
            active === item.id ? "bg-lime text-ink" : "text-fog hover:text-paper"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default function App() {
  const active = useScrollSpy(SECTION_IDS);

  return (
    <div className="min-h-screen bg-ink text-paper font-body selection:bg-lime selection:text-ink">
      <CursorRing />
      <div className="noise" aria-hidden />

      <Header active={active} />

      <main>
        <Hero />

        <Marquee items={marqueeItems} speed={36} className="bg-coal/40" />

        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14">
            <Rail active={active} />
            <div className="lg:col-span-8 xl:col-span-9 min-w-0">
              <About />
              <Experience />
              <Work />
              <Skills />
              <EducationSection />
              <SignalStrip />
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <Marquee
            items={[
              "Crypto Market Expert",
              "Node · React · Python · PHP · Docker",
              "40+ Projects Shipped",
              "ajaysingh@techie.com",
              "Gwalior → Worldwide",
            ]}
            reverse
            speed={26}
            className="bg-lime text-ink border-y-0"
            separator="●"
            separatorClassName="text-ink"
          />
        </div>

        <Contact />
        <div className="h-20 lg:hidden" aria-hidden />
      </main>

      <MobileNav active={active} />
    </div>
  );
}
