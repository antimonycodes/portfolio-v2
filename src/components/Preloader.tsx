// // // src/Preloader.jsx (or Preloader.js)
// // import { motion } from "framer-motion";
// // import { Canvas, useFrame } from "@react-three/fiber";
// // import { useRef } from "react";
// // import * as THREE from "three";

// // function MechanicalBird() {
// //   const groupRef = useRef<THREE.Group>(null);
// //   const wingLeftRef = useRef<THREE.Mesh>(null);
// //   const wingRightRef = useRef<THREE.Mesh>(null);

// //   useFrame((state) => {
// //     const t = state.clock.getElapsedTime();
// //     if (wingLeftRef.current) {
// //       // Math-based flapping using sine wave for realistic oscillation
// //       wingLeftRef.current.rotation.z = Math.sin(t * 4) * (Math.PI / 6); // Flap amplitude and speed
// //     }
// //     if (wingRightRef.current) {
// //       wingRightRef.current.rotation.z = -Math.sin(t * 4) * (Math.PI / 6);
// //     }
// //     if (groupRef.current) {
// //       // Math-based flight path: circular motion with rotation for dynamic movement
// //       groupRef.current.position.x = Math.sin(t * 0.5) * 4; // Horizontal circle
// //       groupRef.current.position.y =
// //         Math.cos(t * 0.5) * 2 + Math.sin(t * 2) * 0.5; // Vertical wave + bobbing
// //       groupRef.current.position.z = Math.cos(t * 0.5) * 4;
// //       groupRef.current.rotation.y = t * 0.2; // Gentle rotation
// //     }
// //   });

// //   return (
// //     <group ref={groupRef} position={[0, 0, 0]}>
// //       {/* Body - elongated cylinder for bird-like shape */}
// //       <mesh position={[0, 0, 0]}>
// //         <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
// //         <meshStandardMaterial
// //           color="#4A4A4A"
// //           metalness={0.5}
// //           roughness={0.3}
// //         />{" "}
// //         {/* Metallic Da Vinci machine feel */}
// //       </mesh>
// //       {/* Head - sphere with beak */}
// //       <mesh position={[0, 0, 0.9]}>
// //         <sphereGeometry args={[0.3, 32, 32]} />
// //         <meshStandardMaterial color="#4A4A4A" metalness={0.5} roughness={0.3} />
// //       </mesh>
// //       <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
// //         <coneGeometry args={[0.15, 0.4, 32]} />
// //         <meshStandardMaterial color="#DAA520" /> {/* Golden beak */}
// //       </mesh>
// //       {/* Left Wing - flat box with pivot */}
// //       <mesh ref={wingLeftRef} position={[0.6, 0, 0.3]} rotation={[0, 0, 0]}>
// //         <boxGeometry args={[1.2, 0.05, 0.8]} />
// //         <meshStandardMaterial color="#808080" wireframe={true} />{" "}
// //         {/* Wireframe for mechanical/Da Vinci sketch feel */}
// //       </mesh>
// //       {/* Right Wing */}
// //       <mesh ref={wingRightRef} position={[-0.6, 0, 0.3]} rotation={[0, 0, 0]}>
// //         <boxGeometry args={[1.2, 0.05, 0.8]} />
// //         <meshStandardMaterial color="#808080" wireframe={true} />
// //       </mesh>
// //       {/* Tail - fanned cone */}
// //       <mesh position={[0, 0, -1]} rotation={[0, 0, Math.PI]}>
// //         <coneGeometry args={[0.5, 0.8, 32, 1, true]} />
// //         <meshStandardMaterial color="#808080" wireframe={true} />
// //       </mesh>
// //     </group>
// //   );
// // }

// // function Gear({ position }: { position: [number, number, number] }) {
// //   const gearRef = useRef<THREE.Mesh>(null);

