// @ts-nocheck

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Box,
  Plane,
  Sphere,
  Environment,
  Cylinder,
} from "@react-three/drei";
import { Play, Trophy, RotateCcw, Users } from "lucide-react";
import * as THREE from "three";

// Enhanced Water shader with more realistic waves and reflections
const WaterMaterial = () => {
  const materialRef = useRef();

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float time;
    uniform float intensity;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      // Multiple realistic wave layers
      float wave1 = sin(pos.x * 4.0 + time * 2.0) * 0.02;
      float wave2 = sin(pos.y * 3.0 + time * 1.8) * 0.015;
      float wave3 = sin(pos.x * 6.0 + pos.y * 4.0 + time * 3.5) * 0.01;
      float wave4 = sin(pos.x * 2.0 - pos.y * 2.0 + time * 2.5) * 0.008;
      
      pos.z += (wave1 + wave2 + wave3 + wave4) * (1.0 + intensity * 2.0);
      
      // Calculate normals for lighting
      vec3 tangent = vec3(1.0, 0.0, cos(pos.x * 4.0 + time * 2.0) * 0.08);
      vec3 bitangent = vec3(0.0, 1.0, cos(pos.y * 3.0 + time * 1.8) * 0.06);
      vNormal = normalize(cross(tangent, bitangent));
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec2 uv = vUv;
      
      // Enhanced water ripples with more complexity
      float wave1 = sin(uv.x * 20.0 + time * 3.0) * 0.1;
      float wave2 = sin(uv.y * 18.0 + time * 2.8) * 0.08;
      float wave3 = sin((uv.x + uv.y) * 12.0 + time * 4.2) * 0.06;
      float wave4 = sin((uv.x - uv.y) * 15.0 + time * 3.8) * 0.04;
      float waves = wave1 + wave2 + wave3 + wave4;
      
      // More realistic water colors with depth
      vec3 deepWater = vec3(0.02, 0.25, 0.6);
      vec3 shallowWater = vec3(0.15, 0.55, 0.85);
      vec3 surfaceReflection = vec3(0.6, 0.8, 1.0);
      
      // Mix colors based on wave height and intensity
      vec3 waterColor = mix(deepWater, shallowWater, waves + 0.5);
      waterColor = mix(waterColor, surfaceReflection, intensity * 0.4);
      
      // Add foam and bubbles with more realistic distribution
      float foam = smoothstep(0.6, 1.0, waves + intensity * 0.8);
      waterColor = mix(waterColor, vec3(0.9, 0.95, 1.0), foam * 0.5);
      
      // Add caustics effect
      float caustics = sin(uv.x * 30.0 + time * 2.0) * sin(uv.y * 25.0 + time * 1.8) * 0.1;
      waterColor += caustics * vec3(0.2, 0.3, 0.4);
      
      // Fresnel-like transparency effect
      float fresnel = dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
      float alpha = 0.75 + fresnel * 0.25;
      
      gl_FragColor = vec4(waterColor, alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 0 },
    }),
    []
  );

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent
      side={THREE.DoubleSide}
    />
  );
};

// Enhanced water splash with realistic particle physics
const WaterSplash = ({ position, intensity = 1, direction = [0, 1, 0] }) => {
  const splashRef = useRef();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const count = Math.floor(intensity * 12);
    const newParticles = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 0.5 + Math.random() * 1.5;
      const lifetime = 1 + Math.random() * 2;

      newParticles.push({
        id: i,
        initialPos: [
          (Math.random() - 0.5) * 0.3,
          0,
          (Math.random() - 0.5) * 0.2,
        ],
        velocity: [
          Math.cos(angle) * speed * 0.3,
          speed * 0.8 + Math.random() * 0.4,
          Math.sin(angle) * speed * 0.3,
        ],
        lifetime,
        maxLifetime: lifetime,
        size: 0.015 + Math.random() * 0.02,
      });
    }
    setParticles(newParticles);
  }, [intensity]);

  useFrame((state, delta) => {
    if (splashRef.current) {
      setParticles((prev) =>
        prev
          .map((particle) => {
            if (particle.lifetime <= 0) return particle;

            const newLifetime = particle.lifetime - delta;
            const gravity = -2.5;

            return {
              ...particle,
              lifetime: newLifetime,
              velocity: [
                particle.velocity[0] * 0.98,
                particle.velocity[1] + gravity * delta,
                particle.velocity[2] * 0.98,
              ],
            };
          })
          .filter((p) => p.lifetime > 0)
      );
    }
  });

  return (
    <group ref={splashRef} position={position}>
      {particles.map((particle) => {
        const progress = 1 - particle.lifetime / particle.maxLifetime;
        const currentPos = [
          particle.initialPos[0] + particle.velocity[0] * progress * 2,
          particle.initialPos[1] +
            particle.velocity[1] * progress * 2 -
            0.5 * 2.5 * Math.pow(progress * 2, 2),
          particle.initialPos[2] + particle.velocity[2] * progress * 2,
        ];

        const opacity = Math.max(0, 1 - progress * 2);

        return (
          <Sphere
            key={particle.id}
            args={[particle.size]}
            position={currentPos}
          >
            <meshLambertMaterial
              color="#87CEEB"
              transparent
              opacity={opacity}
            />
          </Sphere>
        );
      })}
    </group>
  );
};

