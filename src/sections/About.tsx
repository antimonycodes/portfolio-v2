import { useRef } from "react";
import TitleHeader from "../components/TitleHeader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const linesRef = useRef<HTMLElement[]>([]);

  useGSAP(() => {
    gsap.from(linesRef.current, {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
      },
    });
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  const aboutData = [
    {
      type: "bio",
      content: (
        <div className="bg-black-300 rounded-2xl p-8 leading-relaxed text-gray-200">
          <p ref={addToRefs} className="mb-6 text-lg">
            I am{" "}
            <span className="text-white font-semibold">
              Akinrinade Tobiloba
            </span>
            , a full-stack developer from Nigeria with a deep commitment to
            building high-quality, reliable, and scalable software solutions. I
            approach development with an engineer’s precision and a creator’s
            attention to detail, ensuring every product I work on is optimized
            for performance, maintainability, and user experience.
          </p>
          <p ref={addToRefs} className="mb-6 text-lg">
            My expertise spans both front-end and back-end development. I excel
            at crafting clean, responsive, and accessible interfaces while
            ensuring the underlying systems are secure, efficient, and
            future-ready. I work fluently across the full development cycle —
            from planning and architecture to deployment and optimization.
          </p>
          <p ref={addToRefs} className="text-lg">
            Beyond technical execution, I believe in thoughtful problem-solving,
            clear communication, and continuous learning. Whether working
            independently or within a team, I bring a structured, goal-oriented
            approach to every project, aligning technical solutions with
            real-world needs.
          </p>
        </div>
      ),
    },
    {
      type: "capabilities",
      content: (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          <div ref={addToRefs} className="bg-black-300 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">
              Frontend Development
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Building responsive, accessible, and high-performance interfaces
              using modern frameworks such as React, TypeScript, and Tailwind
              CSS. Focused on delivering seamless user experiences.
            </p>
          </div>
          <div ref={addToRefs} className="bg-black-300 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">
              Backend Development
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Designing and implementing secure, scalable server-side
              architectures with Node.js and Express, ensuring robust API
              integrations and reliable data management.
            </p>
          </div>
          <div ref={addToRefs} className="bg-black-300 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">
              Systems & Collaboration
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Applying best practices in version control, CI/CD, and
              documentation to streamline collaboration and ensure maintainable,
              production-ready code.
            </p>
          </div>
        </div>
      ),
    },
    {
      type: "professional",
      content: (
        <div className="bg-black-300 rounded-2xl p-8">
          <h2 className="text-white font-semibold text-xl mb-4">
            My Professional Approach
          </h2>
          <ul
            ref={addToRefs}
            className="list-disc pl-5 space-y-2 text-gray-300"
          >
            <li>
              Structured problem-solving with attention to scalability and
              maintainability.
            </li>
            <li>Writing clean, well-documented, and testable code.</li>
            <li>
              Staying current with emerging technologies and industry standards.
            </li>
            <li>
              Prioritizing user experience alongside technical excellence.
            </li>
            <li>
              Clear and consistent communication throughout the development
              process.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="relative md:p-0 px-5 bg-black">
      {/* <GradientSpheres
        sphere1Class="about-gradient-sphere about-sphere-1"
        sphere2Class="about-gradient-sphere about-sphere-2"
      /> */}

      <div className="container w-full md:my-32 my-20 relative z-10">
        <TitleHeader
          title="About Me"
          number="01"
          text="Precision. Performance. Professionalism."
        />

        <div className="mt-16 grid grid-cols-12 gap-8">
          {/* Main bio */}
          <div className="col-span-12">
            {aboutData.map((section, index) => (
              <div key={index} className="mt-8 first:mt-0">
                {section.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
