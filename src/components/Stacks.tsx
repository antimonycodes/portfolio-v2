import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Matter from "matter-js";

// Portfolio accent — matches the lime green used everywhere else on the site
const LIME = "#CBFE00";

type TechStackItem = {
  name: string;
  logo: string;
  category: "frontend" | "backend" | "database" | "tooling" | "cicd";
};

const techStacks: TechStackItem[] = [
  // Frontend
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "frontend",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "frontend",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "frontend",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "frontend",
  },
  {
    name: "Angular",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    category: "frontend",
  },
  {
    name: "GSAP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gsap/gsap-original.svg",
    category: "frontend",
  },
  {
    name: "Three.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    category: "frontend",
  },
  {
    name: "Zustand",
    logo: "https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/logo192.png",
    category: "frontend",
  },
  // Backend
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "backend",
  },
  {
    name: "NestJS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    category: "backend",
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    category: "backend",
  },
  {
    name: "FastAPI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    category: "backend",
  },
  {
    name: "Go",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
    category: "backend",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "backend",
  },
  {
    name: "Prisma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    category: "backend",
  },
  // Database
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "database",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "database",
  },
  {
    name: "Redis",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    category: "database",
  },
  // CI/CD & Cloud
  {
    name: "AWS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    category: "cicd",
  },
  {
    name: "GitHub Actions",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
    category: "cicd",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "cicd",
  },
  {
    name: "Kubernetes",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    category: "cicd",
  },
  {
    name: "Nginx",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    category: "cicd",
  },
  // Tooling
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "tooling",
  },
  {
    name: "Jest",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    category: "tooling",
  },
  {
    name: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    category: "tooling",
  },
  {
    name: "Vite",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    category: "tooling",
  },
  {
    name: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    category: "tooling",
  },
];