// Ultra-realistic swimmer with advanced biomechanical animation
const RealisticSwimmer = ({
  position,
  color,
  isPlayer,
  speed,
  name,
  swimIntensity = 0,
  isMoving = false,
  strokeRate = 60, // strokes per minute
  fatigue = 0,
}) => {
  const swimmerRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const bodyRef = useRef();
  const headRef = useRef();

  const [breathingPhase, setBreathingPhase] = useState(0);
  const [strokePhase, setStrokePhase] = useState(0);

  useFrame((state) => {
    if (!swimmerRef.current) return;

    const time = state.clock.elapsedTime;
    const swimSpeed = isMoving ? (strokeRate / 60) * (1 - fatigue * 0.5) : 0.5;
    const phase = time * swimSpeed;
    setStrokePhase(phase);

    // Realistic body movement with breathing
    if (bodyRef.current) {
      const breathingCycle = phase * 0.25; // Every 4 strokes
      setBreathingPhase(breathingCycle);

      // Body roll for breathing (side to side)
      bodyRef.current.rotation.z = isMoving
        ? Math.sin(breathingCycle * Math.PI * 2) * 0.15 * swimIntensity
        : 0;

      // Body pitch (up and down)
      bodyRef.current.rotation.x = isMoving
        ? -0.05 - Math.sin(phase * 4) * 0.03 * swimIntensity
        : 0;

      // Vertical bobbing
      bodyRef.current.position.y =
        position[1] +
        (isMoving ? Math.sin(phase * 4) * 0.02 * swimIntensity : 0);
    }

    // Head movement for breathing
    if (headRef.current) {
      const breathTurn = Math.sin(breathingPhase * Math.PI * 2) * 0.8;
      headRef.current.rotation.y = isMoving ? breathTurn * swimIntensity : 0;
      headRef.current.rotation.z = isMoving
        ? breathTurn * 0.3 * swimIntensity
        : 0;
    }

    // Advanced arm stroke mechanics - catch, pull, push, recovery
    if (leftArmRef.current) {
      const leftPhase = (phase * 2) % (Math.PI * 2);
      let armRotation = 0;

      // Stroke phases
      if (leftPhase < Math.PI * 0.5) {
        // Entry and catch
        armRotation = Math.sin(leftPhase * 2) * -1.2 - 0.2;
      } else if (leftPhase < Math.PI * 1.2) {
        // Pull phase
        armRotation = -1.4 + Math.sin((leftPhase - Math.PI * 0.5) * 1.4) * 0.8;
      } else {
        // Recovery phase
        armRotation = Math.sin((leftPhase - Math.PI * 1.2) * 2.5) * -0.8 + 0.4;
      }

      leftArmRef.current.rotation.x = armRotation;
      leftArmRef.current.rotation.z = Math.sin(leftPhase) * 0.3;
    }

    if (rightArmRef.current) {
      const rightPhase = (phase * 2 + Math.PI) % (Math.PI * 2);
      let armRotation = 0;

      if (rightPhase < Math.PI * 0.5) {
        armRotation = Math.sin(rightPhase * 2) * -1.2 - 0.2;
      } else if (rightPhase < Math.PI * 1.2) {
        armRotation = -1.4 + Math.sin((rightPhase - Math.PI * 0.5) * 1.4) * 0.8;
      } else {
        armRotation = Math.sin((rightPhase - Math.PI * 1.2) * 2.5) * -0.8 + 0.4;
      }

      rightArmRef.current.rotation.x = armRotation;
      rightArmRef.current.rotation.z = Math.sin(rightPhase) * -0.3;
    }

    // Flutter kick with realistic timing
    if (leftLegRef.current) {
      const kickPhase = phase * 6; // 6 kicks per stroke cycle
      leftLegRef.current.rotation.x =
        Math.sin(kickPhase) * 0.3 * (1 - fatigue * 0.3);
    }

    if (rightLegRef.current) {
      const kickPhase = phase * 6 + Math.PI * 0.33;
      rightLegRef.current.rotation.x =
        Math.sin(kickPhase) * 0.3 * (1 - fatigue * 0.3);
    }
  });

  return (
    <group ref={swimmerRef} position={position}>
      {/* Main body with realistic swimming position */}
      <group ref={bodyRef} rotation={[0, 0, 0]}>
        {/* Torso - more realistic proportions */}
        <Box args={[0.35, 0.18, 0.9]} position={[0, 0, 0]}>
          <meshLambertMaterial color={color} />
        </Box>

        {/* Head with breathing animation */}
        <group ref={headRef} position={[0, 0, 0.55]}>
          <Sphere args={[0.13]}>
            <meshLambertMaterial color="#FFE5B4" />
          </Sphere>

          {/* Swimming cap */}
          <Sphere args={[0.135]} position={[0, 0.02, 0]}>
            <meshLambertMaterial color={isPlayer ? "#FFD700" : "#333333"} />
          </Sphere>

          {/* Goggles */}
          <Sphere args={[0.14]} position={[0, 0.05, 0.02]}>
            <meshLambertMaterial color="#1a1a1a" transparent opacity={0.9} />
          </Sphere>
        </group>

        {/* Left Arm with detailed stroke mechanics */}
        <group ref={leftArmRef} position={[-0.28, 0, 0.25]}>
          {/* Upper arm */}
          <Box args={[0.08, 0.08, 0.35]} position={[0, 0, -0.1]}>
            <meshLambertMaterial color={color} />
          </Box>
          {/* Forearm */}
          <Box args={[0.07, 0.07, 0.3]} position={[0, 0, -0.4]}>
            <meshLambertMaterial color={color} />
          </Box>
          {/* Hand */}
          <Box args={[0.12, 0.02, 0.08]} position={[0, 0, -0.58]}>
            <meshLambertMaterial color="#FFE5B4" />
          </Box>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.28, 0, 0.25]}>
          <Box args={[0.08, 0.08, 0.35]} position={[0, 0, -0.1]}>
            <meshLambertMaterial color={color} />
          </Box>
          <Box args={[0.07, 0.07, 0.3]} position={[0, 0, -0.4]}>
            <meshLambertMaterial color={color} />
          </Box>
          <Box args={[0.12, 0.02, 0.08]} position={[0, 0, -0.58]}>
            <meshLambertMaterial color="#FFE5B4" />
          </Box>
        </group>

        {/* Left Leg with flutter kick */}
        <group ref={leftLegRef} position={[-0.12, 0, -0.55]}>
          <Box args={[0.11, 0.11, 0.75]} position={[0, 0, -0.2]}>
            <meshLambertMaterial color={color} />
          </Box>
          {/* Fins */}
          <Box args={[0.16, 0.04, 0.25]} position={[0, 0, -0.65]}>
            <meshLambertMaterial color="#000080" />
          </Box>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.12, 0, -0.55]}>
          <Box args={[0.11, 0.11, 0.75]} position={[0, 0, -0.2]}>
            <meshLambertMaterial color={color} />
          </Box>
          <Box args={[0.16, 0.04, 0.25]} position={[0, 0, -0.65]}>
            <meshLambertMaterial color="#000080" />
          </Box>
        </group>
      </group>

      {/* Enhanced water splashes with realistic physics */}
      {isMoving && swimIntensity > 0.2 && (
        <>
          <WaterSplash
            position={[-0.3, 0.1, 0.3]}
            intensity={swimIntensity * 1.2}
            direction={[-1, 1, 0]}
          />
          <WaterSplash
            position={[0.3, 0.1, 0.3]}
            intensity={swimIntensity * 1.2}
            direction={[1, 1, 0]}
          />
          <WaterSplash
            position={[0, 0.05, -0.5]}
            intensity={swimIntensity * 0.8}
            direction={[0, 0.5, -1]}
          />
        </>
      )}

      {/* Name label with swimming stats */}
      <Text
        position={[0, 0.9, 0]}
        fontSize={0.12}
        color={isPlayer ? "#FFD700" : "#FFFFFF"}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      {isPlayer && (
        <Text
          position={[0, 0.75, 0]}
          fontSize={0.08}
          color="#87CEEB"
          anchorX="center"
          anchorY="middle"
        >
          {Math.round(strokeRate)} SPM | {Math.round(fatigue * 100)}% Fatigue
        </Text>
      )}
    </group>
  );
};

