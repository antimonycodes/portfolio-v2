// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis";
// import Matter from "matter-js";
// import TitleHeader from "./TitleHeader";

// type TechStackItem = {
//   name: string;
//   color: string;
//   textColor: string;
//   logo: string;
// };

// const techStacks: TechStackItem[] = [
//   {
//     name: "JavaScript",
//     color: "#F7DF1E",
//     textColor: "#000",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
//   },
//   {
//     name: "TypeScript",
//     color: "#3178C6",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
//   },
//   {
//     name: "React",
//     color: "#61DAFB",
//     textColor: "#000",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
//   },
//   {
//     name: "Next.js",
//     color: "#000",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
//   },
//   {
//     name: "GSAP",
//     color: "#88CE02",
//     textColor: "#000",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gsap/gsap-original.svg",
//   },
//   {
//     name: "Three.js",
//     color: "#000",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
//   },
//   {
//     name: "Zustand",
//     color: "#FF6B00",
//     textColor: "#fff",
//     logo: "https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/logo192.png",
//   },
//   {
//     name: "Node.js",
//     color: "#339933",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
//   },
//   {
//     name: "Express",
//     color: "#000",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
//   },
//   {
//     name: "FastAPI",
//     color: "#009688",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
//   },
//   {
//     name: "Prisma",
//     color: "#2D3748",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
//   },
//   {
//     name: "PostgreSQL",
//     color: "#336791",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
//   },
//   {
//     name: "MongoDB",
//     color: "#47A248",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
//   },
//   {
//     name: "Python",
//     color: "#3776AB",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
//   },
//   {
//     name: "Jest",
//     color: "#C21325",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
//   },
//   {
//     name: "Docker",
//     color: "#2496ED",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
//   },
//   {
//     name: "Git",
//     color: "#F05032",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
//   },
//   {
//     name: "Postman",
//     color: "#FF6C37",
//     textColor: "#fff",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
//   },
// ];

// gsap.registerPlugin(ScrollTrigger);

// const Stacks = () => {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [physicsInitialized, setPhysicsInitialized] = useState(false);

//   useEffect(() => {
//     const lenis = new Lenis();
//     lenis.on("scroll", ScrollTrigger.update);

//     gsap.ticker.add((time) => {
//       lenis.raf(time * 1000);
//     });
//     gsap.ticker.lagSmoothing(0);

//     const config = {
//       gravity: { x: 0, y: 1, scale: 0.0015 }, // Slightly increased gravity for faster drop
//       restitution: 0.5,
//       friction: 0.15,
//       frictionAir: 0.02,
//       density: 0.002,
//       wallThickness: 200,
//       mouseStiffness: 0.6,
//     };

//     let engine: Matter.Engine | null = null;
//     let runner: Matter.Runner | null = null;
//     let mouseConstraint: Matter.MouseConstraint | null = null;
//     let bodies: {
//       body: Matter.Body;
//       element: HTMLElement;
//       width: number;
//       height: number;
//     }[] = [];

//     const clamp = (val: number, min: number, max: number) =>
//       Math.max(min, Math.min(max, val));

//     function initPhysics(container: HTMLElement) {
//       engine = Matter.Engine.create();
//       engine.gravity = config.gravity;

//       const containerRect = container.getBoundingClientRect();
//       const wallThickness = config.wallThickness;

//       const walls = [
//         Matter.Bodies.rectangle(
//           containerRect.width / 2,
//           containerRect.height + wallThickness / 2,
//           containerRect.width + wallThickness * 2,
//           wallThickness,
//           { isStatic: true }
//         ),
//         Matter.Bodies.rectangle(
//           wallThickness / 2,
//           containerRect.height / 2,
//           wallThickness,
//           containerRect.height + wallThickness * 2,
//           { isStatic: true }
//         ),
//         Matter.Bodies.rectangle(
//           containerRect.width + wallThickness / 2,
//           containerRect.height / 2,
//           wallThickness,
//           containerRect.height + wallThickness * 2,
//           { isStatic: true }
//         ),
//       ];

//       Matter.World.add(engine.world, walls);