// //   useFrame((state) => {
// //     if (gearRef.current) {
// //       gearRef.current.rotation.z -= state.clock.getDelta() * 2; // Continuous rotation with delta time for smooth physics-like spin
// //     }
// //   });

// //   return (
// //     <mesh ref={gearRef} position={position}>
// //       <cylinderGeometry args={[1, 1, 0.1, 24]} />{" "}
// //       {/* 24 sides for gear teeth approximation */}
// //       <meshStandardMaterial
// //         color="#B87333"
// //         metalness={0.8}
// //         roughness={0.2}
// //       />{" "}
// //       {/* Coppery gear */}
// //     </mesh>
// //   );
// // }

// // export default function Preloader() {
// //   return (
// //     <motion.div
// //       style={{
// //         position: "fixed",
// //         top: 0,
// //         left: 0,
// //         width: "100vw",
// //         height: "100vh",
// //         zIndex: 1000,
// //         background: "#1A1A1A", // Dark background for mysterious Da Vinci atmosphere
// //       }}
// //       initial={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth fade out using Framer Motion
// //     >
// //       <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
// //         <ambientLight intensity={0.3} />
// //         <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
// //         <MechanicalBird />
// //         {/* Add some Da Vinci-inspired gears floating/rotating for "mechanics" feel */}
// //         <Gear position={[3, -2, 0]} />
// //         <Gear position={[-3, 2, -2]} />
// //         <Gear position={[0, -4, 3]} />
// //       </Canvas>
// //     </motion.div>
// //   );
// // }
// // src/Preloader.jsx (or Preloader.js) - Updated with more elements for vibrancy and interest
// import { motion } from "framer-motion";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import * as THREE from "three";
// import {
//   Environment,
//   Stars,
//   Float,
//   Icosahedron,
//   Tetrahedron,
//   Dodecahedron,
// } from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";

// function MechanicalBird() {
//   const groupRef = useRef<THREE.Group>(null);
//   const wingLeftRef = useRef<THREE.Mesh>(null);
//   const wingRightRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     const t = state.clock.getElapsedTime();
//     if (wingLeftRef.current) {
//       wingLeftRef.current.rotation.z = Math.sin(t * 4) * (Math.PI / 6);
//     }
//     if (wingRightRef.current) {
//       wingRightRef.current.rotation.z = -Math.sin(t * 4) * (Math.PI / 6);
//     }
//     if (groupRef.current) {
//       groupRef.current.position.x = Math.sin(t * 0.5) * 4;
//       groupRef.current.position.y =
//         Math.cos(t * 0.5) * 2 + Math.sin(t * 2) * 0.5;
//       groupRef.current.position.z = Math.cos(t * 0.5) * 4;
//       groupRef.current.rotation.y = t * 0.2;
//     }
//   });

//   return (
//     <group ref={groupRef} position={[0, 0, 0]} scale={1.5}>
//       {" "}
//       {/* Scaled up for prominence */}
//       <mesh position={[0, 0, 0]}>
//         <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
//         <meshStandardMaterial color="#4A4A4A" metalness={0.5} roughness={0.3} />
//       </mesh>
//       <mesh position={[0, 0, 0.9]}>
//         <sphereGeometry args={[0.3, 32, 32]} />
//         <meshStandardMaterial color="#4A4A4A" metalness={0.5} roughness={0.3} />
//       </mesh>
//       <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
//         <coneGeometry args={[0.15, 0.4, 32]} />
//         <meshStandardMaterial color="#DAA520" />
//       </mesh>
//       <mesh ref={wingLeftRef} position={[0.6, 0, 0.3]} rotation={[0, 0, 0]}>
//         <boxGeometry args={[1.2, 0.05, 0.8]} />
//         <meshStandardMaterial color="#808080" wireframe={true} />
//       </mesh>
//       <mesh ref={wingRightRef} position={[-0.6, 0, 0.3]} rotation={[0, 0, 0]}>
//         <boxGeometry args={[1.2, 0.05, 0.8]} />
//         <meshStandardMaterial color="#808080" wireframe={true} />
//       </mesh>
//       <mesh position={[0, 0, -1]} rotation={[0, 0, Math.PI]}>
//         <coneGeometry args={[0.5, 0.8, 32, 1, true]} />
//         <meshStandardMaterial color="#808080" wireframe={true} />
//       </mesh>
//     </group>
//   );
// }