// Enhanced Olympic pool with realistic features
const OlympicPool = () => {
  return (
    <group>
      {/* Pool bottom with depth markers */}
      <Plane
        args={[25, 12.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.3, 0]}
      >
        <meshLambertMaterial color="#003366" />
      </Plane>

      {/* Pool depth gradient */}
      <Plane
        args={[25, 12.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.25, 0]}
      >
        <meshLambertMaterial color="#004080" transparent opacity={0.7} />
      </Plane>

      {/* Pool walls with realistic tiles */}
      <Box args={[25.5, 1.0, 0.4]} position={[0, -0.8, 6.25]}>
        <meshLambertMaterial color="#E8F4FD" />
      </Box>
      <Box args={[25.5, 1.0, 0.4]} position={[0, -0.8, -6.25]}>
        <meshLambertMaterial color="#E8F4FD" />
      </Box>
      <Box args={[0.4, 1.0, 12.5]} position={[12.5, -0.8, 0]}>
        <meshLambertMaterial color="#E8F4FD" />
      </Box>
      <Box args={[0.4, 1.0, 12.5]} position={[-12.5, -0.8, 0]}>
        <meshLambertMaterial color="#E8F4FD" />
      </Box>

      {/* Lane lines with realistic rope floats */}
      {Array.from({ length: 7 }, (_, i) => (
        <group key={i}>
          {Array.from({ length: 50 }, (_, j) => (
            <Sphere
              key={j}
              args={[0.06]}
              position={[-12 + j * 0.48, -0.35, -4.5 + (i + 1) * 1.5]}
            >
              <meshLambertMaterial
                color={
                  i === 3 ? "#FFD700" : i % 2 === 0 ? "#FF4444" : "#4444FF"
                }
              />
            </Sphere>
          ))}
        </group>
      ))}

      {/* Starting blocks with realistic detail */}
      {Array.from({ length: 8 }, (_, i) => (
        <group key={i} position={[-12.2, 0, -5.25 + i * 1.5]}>
          <Box args={[1.4, 0.6, 1.2]} position={[0, -0.5, 0]}>
            <meshLambertMaterial color="#DDDDDD" />
          </Box>
          {/* Starting block platform */}
          <Box args={[1.2, 0.1, 1.0]} position={[0, -0.15, 0]}>
            <meshLambertMaterial color="#333333" />
          </Box>
          {/* Lane number */}
          <Text
            position={[0, -0.1, 0.6]}
            fontSize={0.2}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            {i + 1}
          </Text>
        </group>
      ))}

      {/* Finish line structure with timing system */}
      <Box args={[0.6, 4, 12.5]} position={[12, 1, 0]}>
        <meshLambertMaterial color="#FFD700" />
      </Box>

      {/* Timing touch pads */}
      {Array.from({ length: 8 }, (_, i) => (
        <Box
          key={i}
          args={[0.1, 0.8, 1.2]}
          position={[12.3, -0.2, -5.25 + i * 1.5]}
        >
          <meshLambertMaterial color="#FF6B6B" />
        </Box>
      ))}

      {/* Pool deck with realistic texture */}
      <Plane
        args={[40, 25]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.35, 0]}
      >
        <meshLambertMaterial color="#D4B896" />
      </Plane>

      {/* Spectator stands */}
      <Box args={[30, 8, 3]} position={[0, 2, 15]}>
        <meshLambertMaterial color="#8B4513" />
      </Box>
      <Box args={[30, 8, 3]} position={[0, 2, -15]}>
        <meshLambertMaterial color="#8B4513" />
      </Box>
    </group>
  );
};

