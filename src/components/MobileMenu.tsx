import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navigation = ({ mobileMenuOpen, setMobileMenuOpen }: NavigationProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    gsap.fromTo(
      ".nav-item",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        ".mobile-nav-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="bg-black/80 border-b border-gray-800/50">
        <div className="  px-6 lg:px-16 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="group cursor-pointer">
              <div className="text-lg font-semibold text-support font-mono tracking-wider transition-all duration-300 ">
                &lt;ANTIMONY/&gt;
              </div>
              {/* <div className="w-0 h-0.5 bg-support group-hover:w-full transition-all duration-500 mt-1"></div> */}
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { name: "ABOUT", href: "#about" },
                { name: "PROJECTS", href: "#projects" },
                { name: "CONTACT", href: "#contact" },
              ].map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-item group relative text-sm font-mono text-gray-400 hover:text-support transition-all duration-300"
                >
                  <span className="relative z-10">
                    {String(index + 1).padStart(2, "0")}.{item.name}
                  </span>
                  {/* <div className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300"></div> */}
                  <div className="absolute inset-0 bg-cyan-400/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded blur-sm"></div>
                </a>
              ))}
            </div>

            {/* Status & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Status Indicator */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-green-400">AVAILABLE</span>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden group relative w-8 h-8 flex flex-col justify-center items-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <div
                  className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-1 bg-white" : ""
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-1 bg-white" : ""
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Animated border */}
        {/* <div className="absolute bottom-0 left-0 w-full h-px">
          <div
            className="w-0 h-full bg-support"
            style={{
              animation: "borderGlow 3s ease-in-out infinite  alternate",
            }}
          ></div>
        </div> */}
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className={`md:hidden fixed inset-0 z-50 transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Menu Content */}
        <div className="relative z-60 h-screen flex flex-col justify-between p-8 bg-support text-black">
          {/* Header with Logo and Status */}
          <div
            className="flex justify-between items-center mb-12"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from closing the menu
              setMobileMenuOpen(false);
            }}
          >
            <a href="#hero">
              <div className="text-sm text-white font-bold font-mono tracking-wider transition-all duration-300 group-hover:text-gray-800">
                &lt;ANTIMONY/&gt;
              </div>
            </a>
            {/*  */}
            <div>
              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white font-extrabold italic cursor-pointer hover:text-black transition-colors duration-300 font-mono text-sm text-center"
              >
                CLOSE
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            {[
              { name: "ABOUT", href: "#about", desc: "Learn about my journey" },
              {
                name: "PROJECTS",
                href: "#projects",
                desc: "See what I've built",
              },
              {
                name: "CONTACT",
                href: "#contact",
                desc: "Let's work together",
              },
            ].map((item, index) => (
              <div
                key={item.name}
                className="mobile-nav-item transform transition-all duration-700"
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from closing the menu
                    setMobileMenuOpen(false);
                  }}
                  className="group block relative"
                >
                  {/* Number */}
                  <div className="text-black font-mono text-sm mb-2">
                    {String(index + 1).padStart(2, "0")}.
                  </div>

                  {/* Main text */}
                  <div className="text-4xl font-bold text-black mb-4 relative">
                    {item.name}
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-black scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></div>
                    <div className="absolute -right-4 top-0 bottom-0 w-1 bg-black scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></div>
                  </div>

                  {/* Description */}
                  <div className="text-gray-800 text-sm font-mono opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    {item.desc}
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Footer with Decorative Elements */}
          <div
            className="mobile-nav-item space-y-4 transform transition-all duration-1000"
            style={{ transitionDelay: "0.6s" }}
          >
            {/* Status */}
            <div className="flex items-center justify-center gap-3 text-green-900 font-mono text-sm">
              <div className="w-2 h-2 bg-green-900 rounded-full animate-pulse"></div>
              <span>AVAILABLE FOR HIRE</span>
            </div>

            {/* Email */}
            <a
              href="mailto:akinrinadetobilobasb@gmail.com"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing the menu
              className="block text-gray-800 hover:text-black transition-colors duration-300 font-mono text-sm text-center"
            >
              akinrinadetobilobasb@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes borderGlow {
          0% { width: 0%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
