import { useEffect, useRef, useState } from "react";
import Navigation from "../components/MobileMenu";
// import { Sparkles } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import Navigation from "../components/Navigation";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const generateParticles = (): Particle[] => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  };

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles());
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    const glitchInterval = setInterval(() => {
      setTextGlitch(true);
      setTimeout(() => setTextGlitch(false), 200);
    }, 7000);

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          // Wrap around edges
          if (newX > window.innerWidth) newX = 0;
          else if (newX < 0) newX = window.innerWidth;
          if (newY > window.innerHeight) newY = 0;
          else if (newY < 0) newY = window.innerHeight;

          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
    };

    const particleTimer = setInterval(animateParticles, 60);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
      clearInterval(particleTimer);
    };
  }, []);

  // Disable scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="w-screen min-h-screen bg-black overflow-hidden relative text-white pt-20 "
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-blue-400 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              boxShadow: "0 0 8px rgba(59, 130, 246, 0.3)",
            }}
          />
        ))}
      </div>

      {/* 3D Cursor Follower */}
      <div
        className="fixed pointer-events-none z-[99999] w-64 h-64 opacity-40"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translate(${
            mousePosition.x * 30
          }px, ${mousePosition.y * 30}px)`,
          background:
            "radial-gradient(circle, rgba(209, 254, 23, 0.2), transparent)",
          borderRadius: "50%",
          transition: "all 0.1s ease-out",
        }}
      />

      {/* Main content */}
      <div className="relative z-20 h-full flex flex-col justify-between p-8 md:p-16">
        {/* Navigation */}
        <Navigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center perspective-1000">
          <div className="text-center max-w-5xl">
            {/* Main heading with 3D effect */}
            <div
              ref={nameRef}
              className={`transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${
                  mousePosition.x * 3
                }deg)`,
              }}
            >
              <h1
                className={`text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-4 gradient-title ${
                  textGlitch ? "glitch-text" : ""
                }`}
                style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.1)" }}
              >
                AKINRINADE
              </h1>
              <h1
                className={`text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-8 gradient-title ${
                  textGlitch ? "glitch-text" : ""
                }`}
                style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.1)" }}
              >
                TOBILOBA
              </h1>
            </div>

            {/* Animated subtitle */}
            <div
              ref={titleRef}
              className={`transition-all duration-1000 delay-700 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative mb-6">
                <p className="text-xl md:text-2xl text-white/60 mb-2 font-mono">
                  {">"} Fullstack Developer
                  <span className="animate-pulse">_</span>
                </p>
                {/* <div
                  className="absolute -bottom-2 left-0 w-0 h-0.5 bg-support"
                  style={{ animation: "width 2s ease-out 1s forwards" }}
                ></div> */}
              </div>
              <p className="text-sm text-gray-400 max-w-lg mx-auto font-mono leading-relaxed">
                Building scalable applications with{" "}
                <span className="text-yellow-400">JavaScript</span>,{" "}
                <span className="text-blue-400">React</span>,{" "}
                <span className="text-green-400">Node.js</span> & modern
                technologies
              </p>
            </div>

            {/* Interactive CTA */}
            <div
              className={`mt-16 transition-all duration-1000 delay-900 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <button
                className="group relative inline-flex items-center gap-3 text-white border border-white px-8 py-4 
                          hover:bg-support hover:text-black transition-all duration-300 font-mono text-sm
                          hover:shadow-lg  hover:scale-105 transform"
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.animation = "pulse3d 0.6s ease-in-out";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.animation = "";
                }}
              >
                <span className="relative z-10">
                  {"{"} EXPLORE_PROJECTS {"}"}
                </span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 bg-support scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
              <div className="text-xs text-green-400 font-mono mb-1 flex items-center justify-center pt-2 gap-2">
                <p className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></p>
                AVAILABLE_FOR_HIRE = true;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Geometric overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-3">
        <div
          className="absolute top-1/3 right-1/4 w-48 h-48 border border-cyan-400 rotate-45 animate-spin-slow"
          style={{ animationDuration: "30s" }}
        ></div>
      </div>
      {/* <Canvas>
        <ambientLight />
        <directionalLight
          position={[-2, 0, 3]}
          intensity={3}
          color={"#FF28D5"}
        />
        <directionalLight
          position={[2, 0, 3]}
          intensity={3}
          color={"#1C34FF"}
        />

        <Sparkles
          count={100}
          size={2}
          speed={0.5}
          color={"pink"}
          scale={[10, 10, 2]}
        />
      </Canvas> */}
    </section>
  );
};

export default Hero;

<style>{`
  @keyframes width {
    0% { width: 0; }
    100% { width: 100%; }
  }
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .glitch-text {
    position: relative;
    color: white;
    animation: glitch 0.2s linear infinite;
  }
  @keyframes glitch {
    2%, 64% {
      transform: translate(2px, 0) skew(0deg);
    }
    4%, 60% {
      transform: translate(-2px, 0) skew(0deg);
    }
    62% {
      transform: translate(0, 0) skew(5deg);
    }
  }
  @keyframes pulse3d {
    0%, 100% { transform: scale(1) rotateX(0deg) rotateY(0deg); }
    50% { transform: scale(1.05) rotateX(5deg) rotateY(-5deg); }
  }
`}</style>;