// Enhanced water surface with dynamic intensity
const OlympicWaterSurface = ({ intensity = 0 }) => {
  const waterRef = useRef();

  useFrame(() => {
    if (waterRef.current) {
      waterRef.current.uniforms.intensity.value = intensity;
    }
  });

  return (
    <Plane
      args={[25, 12.5]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.35, 0]}
    >
      <WaterMaterial ref={waterRef} />
    </Plane>
  );
};

// Main 3D scene with enhanced camera and lighting
const SwimmingScene = ({
  swimmers,
  raceProgress,
  gameState,
  selectedCharacter,
  swimmerIntensity = {},
  strokeRates = {},
  fatigueLevel = {},
}) => {
  const { camera } = useThree();

  useEffect(() => {
    if (gameState === "racing") {
      // Dynamic camera following the race leader
      const leadingSwimmer = swimmers.reduce((leader, swimmer) =>
        (raceProgress[swimmer.id] || 0) > (raceProgress[leader.id] || 0)
          ? swimmer
          : leader
      );
      const leadProgress = raceProgress[leadingSwimmer?.id] || 0;
      const cameraX = -12 + (leadProgress / 100) * 24 - 5;

      camera.position.set(cameraX, 12, 15);
      camera.lookAt(cameraX + 5, 0, 0);
    } else {
      camera.position.set(0, 10, 15);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, gameState, raceProgress, swimmers]);

  // Calculate overall water intensity
  const totalIntensity =
    Object.values(swimmerIntensity).reduce((sum, val) => sum + val, 0) /
    swimmers.length;

  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[20, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={60}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />

      {/* Pool lighting */}
      <pointLight position={[0, 15, 0]} intensity={0.8} color="#87CEEB" />
      <pointLight position={[-10, 8, 8]} intensity={0.5} color="#FFF8DC" />
      <pointLight position={[10, 8, 8]} intensity={0.5} color="#FFF8DC" />
      <pointLight position={[0, 5, -8]} intensity={0.4} color="#B0E0E6" />

      {/* Underwater lighting effects */}
      <pointLight
        position={[0, -0.5, 0]}
        intensity={0.6}
        color="#40A0FF"
        distance={15}
      />

      <OlympicPool />
      <OlympicWaterSurface intensity={totalIntensity} />

      {/* Swimmers with enhanced realism */}
      {swimmers.map((swimmer, index) => {
        const lanePosition = -5.25 + index * 1.5;
        const progress = raceProgress[swimmer.id] || 0;
        const xPosition = -12 + (progress / 100) * 24;
        const isMoving =
          progress > 0 && progress < 100 && gameState === "racing";
        const intensity = swimmerIntensity[swimmer.id] || 0;
        const strokeRate = strokeRates[swimmer.id] || 60;
        const fatigue = fatigueLevel[swimmer.id] || 0;

        return (
          <RealisticSwimmer
            key={swimmer.id}
            position={[xPosition, -0.25, lanePosition]}
            color={swimmer.color}
            isPlayer={swimmer.id === selectedCharacter?.id}
            speed={swimmer.speed || 1}
            name={swimmer.name}
            isMoving={isMoving}
            swimIntensity={intensity}
            strokeRate={strokeRate}
            fatigue={fatigue}
          />
        );
      })}

      <Environment preset="sunset" />

      {gameState === "racing" && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={10}
          maxDistance={30}
          target={[0, 0, 0]}
        />
      )}
    </>
  );
};

