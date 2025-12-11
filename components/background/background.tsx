"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mouse = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    const GrainShader = {
      uniforms: {
        tDiffuse: { value: null },
        time: { value: 0.0 },
        amount: { value: 0.06 },
        size: { value: 1.5 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform float amount;
        uniform float size;
        varying vec2 vUv;

        float random(vec2 co) {
          return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec4 color = texture2D(tDiffuse, vUv);
          vec2 noiseCoord = vUv * size + time;
          float noise = random(noiseCoord) * 2.0 - 1.0;
          vec3 grainColor = color.rgb + noise * amount;
          gl_FragColor = vec4(grainColor, color.a);
        }
      `,
    };

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const grainPass = new ShaderPass(GrainShader);
    grainPass.renderToScreen = true;
    composer.addPass(grainPass);

    const colors = [
      new THREE.Color(0.125, 0.549, 0.906),
      new THREE.Color(0.125, 0.463, 0.812),
      new THREE.Color(0.047, 0.369, 0.686),
      new THREE.Color(0.027, 0.267, 0.561),
      new THREE.Color(0.012, 0.176, 0.376),
    ];

    const hexGeometry = new THREE.OctahedronGeometry(0.03, 0);

    const addGradientColors = (
      geometry: THREE.BufferGeometry,
      baseColor: THREE.Color,
    ) => {
      const positions = geometry.attributes.position;
      const colors: number[] = [];

      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        const normalizedY = (y + 0.03) / 0.06;
        const factor = 0.4 + normalizedY * 0.6;

        colors.push(
          baseColor.r * factor,
          baseColor.g * factor,
          baseColor.b * factor,
        );
      }

      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3),
      );
    };

    const gradientVertexShader = `
      varying vec3 vPosition;
      varying vec3 vColor;
      attribute vec3 color;

      void main() {
        vPosition = position;
        vColor = color;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const gradientFragmentShader = `
      uniform float opacity;
      uniform vec3 baseColor;
      uniform float useVertexColors;
      varying vec3 vPosition;
      varying vec3 vColor;

      void main() {
        float dist = length(vPosition) / 0.05;
        float alpha = opacity * (1.0 - smoothstep(0.0, 1.0, dist * 0.7));
        vec3 finalColor = useVertexColors > 0.5 ? vColor : baseColor;
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const starFragmentShader = `
      uniform float opacity;
      uniform vec3 baseColor;
      varying vec3 vPosition;

      void main() {
        float dist = length(vPosition) / 0.08;
        float alpha = opacity * (1.0 - smoothstep(0.0, 1.2, dist * 0.5));
        float glow = 1.0 + (1.0 - dist) * 0.5;
        gl_FragColor = vec4(baseColor * glow, alpha);
      }
    `;

    const createStar3DGeometry = (size: number) => {
      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];

      const tips = [
        [size, 0, 0],
        [-size, 0, 0],
        [0, size, 0],
        [0, -size, 0],
        [0, 0, size],
        [0, 0, -size],
      ];

      const inner = size * 0.25;

      const innerPoints = [
        [inner, inner, inner],
        [inner, inner, -inner],
        [inner, -inner, inner],
        [inner, -inner, -inner],
        [-inner, inner, inner],
        [-inner, inner, -inner],
        [-inner, -inner, inner],
        [-inner, -inner, -inner],
      ];

      vertices.push(...tips[0], ...innerPoints[0], ...innerPoints[1]);
      vertices.push(...tips[0], ...innerPoints[1], ...innerPoints[3]);
      vertices.push(...tips[0], ...innerPoints[3], ...innerPoints[2]);
      vertices.push(...tips[0], ...innerPoints[2], ...innerPoints[0]);

      vertices.push(...tips[1], ...innerPoints[4], ...innerPoints[5]);
      vertices.push(...tips[1], ...innerPoints[5], ...innerPoints[7]);
      vertices.push(...tips[1], ...innerPoints[7], ...innerPoints[6]);
      vertices.push(...tips[1], ...innerPoints[6], ...innerPoints[4]);

      vertices.push(...tips[2], ...innerPoints[0], ...innerPoints[1]);
      vertices.push(...tips[2], ...innerPoints[1], ...innerPoints[5]);
      vertices.push(...tips[2], ...innerPoints[5], ...innerPoints[4]);
      vertices.push(...tips[2], ...innerPoints[4], ...innerPoints[0]);

      vertices.push(...tips[3], ...innerPoints[2], ...innerPoints[3]);
      vertices.push(...tips[3], ...innerPoints[3], ...innerPoints[7]);
      vertices.push(...tips[3], ...innerPoints[7], ...innerPoints[6]);
      vertices.push(...tips[3], ...innerPoints[6], ...innerPoints[2]);

      vertices.push(...tips[4], ...innerPoints[0], ...innerPoints[2]);
      vertices.push(...tips[4], ...innerPoints[2], ...innerPoints[6]);
      vertices.push(...tips[4], ...innerPoints[6], ...innerPoints[4]);
      vertices.push(...tips[4], ...innerPoints[4], ...innerPoints[0]);

      vertices.push(...tips[5], ...innerPoints[1], ...innerPoints[3]);
      vertices.push(...tips[5], ...innerPoints[3], ...innerPoints[7]);
      vertices.push(...tips[5], ...innerPoints[7], ...innerPoints[5]);
      vertices.push(...tips[5], ...innerPoints[5], ...innerPoints[1]);

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );

      geometry.computeVertexNormals();

      return geometry;
    };

    const starGeometry = createStar3DGeometry(0.06);
    const particlesGroup = new THREE.Group();
    const particlesCount = 300;
    const particles: THREE.Mesh[] = [];

    const twinklingParticles: {
      particle: THREE.Mesh;
      speed: number;
      phase: number;
      baseOpacity: number;
      baseScale: number;
    }[] = [];

    const twinkleChance = 0.08;

    for (let i = 0; i < particlesCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const isTwinkling = Math.random() < twinkleChance;
      const geometry = isTwinkling ? starGeometry : hexGeometry.clone();

      if (!isTwinkling) {
        addGradientColors(geometry, randomColor);
      }

      const material = isTwinkling
        ? new THREE.ShaderMaterial({
            uniforms: {
              opacity: { value: 0.95 },
              baseColor: { value: new THREE.Color(0.6, 0.85, 1.0) },
            },
            vertexShader: gradientVertexShader,
            fragmentShader: starFragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
          })
        : new THREE.ShaderMaterial({
            uniforms: {
              opacity: { value: 0.7 },
              baseColor: { value: randomColor },
              useVertexColors: { value: 1.0 },
            },
            vertexShader: gradientVertexShader,
            fragmentShader: gradientFragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
          });

      const particle = new THREE.Mesh(geometry, material);

      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      );

      particle.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );

      if (isTwinkling) {
        twinklingParticles.push({
          particle,
          speed: 0.5 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          baseOpacity: 0.85,
          baseScale: 0.8 + Math.random() * 0.4,
        });
      }

      particles.push(particle);
      particlesGroup.add(particle);
    }

    const particlesMesh = particlesGroup;
    scene.add(particlesMesh);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      particlesMesh.rotation.y = elapsedTime * 0.1;

      const targetRotationX = -mouse.y * 0.2;
      const targetRotationY = mouse.x * 0.2;

      particlesMesh.rotation.x +=
        0.02 * (targetRotationX - particlesMesh.rotation.x);

      particlesMesh.rotation.y +=
        0.02 * (targetRotationY - particlesMesh.rotation.y);

      for (const particle of particles) {
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
        particle.rotation.z += 0.005;
      }

      for (const twinkle of twinklingParticles) {
        const material = twinkle.particle.material as THREE.ShaderMaterial;

        const brightness = Math.sin(
          elapsedTime * twinkle.speed + twinkle.phase,
        );

        material.uniforms.opacity.value =
          twinkle.baseOpacity + brightness * 0.15;

        const scale = twinkle.baseScale + brightness * 0.3;
        twinkle.particle.scale.set(scale, scale, scale);
      }

      grainPass.uniforms.time.value = elapsedTime * 0.5;
      composer.render();
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);

      if (containerRef.current)
        containerRef.current.removeChild(renderer.domElement);

      hexGeometry.dispose();
      starGeometry.dispose();

      for (const particle of particles) {
        if (particle.material instanceof THREE.Material)
          particle.material.dispose();
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default Background;
