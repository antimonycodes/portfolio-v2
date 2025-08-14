import { useRef, useState, useCallback } from "react";
import type { RefObject } from "react";

import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  description: string;
  items: string[];
}

export const servicesData: Service[] = [
  {
    title: "Full-Stack Web Development",
    description:
      "Scalable web apps with intuitive interfaces and secure backends.",
    items: [
      "Node.js, Express, REST APIs",
      "React, TypeScript, Tailwind CSS",
      "MongoDB, PostgreSQL",
    ],
  },
  {
    title: "Custom Business Applications",
    description:
      "Tailored software to streamline operations and boost productivity.",
    items: [
      "Analytics, Role-based Dashboards",
      "Workflows, API Integrations",
      "Quizzes, Leaderboards",
    ],
  },
  {
    title: "AI & Automation Solutions",
    description: "AI-driven automation for smarter user engagement.",
    items: [
      "Chatbots, LLMs",
      "Scheduled Tasks, Data Sync",
      "Search, Recommendations",
    ],
  },
  {
    title: "Web & Mobile Applications",
    description: "Responsive, pixel-perfect apps for all platforms.",
    items: [
      "React Native for iOS/Android",
      "PWAs with Offline Mode",
      "Checkout Flows, Payment Gateways",
    ],
  },
];

interface ServiceTileProps {
  service: Service;
  index: number;
  tileRefs: RefObject<(HTMLDivElement | null)[]>;
  isDesktop: boolean;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
}

const ServiceTile: React.FC<ServiceTileProps> = ({
  service,
  index,
  tileRefs,
  // isDesktop,
  expandedIndex,
  setExpandedIndex,
}) => {
  const isExpanded = expandedIndex === index;
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleToggle = useCallback(() => {
    setExpandedIndex(isExpanded ? null : index);
  }, [isExpanded, index, setExpandedIndex]);

  useGSAP(
    () => {
      if (!contentRef.current || !iconRef.current) return;

      gsap.to(contentRef.current, {
        height: isExpanded ? "auto" : 0,
        opacity: isExpanded ? 1 : 0,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(iconRef.current, {
        rotate: isExpanded ? 180 : 0,
        duration: 0.3,
        ease: "power3.out",
      });

      const ul = contentRef.current?.querySelector("ul");
      if (ul && ul.children.length > 0) {
        gsap.to(ul.children, {
          opacity: isExpanded ? 1 : 0,
          y: isExpanded ? 0 : 10,
          duration: 0.3,
          stagger: 0.1,
          ease: "power3.out",
          delay: isExpanded ? 0.2 : 0,
        });
      }
    },
    { dependencies: [isExpanded], scope: contentRef }
  );

  return (
    <div
      ref={(el) => {
        tileRefs.current[index] = el;
      }}
      className="px-6 py-4 mb-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer select-none"
      onClick={handleToggle}
      onKeyDown={(e) => e.key === "Enter" && handleToggle()}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-controls={`service-content-${index}`}
    >
      <h2 className="text-2xl lg:text-3xl font-light text-white flex items-center justify-between font-sans tracking-tight">
        {service.title}
        <span ref={iconRef} className="text-lg text-support">
          {isExpanded ? "−" : "+"}
        </span>
      </h2>
      <p className="text-base lg:text-lg text-white/70 mt-2 font-light">
        {service.description}
      </p>
      <div
        ref={contentRef}
        id={`service-content-${index}`}
        className="overflow-hidden"
        style={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
      >
        <ul className="mt-4 text-sm lg:text-base text-white/80 marker:text-support list-disc list-inside">
          {service.items.map((item, itemIndex) => (
            <li key={`item-${index}-${itemIndex}`} className="my-1.5">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const [scrollY, setScrollY] = useState(0);

  useGSAP(
    () => {
      if (!isDesktop) return;

      const ctx = gsap.context(() => {
        tileRefs.current.forEach((tileEl, index) => {
          if (!tileEl) return;

          gsap.from(tileEl, {
            y: 30,
            opacity: 0,
            scrollTrigger: {
              trigger: tileEl,
              start: "top 85%",
              end: "top 60%",
              scrub: 0.3,
              toggleActions: "play none none reverse",
            },
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.15,
          });
        });
      }, sectionRef);

      const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      const debounceResize = setTimeout(handleResize, 200);
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(debounceResize);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        ctx.revert();
      };
    },
    { dependencies: [], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-black px-5 py-12 md:px-8 lg:px-8 relative"
      aria-label="About Me Section"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div className="container mx-auto pt-6 relative z-10">
        <TitleHeader
          title="About Me"
          number="01"
          text="Precision. Performance. Professionalism."
        />
      </div>
      <div className=" mb-8 relative z-10  lg:px-8">
        <p className="text-base md:text-lg lg:text-lg text-white/70 leading-relaxed font-light">
          I am{" "}
          <span className="text-white font-semibold">Akinrinade Tobiloba</span>,
          a full-stack developer from Nigeria passionate about building
          high-quality, reliable, and scalable digital products. I combine an
          engineer’s precision with a creator’s vision, ensuring every project
          is optimized for performance, maintainability, and user satisfaction.
        </p>
        <p className="text-base md:text-lg lg:text-lg text-white/70 leading-relaxed mt-3 font-light">
          My expertise spans both front-end and back-end development. I excel at
          crafting clean, responsive, and accessible interfaces while ensuring
          the systems powering them are secure and future-ready.
        </p>
        <p className="text-base md:text-lg lg:text-lg text-white/70 leading-relaxed mt-3 font-light">
          Beyond coding, I focus on problem-solving, clear communication, and
          delivering solutions that align with real-world needs.
        </p>
      </div>
      <div className=" relative z-10 lg:px-8">
        {servicesData.map((service, index) => (
          <ServiceTile
            key={index}
            service={service}
            index={index}
            tileRefs={tileRefs}
            isDesktop={isDesktop}
            expandedIndex={expandedIndex}
            setExpandedIndex={setExpandedIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