//       const objects = container.querySelectorAll(".object");
//       objects.forEach((obj, index) => {
//         const objRect = obj.getBoundingClientRect();
//         const startX =
//           Math.random() * (containerRect.width - objRect.width) +
//           objRect.width / 2;
//         // Start closer to the top for faster appearance
//         const startY = -200 - index * 50;
//         const startRotation = (Math.random() - 0.5) * Math.PI;

//         const body = Matter.Bodies.rectangle(
//           startX,
//           startY,
//           objRect.width,
//           objRect.height,
//           {
//             restitution: config.restitution,
//             friction: config.friction,
//             density: config.density,
//             frictionAir: config.frictionAir,
//           }
//         );

//         Matter.Body.setAngle(body, startRotation);

//         bodies.push({
//           body,
//           element: obj as HTMLElement,
//           width: objRect.width,
//           height: objRect.height,
//         });

//         Matter.World.add(engine?.world, body);
//       });

//       const mouse = Matter.Mouse.create(container);
//       mouseConstraint = Matter.MouseConstraint.create(engine, {
//         mouse,
//         constraint: {
//           stiffness: config.mouseStiffness,
//           render: { visible: false },
//         },
//       });

//       Matter.World.add(engine.world, mouseConstraint);

//       runner = Matter.Runner.create();
//       Matter.Runner.run(runner, engine);

//       function updatePosition() {
//         bodies.forEach(({ body, element, width, height }) => {
//           const x = clamp(
//             body.position.x - width / 2,
//             0,
//             containerRect.width - width
//           );
//           const y = clamp(
//             body.position.y - height / 2,
//             -height * 3,
//             containerRect.height - height
//           );

//           element.style.left = `${x}px`;
//           element.style.top = `${y}px`;
//           element.style.transform = `rotate(${body.angle}rad)`;
//         });
//         requestAnimationFrame(updatePosition);
//       }
//       updatePosition();
//       setPhysicsInitialized(true);
//     }

//     if (containerRef.current) {
//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top bottom",
//         once: true,
//         onEnter: () => {
//           if (containerRef.current) {
//             initPhysics(containerRef.current);
//           }
//         },
//       });
//     }

//     return () => {
//       if (runner) Matter.Runner.stop(runner);
//       if (engine) Matter.Engine.clear(engine);
//     };
//   }, []);

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden">
//       <section className="footer text-white h-full">
//         <div
//           ref={containerRef}
//           className="object-container absolute top-0 left-0 w-full h-full"
//           style={{ minHeight: "100vh" }}
//         >
//           {/* Show static grid initially, then hide when physics starts */}
//           {!physicsInitialized && (
//             <div className="static-grid absolute inset-0 flex flex-wrap justify-center items-center gap-4 p-8 opacity-80">
//               {techStacks.map((stack, i) => (
//                 <div
//                   key={`static-${i}`}
//                   className="flex items-center gap-2 px-4 py-2 md:px-4 md:py-2 sm:px-3 sm:py-3 rounded-full border border-gray-300"
//                   style={{
//                     backgroundColor: "rgba(255, 255, 255, 0.1)",
//                     color: "white",
//                     backdropFilter: "blur(10px)",
//                   }}
//                 >
//                   <img
//                     src={stack.logo}
//                     alt={stack.name}
//                     className="w-6 h-6 md:w-6 md:h-6 sm:w-8 sm:h-8"
//                   />
//                   <span className="text-sm font-medium hidden md:inline">
//                     {stack.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Physics objects (hidden initially) */}
//           <div
//             className={`physics-objects ${
//               !physicsInitialized ? "opacity-0" : "opacity-100"
//             } transition-opacity duration-500`}
//           >
//             {techStacks.map((stack, i) => (
//               <div
//                 key={i}
//                 className="object absolute flex items-center gap-2 px-4 py-2 md:px-4 md:py-2 sm:px-3 sm:py-3 rounded-full cursor-pointer hover:scale-105 transition-transform"
//                 style={{
//                   backgroundColor: "white",
//                   color: "gray",
//                   boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <img
//                   src={stack.logo}
//                   alt={stack.name}
//                   className="w-6 h-6 md:w-6 md:h-6 sm:w-8 sm:h-8"
//                 />
//                 <span className="font-medium ">{stack.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="footer-content"></div>
//       </section>
//     </div>
//   );
// };