const SwimmingGame3D = () => {
  const [gameState, setGameState] = useState("menu");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [raceProgress, setRaceProgress] = useState({});
  const [countdown, setCountdown] = useState(3);
  const [raceTime, setRaceTime] = useState(0);
  const [winner, setWinner] = useState(null);
  const [playerClicks, setPlayerClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [swimPower, setSwimPower] = useState(0);
  const [swimmerIntensity, setSwimmerIntensity] = useState({});

  const gameLoopRef = useRef();
  const raceStartTime = useRef(0);

  const characters = [
    {
      id: 1,
      name: "Lightning Luke",
      color: "#3B82F6",
      speed: 1.4,
      stamina: 0.75,
      description: "Explosive start, fades in long races",
    },
    {
      id: 2,
      name: "Steady Sarah",
      color: "#10B981",
      speed: 1.0,
      stamina: 1.3,
      description: "Consistent pace, strong finish",
    },
    {
      id: 3,
      name: "Power Pete",
      color: "#EF4444",
      speed: 1.2,
      stamina: 1.1,
      description: "Balanced swimmer with good technique",
    },
    {
      id: 4,
      name: "Rhythm Rita",
      color: "#8B5CF6",
      speed: 0.9,
      stamina: 1.4,
      description: "Slow starter but incredible endurance",
    },
  ];

  const aiSwimmers = characters.filter((c) => c.id !== selectedCharacter?.id);
  const allSwimmers = selectedCharacter
    ? [selectedCharacter, ...aiSwimmers.slice(0, 3)]
    : [];

  const startCountdown = () => {
    setGameState("racing");
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startRace();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRace = () => {
    raceStartTime.current = Date.now();
    setRaceTime(0);
    setPlayerClicks(0);
    setSwimPower(0);

    const initialProgress = {};
    const initialIntensity = {};
    allSwimmers.forEach((swimmer) => {
      initialProgress[swimmer.id] = 0;
      initialIntensity[swimmer.id] = 0;
    });
    setRaceProgress(initialProgress);
    setSwimmerIntensity(initialIntensity);

    gameLoopRef.current = setInterval(() => {
      const elapsed = (Date.now() - raceStartTime.current) / 1000;
      setRaceTime(elapsed);

      setRaceProgress((prev) => {
        const newProgress = { ...prev };
        const newIntensity = {};

        // AI swimmers progress - longer race duration
        aiSwimmers.slice(0, 3).forEach((swimmer) => {
          const racePhase = elapsed / 45; // 45-60 second races
          let baseSpeed = swimmer.speed * 2.5; // Slower base speed for longer race

          // Stamina affects performance over time
          let staminaFactor = 1;
          if (racePhase > 0.3) {
            staminaFactor = Math.max(
              0.4,
              swimmer.stamina - (racePhase - 0.3) * 0.8
            );
          }

          // Add race strategy
          let strategyMultiplier = 1;
          if (swimmer.name === "Lightning Luke" && racePhase < 0.4) {
            strategyMultiplier = 1.3; // Fast start
          } else if (swimmer.name === "Rhythm Rita" && racePhase > 0.6) {
            strategyMultiplier = 1.4; // Strong finish
          }

          const randomFactor = 0.85 + Math.random() * 0.3;
          const progressGain =
            baseSpeed *
            strategyMultiplier *
            staminaFactor *
            randomFactor *
            0.05;

          newProgress[swimmer.id] = Math.min(
            100,
            prev[swimmer.id] + progressGain
          );
          newIntensity[swimmer.id] = Math.min(1, progressGain * 15);
        });

        setSwimmerIntensity(newIntensity);

        // Check for winner
        Object.entries(newProgress).forEach(([swimmerId, progress]) => {
          if (progress >= 100 && !winner) {
            const winnerSwimmer = allSwimmers.find(
              (s) => s.id === parseInt(swimmerId)
            );
            setWinner(winnerSwimmer);
            setGameState("finished");
            clearInterval(gameLoopRef.current);
          }
        });

        return newProgress;
      });
    }, 100);
  };

  const handleSwim = () => {
    if (gameState !== "racing" || countdown > 0) return;

    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime;

    // More forgiving rhythm timing for longer races
    const isOptimalTiming =
      timeSinceLastClick >= 500 && timeSinceLastClick <= 900;
    const isGoodTiming =
      timeSinceLastClick >= 300 && timeSinceLastClick <= 1200;

    let rhythmMultiplier = 0.6; // Base multiplier for spamming
    if (isOptimalTiming) {
      rhythmMultiplier = 1.8; // Perfect rhythm
    } else if (isGoodTiming) {
      rhythmMultiplier = 1.3; // Good rhythm
    }

    setLastClickTime(now);
    setPlayerClicks((prev) => prev + 1);

    const powerGain = selectedCharacter.speed * rhythmMultiplier * 2;
    setSwimPower((prev) => Math.min(100, prev + powerGain));

    setRaceProgress((prev) => {
      const currentProgress = prev[selectedCharacter.id] || 0;
      const racePhase = raceTime / 45;

      // Player stamina system
      let playerStaminaFactor = 1;
      if (racePhase > 0.3) {
        playerStaminaFactor = Math.max(
          0.5,
          selectedCharacter.stamina - (racePhase - 0.3) * 0.6
        );
      }

      const progressGain = powerGain * playerStaminaFactor * 0.8;
      const newProgress = Math.min(100, currentProgress + progressGain);

      // Update player swimming intensity for visual effects
      setSwimmerIntensity((prev) => ({
        ...prev,
        [selectedCharacter.id]: Math.min(1, rhythmMultiplier * 0.7),
      }));

      if (newProgress >= 100 && !winner) {
        setWinner(selectedCharacter);
        setGameState("finished");
        clearInterval(gameLoopRef.current);
      }

      return {
        ...prev,
        [selectedCharacter.id]: newProgress,
      };
    });
  };

  const resetGame = () => {
    setGameState("menu");
    setSelectedCharacter(null);
    setWinner(null);
    setRaceProgress({});
    setPlayerClicks(0);
    setRaceTime(0);
    setSwimPower(0);
    setSwimmerIntensity({});
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space" && gameState === "racing") {
        e.preventDefault();
        handleSwim();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, selectedCharacter, raceTime, winner]);

  // Menu Screen
  if (gameState === "menu") {
    return (
      <div className="bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-8 rounded-2xl shadow-2xl max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-blue-400 rounded-full animate-pulse"></div>
            Olympic Swimming Championship
            <div className="w-12 h-12 bg-cyan-400 rounded-full animate-pulse"></div>
          </h2>
          <p className="text-cyan-200 text-xl">
            Compete in a realistic 50m Olympic pool with dynamic water physics!
          </p>
          <p className="text-cyan-300 text-lg mt-2">
            • Realistic swimming animations • Water splashing effects •
            Full-length races •
          </p>
        </div>

        <div className="h-96 mb-8 rounded-xl overflow-hidden border-4 border-cyan-400 shadow-2xl">
          <Canvas camera={{ position: [0, 10, 15], fov: 60 }}>
            <SwimmingScene
              swimmers={characters.map((char, index) => ({
                ...char,
                id: char.id + 100,
              }))}
              raceProgress={{}}
              gameState="preview"
              swimmerIntensity={{}}
            />
          </Canvas>
        </div>

        <button
          onClick={() => setGameState("character-select")}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-xl shadow-lg"
        >
          <Users className="w-6 h-6" />
          Enter the Pool
        </button>
      </div>
    );
  }

  // Character Selection Screen
  if (gameState === "character-select") {
    return (
      <div className="bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-8 rounded-2xl shadow-2xl max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Olympic Swimmer
          </h2>
          <p className="text-cyan-200 text-lg">
            Each athlete has unique swimming style and race strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {characters.map((char) => (
            <div
              key={char.id}
              onClick={() => setSelectedCharacter(char)}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 border-4 ${
                selectedCharacter?.id === char.id
                  ? "border-yellow-400 bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg shadow-yellow-400/30"
                  : "border-transparent bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500"
              }`}
            >
              <div className="text-center">
                <div
                  className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg"
                  style={{ backgroundColor: char.color }}
                >
                  🏊‍♂️
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {char.name}
                </h3>
                <p className="text-gray-300 mb-4">{char.description}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Speed: {char.speed.toFixed(1)}</span>
                  <span>Endurance: {char.stamina.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCharacter && (
          <div className="flex gap-4">
            <button
              onClick={startCountdown}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg"
            >
              <Play className="w-6 h-6" />
              Dive In!
            </button>
            <button
              onClick={() => setGameState("menu")}
              className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-300"
            >
              Back
            </button>
          </div>
        )}
      </div>
    );
  }

  // Racing Screen
  if (gameState === "racing") {
    return (
      <div className="bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-6 rounded-2xl shadow-2xl max-w-7xl mx-auto">
        {countdown > 0 ? (
          <div className="text-center py-24">
            <div className="text-9xl font-bold text-yellow-400 mb-8 animate-pulse drop-shadow-2xl">
              {countdown}
            </div>
            <p className="text-4xl text-white font-bold mb-4">On Your Mark!</p>
            <p className="text-xl text-cyan-200">
              Get ready for the 50m freestyle...
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4 bg-black/40 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-white font-bold">
                <span className="text-xl">⏱️ {raceTime.toFixed(1)}s</span>
              </div>
              <div className="text-white font-bold">
                <span className="text-xl">
                  💪 Power: {swimPower.toFixed(0)}%
                </span>
              </div>
              <div className="text-white font-bold">
                <span className="text-xl">👆 Strokes: {playerClicks}</span>
              </div>
              <div className="text-white font-bold">
                <span className="text-xl">
                  🏁 Progress:{" "}
                  {(raceProgress[selectedCharacter?.id] || 0).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="h-[500px] mb-6 rounded-xl overflow-hidden border-4 border-cyan-400 shadow-2xl bg-gradient-to-b from-blue-400 to-blue-600">
              <Canvas camera={{ position: [0, 8, 12], fov: 75 }}>
                <SwimmingScene
                  swimmers={allSwimmers}
                  raceProgress={raceProgress}
                  selectedCharacter={selectedCharacter}
                  gameState={gameState}
                  swimmerIntensity={swimmerIntensity}
                />
              </Canvas>
            </div>

            <div className="text-center">
              <button
                onClick={handleSwim}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-8 px-20 rounded-3xl text-4xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-2xl mb-6"
              >
                🏊‍♂️ STROKE! 🏊‍♂️
              </button>
              <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-cyan-200 text-xl mb-2">
                  Click{" "}
                  <span className="bg-cyan-700 px-3 py-1 rounded font-mono text-white">
                    STROKE
                  </span>{" "}
                  or press{" "}
                  <span className="bg-cyan-700 px-3 py-1 rounded font-mono text-white">
                    SPACEBAR
                  </span>{" "}
                  to swim!
                </p>
                <p className="text-cyan-300 text-lg">
                  🎯 Find your rhythm (0.5-0.9s intervals) for maximum power!
                </p>
                <p className="text-yellow-300 text-base mt-2">
                  ⚡ Perfect timing = water splashes and speed boost!
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Finished Screen
  if (gameState === "finished") {
    const isPlayerWinner = winner?.id === selectedCharacter?.id;
    const finalTime = raceTime.toFixed(2);
    const playerProgress = raceProgress[selectedCharacter?.id] || 0;

    // Calculate race statistics
    const avgClickInterval =
      playerClicks > 1 ? (raceTime / playerClicks).toFixed(2) : 0;
    const efficiency =
      playerClicks > 0 ? (playerProgress / playerClicks).toFixed(1) : 0;

    return (
      <div className="bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-8 rounded-2xl shadow-2xl max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-8">
            {isPlayerWinner ? (
              <>
                <Trophy className="w-40 h-40 text-yellow-400 mx-auto mb-8 animate-bounce drop-shadow-2xl" />
                <h2 className="text-6xl font-bold text-yellow-400 mb-6 drop-shadow-lg">
                  🏆 OLYMPIC CHAMPION! 🏆
                </h2>
                <p className="text-3xl text-white mb-4">
                  You conquered the 50m freestyle!
                </p>
                <p className="text-xl text-yellow-200">
                  World-class performance in the pool!
                </p>
              </>
            ) : (
              <>
                <div className="w-40 h-40 text-blue-400 mx-auto mb-8 text-9xl">
                  🥈
                </div>
                <h2 className="text-6xl font-bold text-blue-400 mb-6">
                  Great Race!
                </h2>
                <p className="text-3xl text-white mb-4">
                  {winner.name} touched the wall first!
                </p>
                <p className="text-xl text-blue-200">
                  Strong effort in Olympic competition!
                </p>
              </>
            )}
          </div>

          <div className="bg-black/50 rounded-lg p-8 mb-8 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-6">
              🏊‍♂️ Race Results
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Player Results */}
              <div
                className={`p-6 rounded-lg ${
                  isPlayerWinner ? "bg-yellow-600/80" : "bg-blue-700/80"
                } border-2 ${
                  isPlayerWinner ? "border-yellow-400" : "border-blue-400"
                }`}
              >
                <h4 className="text-2xl font-bold text-white mb-4">
                  {isPlayerWinner ? "🥇" : "🥈"} YOU ({selectedCharacter.name})
                </h4>
                <div className="space-y-2 text-white">
                  <p className="text-lg">⏱️ Time: {finalTime}s</p>
                  <p className="text-lg">👆 Total Strokes: {playerClicks}</p>
                  <p className="text-lg">
                    🎯 Avg Interval: {avgClickInterval}s
                  </p>
                  <p className="text-lg">
                    ⚡ Efficiency: {efficiency}% per stroke
                  </p>
                  <p className="text-lg">
                    🏁 Distance: {playerProgress.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Winner Info (if not player) */}
              <div className="p-6 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 border-2 border-gray-400">
                <h4 className="text-2xl font-bold text-white mb-4">
                  {isPlayerWinner ? "🎯 Your Strategy" : `🥇 ${winner.name}`}
                </h4>
                {isPlayerWinner ? (
                  <div className="space-y-2 text-white">
                    <p className="text-lg">
                      💪 Strength: {selectedCharacter.speed.toFixed(1)}
                    </p>
                    <p className="text-lg">
                      🫁 Endurance: {selectedCharacter.stamina.toFixed(1)}
                    </p>
                    <p className="text-lg">🏆 Victory Strategy: Perfect!</p>
                  </div>
                ) : (
                  <div className="space-y-2 text-white">
                    <p className="text-lg">
                      💪 Speed: {winner.speed.toFixed(1)}
                    </p>
                    <p className="text-lg">
                      🫁 Stamina: {winner.stamina.toFixed(1)}
                    </p>
                    <p className="text-lg">
                      📊 Final: {(raceProgress[winner.id] || 0).toFixed(1)}%
                    </p>
                    <p className="text-lg">🎯 Strategy: {winner.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Analysis */}
            <div className="mt-6 p-4 bg-blue-900/60 rounded-lg">
              <h4 className="text-xl font-bold text-white mb-3">
                📊 Performance Analysis
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-white">
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400">
                    {((playerClicks / raceTime) * 60).toFixed(0)}
                  </p>
                  <p className="text-sm">Strokes/min</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">
                    {avgClickInterval}
                  </p>
                  <p className="text-sm">Avg rhythm (s)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">
                    {swimPower.toFixed(0)}%
                  </p>
                  <p className="text-sm">Final power</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <button
              onClick={() => setGameState("character-select")}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg"
            >
              <Play className="w-6 h-6" />
              Race Again
            </button>
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg"
            >
              <RotateCcw className="w-6 h-6" />
              New Game
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SwimmingGame3D;
