import { projects } from "../constants";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Github, ExternalLink } from "lucide-react"; // Assuming lucide-react for icons

const Works = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef<gsap.QuickToFunc | null>(null);
  const moveY = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // Initialize smooth mouse-follow preview
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    // Scroll-triggered card animation
    cardRefs.current.forEach((card) => {
      if (!card) return;
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card.querySelector(".overlay"), {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card.querySelector(".overlay"), {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.4,
      ease: "power3.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX - 50;
    mouse.current.y = e.clientY - 50;
    if (moveX.current && moveY.current) {
      moveX.current(mouse.current.x);
      moveY.current(mouse.current.y);
    }
  };

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-20 px-6 lg:px-16 relative overflow-hidden"
    >
      {/* Enhanced Gradient Overlay */}
      <div className="relative z-10">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          onMouseMove={handleMouseMove}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="relative group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Card Overlay */}
              <div className="overlay absolute inset-0 rounded-lg -z-10 clip-path-[polygon(0_100%,_100%_100%,_100%_100%,_0_100%)]" />
              {/* Card Content */}
              <div className="relative bg-black/70 backdrop-blur-md p-6 rounded-lg border border-gray-300 hover:border-[#D1FE17]/50 hover:shadow-lg hover:shadow-[#D1FE17]/20 transition-all duration-300">
                <img
                  src={project.bgImage}
                  alt={`${project.name}-bg`}
                  className="w-full h-48 object-cover rounded-t-lg brightness-50"
                />
                <div className="p-4">
                  <h2 className="text-xl md:text-2xl gradient-title font-semibold mb-3">
                    {project.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.frameworks.map((framework) => (
                      <span
                        key={framework.id}
                        className="text-xs md:text-sm bg-support text-black  px-3 py-1 rounded-full"
                      >
                        {framework.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#B0B0B0] text-sm line-clamp-2 mb-4">
                    {project.description ||
                      "A showcase of innovative design and development."}
                  </p>
                  <div className="flex gap-4">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#B0B0B0] hover:text-[#D1FE17] transition-colors duration-300 hover:scale-105"
                    >
                      <Github size={18} />
                      <span className="text-sm">GitHub</span>
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2  hover:text-[#D1FE17]  gradient px-4 py-2 rounded-full hover:scale-105 transition-all duration-300"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm hover:text-support">
                        View Project
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Enhanced Floating Preview Image */}
        <div
          ref={previewRef}
          className="fixed z-50 w-96 h-64 overflow-hidden border-4 border-[#00C4CC]/50 rounded-lg shadow-lg pointer-events-none hidden md:block opacity-0 scale-95"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