// All categories use the same lime accent — consistent with the rest of the portfolio
const categoryMeta = {
  frontend: { label: "Frontend", accent: LIME },
  backend: { label: "Backend", accent: LIME },
  database: { label: "Database", accent: LIME },
  cicd: { label: "CI/CD & Cloud", accent: LIME },
  tooling: { label: "Tooling", accent: LIME },
};

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   MOBILE — scanline terminal grid
───────────────────────────────────────────── */
const MobileStacks = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categories = [
    "frontend",
    "backend",
    "database",
    "cicd",
    "tooling",
  ] as const;

  useEffect(() => {
    sectionRefs.current.forEach((section, i) => {
      if (!section) return;
      gsap.fromTo(
        section.querySelectorAll(".chip"),
        { opacity: 0, y: 24, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.5)",
          stagger: 0.065,
          delay: i * 0.05,
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            once: true,
          },
        },
      );
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        .ms-wrap {
          font-family: 'Space Mono', monospace;
          background: #000;
          min-height: 100vh;
          padding-bottom: 64px;
          position: relative;
        }

        /* scanline overlay */
        .ms-wrap::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.016) 2px,
            rgba(255,255,255,0.016) 4px
          );
          pointer-events: none;
          z-index: 0;
        }

        .ms-section {
          padding: 28px 20px 8px;
          position: relative;
          z-index: 1;
        }

        .ms-section + .ms-section {
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .ms-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .ms-line {
          flex: 1;
          height: 1px;
          background: #CBFE00;
          opacity: 0.2;
        }

        .ms-label {
          font-size: 9px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          font-weight: 700;
          color: #CBFE00;
        }

        .ms-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          padding-bottom: 20px;
        }

        .chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border-radius: 5px;
          border: 1px solid rgba(203,254,0,0.2);
          background: rgba(203,254,0,0.04);
          position: relative;
          overflow: hidden;
          opacity: 0; /* gsap reveals */
          transition: border-color 0.2s, background 0.2s;
        }

        .chip:active {
          border-color: rgba(203,254,0,0.55);
          background: rgba(203,254,0,0.09);
        }

        .chip-glow {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          border-radius: 2px 0 0 2px;
          background: #CBFE00;
          opacity: 0.7;
        }

        .chip img {
          width: 18px;
          height: 18px;
          object-fit: contain;
          flex-shrink: 0;
          /* desaturate logos so they don't pop random colors */
          filter: grayscale(0.35) brightness(1.1);
        }

        .chip span {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.82);
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .chip-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          background: #CBFE00;
          animation: pdot 2.6s ease-in-out infinite;
        }

        @keyframes pdot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.2; }
        }

        .ms-hint {
          text-align: center;
          padding-top: 32px;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.18);
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }

        .ms-blink { animation: blink 1.8s step-start infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      <div className="ms-wrap">
        {categories.map((cat, ci) => {
          const meta = categoryMeta[cat];
          const items = techStacks.filter((t) => t.category === cat);
          return (
            <div
              key={cat}
              className="ms-section"
              ref={(el) => {
                sectionRefs.current[ci] = el;
              }}
            >
              <div className="ms-header">
                <div className="ms-line" />
                <span className="ms-label">{meta.label}</span>
                <div className="ms-line" />
              </div>

              <div className="ms-chips">
                {items.map((stack, si) => (
                  <div key={si} className="chip">
                    <div className="chip-glow" />
                    <div
                      className="chip-dot"
                      style={{ animationDelay: `${si * 0.35}s` }}
                    />
                    <img src={stack.logo} alt={stack.name} />
                    <span>{stack.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <p className="ms-hint">
          <span className="ms-blink">▼</span>
          &nbsp;scroll to continue&nbsp;
          <span className="ms-blink">▼</span>
        </p>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────
   DESKTOP — original physics (unchanged)
───────────────────────────────────────────── */
const DesktopStacks = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [physicsInitialized, setPhysicsInitialized] = useState(false);
  const objectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const config = {
      gravity: { x: 0, y: 1, scale: 0.0015 },
      restitution: 0.5,
      friction: 0.15,
      frictionAir: 0.02,
      density: 0.002,
      wallThickness: 200,
      mouseStiffness: 0.6,
    };

    let engine: Matter.Engine | null = null;
    let runner: Matter.Runner | null = null;
    let bodies: {
      body: Matter.Body;
      element: HTMLElement;
      width: number;
      height: number;
    }[] = [];

    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));

    function initPhysics(container: HTMLElement) {
      engine = Matter.Engine.create();
      engine.gravity = config.gravity;

      const containerRect = container.getBoundingClientRect();
      const wt = config.wallThickness;

      const walls = [
        Matter.Bodies.rectangle(
          containerRect.width / 2,
          containerRect.height + wt / 2,
          containerRect.width + wt * 2,
          wt,
          { isStatic: true },
        ),
        Matter.Bodies.rectangle(
          wt / 2,
          containerRect.height / 2,
          wt,
          containerRect.height + wt * 2,
          { isStatic: true },
        ),
        Matter.Bodies.rectangle(
          containerRect.width + wt / 2,
          containerRect.height / 2,
          wt,
          containerRect.height + wt * 2,
          { isStatic: true },
        ),
      ];
      Matter.World.add(engine.world, walls);

      container.querySelectorAll(".object").forEach((obj, index) => {
        const objRect = obj.getBoundingClientRect();
        const startX =
          Math.random() * (containerRect.width - objRect.width) +
          objRect.width / 2;
        const startY = -200 - index * 50;
        const body = Matter.Bodies.rectangle(
          startX,
          startY,
          objRect.width,
          objRect.height,
          {
            restitution: config.restitution,
            friction: config.friction,
            density: config.density,
            frictionAir: config.frictionAir,
          },
        );
        Matter.Body.setAngle(body, (Math.random() - 0.5) * Math.PI);
        bodies.push({
          body,
          element: obj as HTMLElement,
          width: objRect.width,
          height: objRect.height,
        });
        if (engine) Matter.World.add(engine.world, body);
      });

      const mouse = Matter.Mouse.create(container);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: config.mouseStiffness,
          render: { visible: false },
        },
      });
      Matter.World.add(engine.world, mouseConstraint);

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      function updatePosition() {
        bodies.forEach(({ body, element, width, height }) => {
          const x = clamp(
            body.position.x - width / 2,
            0,
            containerRect.width - width,
          );
          const y = clamp(
            body.position.y - height / 2,
            -height * 3,
            containerRect.height - height,
          );
          element.style.left = `${x}px`;
          element.style.top = `${y}px`;
          element.style.transform = `rotate(${body.angle}rad)`;
        });
        requestAnimationFrame(updatePosition);
      }
      updatePosition();
      setPhysicsInitialized(true);
    }

    if (containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        once: true,
        onEnter: () => {
          if (containerRef.current) initPhysics(containerRef.current);
        },
      });
    }

    const bounceInterval = setInterval(() => {
      objectRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { scale: 1, y: 0 },
            {
              scale: 1.1,
              y: -20,
              duration: 0.5,
              ease: "back.out(1.7)",
              yoyo: true,
              repeat: 1,
              delay: index * 0.1,
            },
          );
        }
      });
    }, 3000);

    objectRefs.current.forEach((ref) => {
      if (ref) {
        ref.addEventListener("mouseenter", () => {
          gsap.fromTo(
            ref,
            { scale: 1, y: 0 },
            {
              scale: 1.15,
              y: -25,
              duration: 0.4,
              ease: "back.out(1.7)",
              yoyo: true,
              repeat: 1,
            },
          );
        });
      }
    });

    return () => {
      if (runner) Matter.Runner.stop(runner);
      if (engine) Matter.Engine.clear(engine);
      clearInterval(bounceInterval);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <section className="footer text-white h-full">
        <div
          ref={containerRef}
          className="object-container absolute top-0 left-0 w-full h-full"
          style={{ minHeight: "100vh" }}
        >
          {!physicsInitialized && (
            <div className="static-grid absolute inset-0 flex flex-wrap justify-center items-center gap-4 p-8 opacity-80">
              {techStacks.map((stack, i) => (
                <div
                  key={`static-${i}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: "#111",
                    color: "white",
                    border: `1px solid ${LIME}`,
                  }}
                >
                  <img src={stack.logo} alt={stack.name} className="w-6 h-6" />
                  <span className="text-sm font-medium hidden md:inline">
                    {stack.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div
            className={`physics-objects ${!physicsInitialized ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
          >
            {techStacks.map((stack, i) => (
              <div
                key={i}
                ref={(el) => {
                  objectRefs.current[i] = el;
                }}
                className="object absolute flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer"
                style={{
                  backgroundColor: "#111",
                  color: "#fff",
                  border: `1px solid ${LIME}`,
                  boxShadow: `0 0 10px rgba(203,254,0,0.15)`,
                }}
              >
                <img src={stack.logo} alt={stack.name} className="w-6 h-6" />
                <span className="font-medium">{stack.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-content" />
      </section>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Root — picks layout based on screen width
───────────────────────────────────────────── */
const Stacks = () => {
  const [mobile, setMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return mobile ? <MobileStacks /> : <DesktopStacks />;
};

export default Stacks;
