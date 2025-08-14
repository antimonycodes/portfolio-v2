import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
// import { getStarfield } from "./3D/getStarfield";
import { getFresnelMat } from "./3D/getFresnelMat";
// import { OrbitControls } from "jsm/controls/OrbitControls.js";
// import { getFresnelMat } from "./3D/getFresnelMat";
// import getStarfield from "./3D/getStarfield";

interface EarthProps {
  className?: string;
}
// Add this at the top of your component, after imports
declare class OrbitControls {
  constructor(object: THREE.Camera, domElement: HTMLElement);
  enabled: boolean;
  target: THREE.Vector3;
  enableDamping: boolean;
  dampingFactor: number;
  enableZoom: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number;
  minDistance: number;
  maxDistance: number;
  update(): boolean;
  dispose(): void;
}

const Earth3D: React.FC<EarthProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const earthGroupRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<any | null>(null);
  const [autoRotate] = useState(true);
  const meshesRef = useRef<{
    earthMesh: THREE.Mesh | null;
    lightsMesh: THREE.Mesh | null;
    cloudsMesh: THREE.Mesh | null;
    glowMesh: THREE.Mesh | null;
    // stars: THREE.Points | null;
  }>({
    earthMesh: null,
    lightsMesh: null,
    cloudsMesh: null,
    glowMesh: null,
    // stars: null,
  });
  class OrbitControls {
    [key: string]: any;
    constructor(object: any, domElement: any) {
      this.object = object;
      this.domElement = domElement;

      this.enabled = true;
      this.target = new THREE.Vector3();
      this.minDistance = 0;
      this.maxDistance = Infinity;
      this.minPolarAngle = 0;
      this.maxPolarAngle = Math.PI;
      this.minAzimuthAngle = -Infinity;
      this.maxAzimuthAngle = Infinity;
      this.enableDamping = true;
      this.dampingFactor = 0.1;
      this.enableZoom = true;
      this.zoomSpeed = 1.0;
      this.enableRotate = true;
      this.rotateSpeed = 1.0;
      this.enablePan = true;
      this.panSpeed = 1.0;
      this.autoRotate = false;
      this.autoRotateSpeed = 2.0;

      this.spherical = new THREE.Spherical();
      this.sphericalDelta = new THREE.Spherical();
      this.scale = 1;
      this.panOffset = new THREE.Vector3();
      this.zoomChanged = false;

      this.rotateStart = new THREE.Vector2();
      this.rotateEnd = new THREE.Vector2();
      this.rotateDelta = new THREE.Vector2();

      this.panStart = new THREE.Vector2();
      this.panEnd = new THREE.Vector2();
      this.panDelta = new THREE.Vector2();

      this.dollyStart = new THREE.Vector2();
      this.dollyEnd = new THREE.Vector2();
      this.dollyDelta = new THREE.Vector2();

      this.state = "NONE";

      this.EPS = 0.000001;

      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
      // this.onWheel = this.onWheel.bind(this);
      // this.onTouchStart = this.onTouchStart.bind(this);
      // this.onTouchMove = this.onTouchMove.bind(this);
      // this.onTouchEnd = this.onTouchEnd.bind(this);

      this.domElement.addEventListener("mousedown", this.onMouseDown);
      this.domElement.addEventListener("wheel", this.onWheel);
      this.domElement.addEventListener("touchstart", this.onTouchStart);
      this.domElement.addEventListener("contextmenu", (e: any) =>
        e.preventDefault()
      );

      this.update();
    }

    getPolarAngle() {
      return this.spherical.phi;
    }

    getAzimuthalAngle() {
      return this.spherical.theta;
    }

    update() {
      const offset = new THREE.Vector3();
      const quat = new THREE.Quaternion().setFromUnitVectors(
        this.object.up,
        new THREE.Vector3(0, 1, 0)
      );
      const quatInverse = quat.clone().invert();

      const lastPosition = new THREE.Vector3();
      const lastQuaternion = new THREE.Quaternion();

      const position = this.object.position;

      offset.copy(position).sub(this.target);
      offset.applyQuaternion(quat);
      this.spherical.setFromVector3(offset);

      if (this.autoRotate && this.state === "NONE") {
        this.rotateLeft(this.getAutoRotationAngle());
      }

      this.spherical.theta += this.sphericalDelta.theta;
      this.spherical.phi += this.sphericalDelta.phi;

      this.spherical.theta = Math.max(
        this.minAzimuthAngle,
        Math.min(this.maxAzimuthAngle, this.spherical.theta)
      );
      this.spherical.phi = Math.max(
        this.minPolarAngle,
        Math.min(this.maxPolarAngle, this.spherical.phi)
      );
      this.spherical.makeSafe();

      this.spherical.radius *= this.scale;
      this.spherical.radius = Math.max(
        this.minDistance,
        Math.min(this.maxDistance, this.spherical.radius)
      );

      this.target.add(this.panOffset);

      offset.setFromSpherical(this.spherical);
      offset.applyQuaternion(quatInverse);

      position.copy(this.target).add(offset);

      this.object.lookAt(this.target);

      if (this.enableDamping === true) {
        this.sphericalDelta.theta *= 1 - this.dampingFactor;
        this.sphericalDelta.phi *= 1 - this.dampingFactor;
        this.panOffset.multiplyScalar(1 - this.dampingFactor);
      } else {
        this.sphericalDelta.set(0, 0, 0);
        this.panOffset.set(0, 0, 0);
      }

      this.scale = 1;

      if (
        this.zoomChanged ||
        lastPosition.distanceToSquared(this.object.position) > this.EPS ||
        8 * (1 - lastQuaternion.dot(this.object.quaternion)) > this.EPS
      ) {
        lastPosition.copy(this.object.position);
        lastQuaternion.copy(this.object.quaternion);
        this.zoomChanged = false;
        return true;
      }

      return false;
    }

    getAutoRotationAngle() {
      return ((2 * Math.PI) / 60 / 60) * this.autoRotateSpeed;
    }

    rotateLeft(angle: any) {
      this.sphericalDelta.theta -= angle;
    }

    rotateUp(angle: number) {
      this.sphericalDelta.phi -= angle;
    }

    panLeft(distance: any, objectMatrix: any) {
      const v = new THREE.Vector3();
      v.setFromMatrixColumn(objectMatrix, 0);
      v.multiplyScalar(-distance);
      this.panOffset.add(v);
    }

    panUp(distance: any, objectMatrix: any) {
      const v = new THREE.Vector3();
      v.setFromMatrixColumn(objectMatrix, 1);
      v.multiplyScalar(distance);
      this.panOffset.add(v);
    }

    pan(deltaX: any, deltaY: any) {
      const element = this.domElement;
      const offset = new THREE.Vector3();

      if (this.object.isPerspectiveCamera) {
        offset.copy(this.object.position).sub(this.target);
        let targetDistance = offset.length();
        targetDistance *= Math.tan(((this.object.fov / 2) * Math.PI) / 180.0);
        this.panLeft(
          (2 * deltaX * targetDistance) / element.clientHeight,
          this.object.matrix
        );
        this.panUp(
          (2 * deltaY * targetDistance) / element.clientHeight,
          this.object.matrix
        );
      }
    }

    dollyIn(dollyScale: any) {
      if (this.object.isPerspectiveCamera) {
        this.scale /= dollyScale;
      }
    }

    dollyOut(dollyScale: any) {
      if (this.object.isPerspectiveCamera) {
        this.scale *= dollyScale;
      }
    }

    onMouseDown(event: any) {
      if (!this.enabled) return;

      event.preventDefault();

      if (event.button === 0) {
        this.state = "ROTATE";
        this.rotateStart.set(event.clientX, event.clientY);
      } else if (event.button === 1) {
        this.state = "DOLLY";
        this.dollyStart.set(event.clientX, event.clientY);
      } else if (event.button === 2) {
        this.state = "PAN";
        this.panStart.set(event.clientX, event.clientY);
      }

      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    }

    onMouseMove(event: any) {
      if (!this.enabled) return;

      event.preventDefault();

      if (this.state === "ROTATE") {
        this.rotateEnd.set(event.clientX, event.clientY);
        this.rotateDelta
          .subVectors(this.rotateEnd, this.rotateStart)
          .multiplyScalar(this.rotateSpeed);

        const element = this.domElement;
        this.rotateLeft(
          (2 * Math.PI * this.rotateDelta.x) / element.clientHeight
        );
        this.rotateUp(
          (2 * Math.PI * this.rotateDelta.y) / element.clientHeight
        );

        this.rotateStart.copy(this.rotateEnd);
      } else if (this.state === "DOLLY") {
        this.dollyEnd.set(event.clientX, event.clientY);
        this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);

        if (this.dollyDelta.y > 0) {
          this.dollyIn(this.getZoomScale());
        } else if (this.dollyDelta.y < 0) {
          this.dollyOut(this.getZoomScale());
        }

        this.dollyStart.copy(this.dollyEnd);
      } else if (this.state === "PAN") {
        this.panEnd.set(event.clientX, event.clientY);
        this.panDelta
          .subVectors(this.panEnd, this.panStart)
          .multiplyScalar(this.panSpeed);
        this.pan(this.panDelta.x, this.panDelta.y);
        this.panStart.copy(this.panEnd);
      }

      this.update();
    }

    onMouseUp() {
      if (!this.enabled) return;

      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);

      this.state = "NONE";
    }

    onWheel(event: any) {
      if (!this.enabled || !this.enableZoom) return;

      event.preventDefault();
      event.stopPropagation();

      if (event.deltaY < 0) {
        this.dollyOut(this.getZoomScale());
      } else if (event.deltaY > 0) {
        this.dollyIn(this.getZoomScale());
      }

      this.update();
    }

    getZoomScale() {
      return Math.pow(0.95, this.zoomSpeed);
    }

    onTouchStart(event: any) {
      if (!this.enabled) return;

      switch (event.touches.length) {
        case 1:
          this.state = "TOUCH_ROTATE";
          this.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
          break;
        case 2:
          this.state = "TOUCH_DOLLY_PAN";
          const dx = event.touches[0].pageX - event.touches[1].pageX;
          const dy = event.touches[0].pageY - event.touches[1].pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          this.dollyStart.set(0, distance);
          const x = (event.touches[0].pageX + event.touches[1].pageX) * 0.5;
          const y = (event.touches[0].pageY + event.touches[1].pageY) * 0.5;
          this.panStart.set(x, y);
          break;
      }

      document.addEventListener("touchmove", this.onTouchMove);
      document.addEventListener("touchend", this.onTouchEnd);
    }

    onTouchMove(event: any) {
      if (!this.enabled) return;

      event.preventDefault();
      event.stopPropagation();

      switch (event.touches.length) {
        case 1:
          if (this.state !== "TOUCH_ROTATE") return;
          this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
          this.rotateDelta
            .subVectors(this.rotateEnd, this.rotateStart)
            .multiplyScalar(this.rotateSpeed);

          const element = this.domElement;
          this.rotateLeft(
            (2 * Math.PI * this.rotateDelta.x) / element.clientHeight
          );
          this.rotateUp(
            (2 * Math.PI * this.rotateDelta.y) / element.clientHeight
          );

          this.rotateStart.copy(this.rotateEnd);
          break;
        case 2:
          if (this.state !== "TOUCH_DOLLY_PAN") return;

          const dx = event.touches[0].pageX - event.touches[1].pageX;
          const dy = event.touches[0].pageY - event.touches[1].pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          this.dollyEnd.set(0, distance);
          this.dollyDelta.set(
            0,
            Math.pow(this.dollyEnd.y / this.dollyStart.y, this.zoomSpeed)
          );

          this.dollyIn(this.dollyDelta.y);
          this.dollyStart.copy(this.dollyEnd);

          const x = (event.touches[0].pageX + event.touches[1].pageX) * 0.5;
          const y = (event.touches[0].pageY + event.touches[1].pageY) * 0.5;

          this.panEnd.set(x, y);
          this.panDelta
            .subVectors(this.panEnd, this.panStart)
            .multiplyScalar(this.panSpeed);

          this.pan(this.panDelta.x, this.panDelta.y);

          this.panStart.copy(this.panEnd);
          break;
      }

      this.update();
    }

    onTouchEnd() {
      if (!this.enabled) return;

      document.removeEventListener("touchmove", this.onTouchMove);
      document.removeEventListener("touchend", this.onTouchEnd);

      this.state = "NONE";
    }

    dispose() {
      this.domElement.removeEventListener("mousedown", this.onMouseDown);
      this.domElement.removeEventListener("wheel", this.onWheel);
      this.domElement.removeEventListener("touchstart", this.onTouchStart);
      this.domElement.removeEventListener("contextmenu", (e: any) =>
        e.preventDefault()
      );

      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
      document.removeEventListener("touchmove", this.onTouchMove);
      document.removeEventListener("touchend", this.onTouchEnd);
    }
  }

  useEffect(() => {
    if (!mountRef.current) return;

    // Clean up any existing content first
    const container = mountRef.current;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const w = container.clientWidth;
    const h = container.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // renderer.setClearColor();
    // renderer.setClearColor(0x0a0a2e, 1);
    // renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
    scene.add(earthGroup);

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(2.5, 12);

    // Create a simple blue-green earth material as fallback
    const earthMaterial = new THREE.MeshPhongMaterial({
      // color: 0x4a90e2,
      shininess: 100,
    });

    // Try to load textures, but use fallback if they fail
    const earthTexture = loader.load(
      "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
      undefined,
      undefined,
      () => {
        console.warn("Earth texture failed to load, using fallback color");
      }
    );

    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthMaterial.map = earthTexture;

    const earthMesh = new THREE.Mesh(geometry, earthMaterial);
    earthGroup.add(earthMesh);

    // City lights with fallback
    const lightsMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff88,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.3,
    });

    const lightsTexture = loader.load(
      "https://threejs.org/examples/textures/planets/earth_lights_2048.png",
      undefined,
      undefined,
      () => {
        console.warn("Lights texture failed to load");
      }
    );

    lightsMaterial.map = lightsTexture;
    const lightsMesh = new THREE.Mesh(geometry, lightsMaterial);
    earthGroup.add(lightsMesh);

    // Clouds with fallback
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.NormalBlending,
    });

    const cloudsTexture = loader.load(
      "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
      undefined,
      undefined,
      () => {
        console.warn("Clouds texture failed to load");
      }
    );

    cloudsMaterial.alphaMap = cloudsTexture;
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial);
    cloudsMesh.scale.setScalar(1.005);
    earthGroup.add(cloudsMesh);

    // Atmosphere glow
    const fresnelMat = getFresnelMat({
      rimHex: 0x0088ff,
      facingHex: 0x000044,
    });
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    // Stars
    // const stars = getStarfield({ numStars: 2000 });
    // scene.add(stars);

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.1);
    scene.add(ambientLight);

    // Setup OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 2;
    controls.maxDistance = 20;

    controlsRef.current = controls;

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    earthGroupRef.current = earthGroup;
    meshesRef.current = {
      earthMesh,
      lightsMesh,
      cloudsMesh,
      glowMesh,
      // stars,
    };

    function animate() {
      const meshes = meshesRef.current;

      // Only auto-rotate Earth if controls auto-rotate is disabled
      if (!controlsRef.current?.autoRotate) {
        if (meshes.earthMesh) meshes.earthMesh.rotation.y += 0.002;
        if (meshes.lightsMesh) meshes.lightsMesh.rotation.y += 0.002;
        if (meshes.cloudsMesh) meshes.cloudsMesh.rotation.y += 0.0023;
        if (meshes.glowMesh) meshes.glowMesh.rotation.y += 0.002;
      }

      // if (meshes.stars) meshes.stars.rotation.y -= 0.0002;

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    function handleWindowResize() {
      if (!container || !cameraRef.current || !rendererRef.current) return;

      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    }

    window.addEventListener("resize", handleWindowResize, false);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleWindowResize);

      if (controlsRef.current) {
        controlsRef.current.dispose();
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (
        rendererRef.current &&
        mountRef.current &&
        rendererRef.current.domElement.parentNode
      ) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      // Dispose of geometries and materials
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            } else if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            }
          }
        });
      }
    };
  }, [autoRotate]);

  // const toggleAutoRotate = () => {
  //   setAutoRotate(!autoRotate);
  //   if (controlsRef.current) {
  //     controlsRef.current.autoRotate = !autoRotate;
  //   }
  // };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      <div
        ref={mountRef}
        className={`w-full h-full ${className}`}
        style={{ minHeight: "400px", position: "relative" }}
      />
      {/* <div className="absolute top-4 left-4 z-10">
        <button
          onClick={toggleAutoRotate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
        >
          {autoRotate ? "Stop Auto Rotate" : "Start Auto Rotate"}
        </button>
      </div> */}
      {/* <div className="absolute bottom-4 left-4 z-10 text-white text-xs opacity-75">
        <div>🖱️ Left click + drag: Rotate</div>
        <div>🖱️ Right click + drag: Pan</div>
        <div>⚙️ Mouse wheel: Zoom</div>
      </div> */}
    </div>
  );
};

export default Earth3D;