// function Gear({
//   position,
//   scale = 1,
// }: {
//   position: [number, number, number];
//   scale?: number;
// }) {
//   const gearRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (gearRef.current) {
//       gearRef.current.rotation.z -= state.clock.getDelta() * 2;
//     }
//   });

//   return (
//     <mesh ref={gearRef} position={position} scale={scale}>
//       <cylinderGeometry args={[1, 1, 0.1, 24]} />
//       <meshStandardMaterial
//         color="#B87333"
//         metalness={0.8}
//         roughness={0.2}
//         emissive="#B87333"
//         emissiveIntensity={0.5}
//       />
//     </mesh>
//   );
// }

// function FloatingShape({
//   children,
//   position,
// }: {
//   children: React.ReactNode;
//   position: [number, number, number];
// }) {
//   return (
//     <Float
//       speed={2}
//       rotationIntensity={1}
//       floatIntensity={1}
//       floatingRange={[-0.5, 0.5]}
//     >
//       <group position={position}>{children}</group>
//     </Float>
//   );
// }

// export default function Preloader() {
//   return (
//     <motion.div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         zIndex: 1000,
//         background: "#1A1A1A",
//       }}
//       initial={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 1.5, ease: "easeInOut" }}
//     >
//       <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
//         <fog attach="fog" args={["#271033", 5, 30]} />{" "}
//         {/* Purple fog for atmosphere */}
//         <ambientLight intensity={0.6} />
//         <pointLight
//           position={[10, 10, 10]}
//           color="#ff00ff"
//           intensity={3}
//         />{" "}
//         {/* Magenta light */}
//         <pointLight
//           position={[-10, 0, -10]}
//           color="#00ffff"
//           intensity={3}
//         />{" "}
//         {/* Cyan light */}
//         <pointLight position={[0, -10, 0]} color="#ffff00" intensity={2} />{" "}
//         {/* Yellow light */}
//         <Stars
//           radius={200}
//           depth={60}
//           count={8000}
//           factor={6}
//           saturation={1}
//           fade
//           speed={2}
//         />
//         <Environment preset="sunset" background />{" "}
//         {/* Colorful sunset environment for vibrant backdrop */}
//         <MechanicalBird />
//         {/* More gears with varying sizes */}
//         <Gear position={[3, -2, 0]} scale={1.5} />
//         <Gear position={[-3, 2, -2]} scale={0.8} />
//         <Gear position={[0, -4, 3]} scale={1.2} />
//         <Gear position={[5, 3, -1]} scale={1} />
//         <Gear position={[-4, -3, 2]} scale={0.7} />
//         {/* Floating geometric shapes for added interest and "alive" feel */}
//         <FloatingShape position={[4, 1, -3]}>
//           <Icosahedron args={[1, 0]}>
//             <meshStandardMaterial
//               color="#00ffff"
//               transparent
//               opacity={0.6}
//               emissive="#00ffff"
//               emissiveIntensity={0.8}
//             />
//           </Icosahedron>
//         </FloatingShape>
//         <FloatingShape position={[-2, 4, -2]}>
//           <Tetrahedron args={[1, 0]}>
//             <meshStandardMaterial
//               color="#ff00ff"
//               transparent
//               opacity={0.5}
//               emissive="#ff00ff"
//               emissiveIntensity={0.7}
//               wireframe
//             />
//           </Tetrahedron>
//         </FloatingShape>
//         <FloatingShape position={[2, -3, 1]}>
//           <Dodecahedron args={[1, 0]}>
//             <meshStandardMaterial
//               color="#ffff00"
//               transparent
//               opacity={0.4}
//               emissive="#ffff00"
//               emissiveIntensity={0.6}
//             />
//           </Dodecahedron>
//         </FloatingShape>
//         <FloatingShape position={[-5, 0, 3]}>
//           <mesh>
//             <boxGeometry args={[1.5, 1.5, 1.5]} />
//             <meshStandardMaterial
//               color="#ff69b4"
//               transparent
//               opacity={0.7}
//               emissive="#ff69b4"
//               emissiveIntensity={0.9}
//               wireframe
//             />
//           </mesh>
//         </FloatingShape>
//         <FloatingShape position={[1, 5, -4]}>
//           <Tetrahedron args={[0.8, 0]}>
//             <meshStandardMaterial
//               color="#00ff00"
//               transparent
//               opacity={0.5}
//               emissive="#00ff00"
//               emissiveIntensity={0.5}
//             />
//           </Tetrahedron>
//         </FloatingShape>
//         {/* Post-processing for glow and vibrancy */}
//         <EffectComposer>
//           <Bloom
//             luminanceThreshold={0.2}
//             luminanceSmoothing={0.9}
//             intensity={1.5}
//           />
//         </EffectComposer>
//       </Canvas>
//     </motion.div>
//   );
// }
// src/Preloader.jsx (or Preloader.js) - Enhanced with programming-related elements

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Matter, { Vector } from "matter-js";
import gsap from "gsap";