// export default Stacks;

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Matter from "matter-js";
// import TitleHeader from "./TitleHeader";

type TechStackItem = {
  name: string;
  color: string;
  textColor: string;
  logo: string;
};

const techStacks: TechStackItem[] = [
  {
    name: "JavaScript",
    color: "#F7DF1E",
    textColor: "#000",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    color: "#61DAFB",
    textColor: "#000",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    color: "#000",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "GSAP",
    color: "#88CE02",
    textColor: "#000",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gsap/gsap-original.svg",
  },
  {
    name: "Three.js",
    color: "#000",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  },
  {
    name: "Zustand",
    color: "#FF6B00",
    textColor: "#fff",
    logo: "https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/logo192.png",
  },
  {
    name: "Node.js",
    color: "#339933",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    color: "#000",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "FastAPI",
    color: "#009688",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "Prisma",
    color: "#2D3748",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    color: "#47A248",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Python",
    color: "#3776AB",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Jest",
    color: "#C21325",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  },
  {
    name: "Docker",
    color: "#2496ED",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    color: "#F05032",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Postman",
    color: "#FF6C37",
    textColor: "#fff",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
];

gsap.registerPlugin(ScrollTrigger);

const Stacks = () => {
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
    let mouseConstraint: Matter.MouseConstraint | null = null;
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
      const wallThickness = config.wallThickness;

      const walls = [
        Matter.Bodies.rectangle(
          containerRect.width / 2,
          containerRect.height + wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true }
        ),
        Matter.Bodies.rectangle(
          wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true }
        ),
        Matter.Bodies.rectangle(
          containerRect.width + wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true }
        ),
      ];

      Matter.World.add(engine.world, walls);

      const objects = container.querySelectorAll(".object");
      objects.forEach((obj, index) => {
        const objRect = obj.getBoundingClientRect();
        const startX =
          Math.random() * (containerRect.width - objRect.width) +
          objRect.width / 2;
        const startY = -200 - index * 50;
        const startRotation = (Math.random() - 0.5) * Math.PI;

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
          }
        );

        Matter.Body.setAngle(body, startRotation);

        bodies.push({
          body,
          element: obj as HTMLElement,
          width: objRect.width,
          height: objRect.height,
        });

        // Matter.World.add(engine?.world, body);
        if (engine) {
          Matter.World.add(engine.world, body);
        }
      });

      const mouse = Matter.Mouse.create(container);
      mouseConstraint = Matter.MouseConstraint.create(engine, {
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
            containerRect.width - width
          );
          const y = clamp(
            body.position.y - height / 2,
            -height * 3,
            containerRect.height - height
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
          if (containerRef.current) {
            initPhysics(containerRef.current);
          }
        },
      });
    }

    // Periodic bounce animation
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
              delay: index * 0.1, // Stagger the bounces
            }
          );
        }
      });
    }, 3000);

    // Mouse-over bounce animation
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
            }
          );
        });
      }
    });

    return () => {
      if (runner) Matter.Runner.stop(runner);
      if (engine) Matter.Engine.clear(engine);
      clearInterval(bounceInterval);
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
                  className="flex items-center gap-2 px-4 py-2 md:px-4 md:py-2 sm:px-3 sm:py-3 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <img
                    src={stack.logo}
                    alt={stack.name}
                    className="w-6 h-6 md:w-6 md:h-6 sm:w-8 sm:h-8"
                  />
                  <span className="text-sm font-medium hidden md:inline">
                    {stack.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div
            className={`physics-objects ${
              !physicsInitialized ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500`}
          >
            {techStacks.map((stack, i) => (
              <div
                key={i}
                ref={(el) => {
                  objectRefs.current[i] = el;
                }}
                className="object absolute flex items-center gap-2 px-4 py-2 md:px-4 md:py-2 sm:px-3 sm:py-3 rounded-full cursor-pointer hover:scale-105 transition-transform"
                style={{
                  backgroundColor: "white",
                  color: "gray",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={stack.logo}
                  alt={stack.name}
                  className="w-6 h-6 md:w-6 md:h-6 sm:w-8 sm:h-8"
                />
                <span className="font-medium ">{stack.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-content"></div>
      </section>
    </div>
  );
};

export default Stacks;
