import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

export const servicesData = [
  {
    title: "Full-Stack Web Development",
    description:
      "I design and build modern, scalable web applications from concept to deployment—combining intuitive front-end interfaces with powerful, secure backends to deliver seamless user experiences.",
    items: [
      {
        title: "Backend Engineering",
        description: "(Node.js, Express, REST APIs, Real-time with Socket.IO)",
      },
      {
        title: "Frontend Excellence",
        description:
          "(React, TypeScript, Tailwind CSS, Framer Motion, Responsive UI/UX)",
      },
      {
        title: "Database Design",
        description:
          "(MongoDB, PostgreSQL, SQL Optimization, Scalable Structures)",
      },
    ],
  },
  {
    title: "Custom Business Applications",
    description:
      "I create tailored software solutions that streamline operations, boost productivity, and adapt to your business needs—whether it’s managing data, automating tasks, or enhancing customer interactions.",
    items: [
      {
        title: "Dashboard Systems",
        description: "(Role-based Access, Analytics, Dynamic Content)",
      },
      {
        title: "Automation Tools",
        description: "(Workflow Automation, API Integrations, Scheduled Jobs)",
      },
      {
        title: "Interactive Platforms",
        description: "(Quizzes, Leaderboards, Community Features)",
      },
    ],
  },
  {
    title: "AI & Automation Solutions",
    description:
      "I integrate AI into applications to automate processes, generate content, and provide smarter user interactions—cutting down manual work and improving engagement.",
    items: [
      {
        title: "AI Integration",
        description: "(Chatbots, Content Generation, LLM APIs)",
      },
      {
        title: "Process Automation",
        description: "(Scheduled Posting, Appointment Reminders, Data Sync)",
      },
      {
        title: "Intelligent Features",
        description: "(Search, Recommendations, Sentiment Analysis)",
      },
    ],
  },
  {
    title: "Web & Mobile Applications",
    description:
      "I build pixel-perfect, responsive apps for web and mobile that look great and work flawlessly—ensuring smooth performance across devices.",
    items: [
      {
        title: "Cross-Platform Apps",
        description: "(React Native, Single Codebase for iOS/Android/Web)",
      },
      {
        title: "PWAs",
        description: "(Offline Mode, Push Notifications, Installable Apps)",
      },
      {
        title: "E-Commerce & Transactions",
        description: "(Checkout Flows, Payment Gateways, Inventory APIs)",
      },
    ],
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const titleRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); // 768px

  useGSAP(() => {
    if (!isDesktop) return;

    titleRefs.current.forEach((titleEl, index) => {
      if (!titleEl || !contentRefs.current[index]) return;

      ScrollTrigger.create({
        trigger: titleEl,
        start: () => `top ${index === 0 ? "10vh" : "top"}`,
        end: () =>
          `+=${
            contentRefs.current[index].offsetHeight +
            (index < servicesData.length - 1
              ? titleRefs.current[index + 1].offsetHeight
              : 0)
          }`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      gsap.from(titleEl, {
        y: 200,
        opacity: 0,
        scrollTrigger: {
          trigger: titleEl,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });

    ScrollTrigger.refresh();
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-black rounded-t-4xl relative md:p-0 px-5 "
      style={{
        minHeight: isDesktop ? `${servicesData.length * 100}vh` : "auto",
      }}
    >
      <div className="container px-10 w-full relative z-10">
        <TitleHeader
          title="About Me"
          number="01"
          text="Precision. Performance. Professionalism."
        />
      </div>

      <div className="mb-12 px-10">
        <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60">
          I am{" "}
          <span className="text-white font-semibold">Akinrinade Tobiloba</span>,
          a full-stack developer from Nigeria passionate about building
          high-quality, reliable, and scalable digital products. I combine an
          engineer’s precision with a creator’s vision, ensuring every project
          is optimized for performance, maintainability, and user satisfaction.
        </p>
        <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60">
          My expertise spans both front-end and back-end development. I excel at
          crafting clean, responsive, and accessible interfaces while ensuring
          the systems powering them are secure and future-ready.
        </p>
        <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60">
          Beyond coding, I focus on problem-solving, clear communication, and
          delivering solutions that align with real-world needs.
        </p>
      </div>

      {servicesData.map((service, index) => (
        <div
          key={index}
          className="px-10 pt-6 pb-12 text-white border-t-2 border-white/30"
          style={{
            position: "relative",
            minHeight: isDesktop ? "100vh" : "auto",
          }}
        >
          <div
            ref={(el) => {
              if (el) titleRefs.current[index] = el;
            }}
            className="text-4xl lg:text-5xl font-light"
            style={{
              position: "relative",
              zIndex: servicesData.length - index,
            }}
          >
            {service.title}
          </div>
          <div
            ref={(el) => {
              if (el) contentRefs.current[index] = el;
            }}
            className="mt-6"
          >
            <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60">
              {service.description}
            </p>
            <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80 mt-4">
              {service.items.map((item, itemIndex) => (
                <div key={`item-${index}-${itemIndex}`}>
                  <h3 className="flex">
                    <span className="mr-12 text-lg text-white/30">
                      0{itemIndex + 1}
                    </span>
                    {item.title}
                  </h3>
                  {itemIndex < service.items.length - 1 && (
                    <div className="w-full h-px my-2 bg-white/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