interface PreloaderProps {
  progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Matter.js setup for physics and interactivity
    const engine = Matter.Engine.create();
    engine.gravity.y = 0.5; // Light gravity for floating feel
    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: { width, height, wireframes: false, background: "#E8DAB2" }, // Aged paper background
    });
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Add walls for containment
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true,
    });
    const ceiling = Matter.Bodies.rectangle(width / 2, -50, width, 100, {
      isStatic: true,
    });
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height, {
      isStatic: true,
    });
    const rightWall = Matter.Bodies.rectangle(
      width + 50,
      height / 2,
      100,
      height,
      { isStatic: true }
    );
    Matter.World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    // Lever (rectangle)
    const lever = Matter.Bodies.rectangle(width * 0.6, height / 2, 200, 20, {
      render: { fillStyle: "#A0522D", strokeStyle: "#4B2E0B", lineWidth: 3 },
      density: 0.005,
      angle: Math.PI / 4,
    });
    Matter.World.add(engine.world, lever);

    // Pulley (circle with string simulation via constraint)
    const pulley = Matter.Bodies.circle(width * 0.8, height / 4, 30, {
      isStatic: true,
      render: { fillStyle: "#CD853F", strokeStyle: "#4B2E0B", lineWidth: 3 },
    });
    const weight = Matter.Bodies.circle(width * 0.8, height / 4 + 100, 20, {
      render: { fillStyle: "#CD853F", strokeStyle: "#4B2E0B", lineWidth: 3 },
      density: 0.01,
    });
    const constraint = Matter.Constraint.create({
      bodyA: pulley,
      bodyB: weight,
      length: 100,
      stiffness: 0.1,
    });
    Matter.World.add(engine.world, [pulley, weight, constraint]);

    // Bird body (polygon for angular design)
    const birdVertices: Vector[][] = [
      [
        { x: -50, y: 0 },
        { x: 50, y: 0 },
        { x: 0, y: -20 },
        { x: 0, y: 20 },
      ],
    ];
    const bird = Matter.Bodies.fromVertices(
      width / 2,
      height / 2,
      birdVertices,
      {
        render: { visible: false },
        density: 0.001,
        frictionAir: 0.005,
      }
    );
    Matter.World.add(engine.world, bird);

    // Interactivity: Mouse constraint for dragging
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Matter.World.add(engine.world, mouseConstraint);

    // GSAP animation for circles
    const circles = circlesRef.current;
    if (circles) {
      const tl = gsap.timeline();
      tl.from(circles, {
        duration: 0.8,
        top: "-100%",
        ease: "elastic.out(1, 0.5)",
      })
        .to(
          circles.querySelector(".circle-inner"),
          {
            duration: 0.5,
            width: "clamp(50px, 15vw, 75px)",
            height: "clamp(50px, 15vw, 75px)",
            ease: "power2.inOut",
          },
          "+=0.2"
        )
        .to(
          circles.querySelector(".circle-inner-rotator"),
          {
            scale: 1,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "+=0.1"
        )
        .to(
          circles,
          {
            duration: 0.7,
            rotation: 360,
            ease: "power2.inOut",
          },
          "+=0.1"
        );
    }

    // Custom drawing for painting-like style and loader
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw pulley and weight
      ctx.beginPath();
      ctx.moveTo(pulley.position.x, pulley.position.y);
      ctx.lineTo(weight.position.x, weight.position.y);
      ctx.strokeStyle = "#4B2E0B";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(pulley.position.x, pulley.position.y, 30, 0, Math.PI * 2);
      ctx.fillStyle = "#CD853F";
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(weight.position.x, weight.position.y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw angular bird with flapping wings
      const t = Date.now() / 1000;
      const flap = (Math.sin(t * 12) * Math.PI) / 4; // Faster flapping
      ctx.save();
      ctx.translate(bird.position.x, bird.position.y);
      ctx.rotate(bird.angle);
      drawAngularBird(ctx, flap);
      ctx.restore();

      // Badass loader indicator
      drawLoader(ctx, width / 2, height - 100, progress);

      // Apply forces (e.g., wind for movement)
      Matter.Body.applyForce(bird, bird.position, {
        x: Math.sin(t) * 0.005,
        y: -0.015,
      }); // Dynamic lift

      requestAnimationFrame(draw);
    };

    draw();

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      Matter.Render.setPixelRatio(render, window.devicePixelRatio);
    };
    window.addEventListener("resize", resize);

    // Cleanup
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      window.removeEventListener("resize", resize);
    };
  }, [progress]);

  // Helper to draw angular bird
  function drawAngularBird(ctx: CanvasRenderingContext2D, flap: number) {
    // Angular body (polygon)
    ctx.beginPath();
    ctx.moveTo(-60, 0);
    ctx.lineTo(-30, -15);
    ctx.lineTo(0, -10);
    ctx.lineTo(60, 0);
    ctx.lineTo(0, 10);
    ctx.lineTo(-30, 15);
    ctx.closePath();
    ctx.strokeStyle = "#4B2E0B";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Angular wings (triangular, more angles)
    ctx.save();
    ctx.translate(-30, 0);
    ctx.rotate(flap);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-50, -40);
    ctx.lineTo(-70, -20);
    ctx.lineTo(-60, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(30, 0);
    ctx.rotate(-flap);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(50, -40);
    ctx.lineTo(70, -20);
    ctx.lineTo(60, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // Head and beak (angular)
    ctx.beginPath();
    ctx.moveTo(60, 0);
    ctx.lineTo(80, -5);
    ctx.lineTo(90, 0);
    ctx.lineTo(80, 5);
    ctx.closePath();
    ctx.stroke();
  }

  // Helper to draw loader
  function drawLoader(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    prog: number
  ) {
    const text = `${Math.floor(prog)}%`;
    ctx.font = "bold 80px serif"; // Badass font
    ctx.fillStyle = "#4B2E0B";
    ctx.shadowColor = "#8B4513";
    ctx.shadowBlur = 10; // Glowing shadow
    ctx.fillText(text, x - ctx.measureText(text).width / 2, y);
    // Progress bar sketchy style
    ctx.beginPath();
    ctx.rect(x - 150, y + 20, 300, 20);
    ctx.strokeStyle = "#4B2E0B";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x - 150, y + 20, (300 * prog) / 100, 20);
  }

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </motion.div>
  );
}
