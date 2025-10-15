"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

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

    const colors = [
      new THREE.Color(0.125, 0.549, 0.906),
      new THREE.Color(0.125, 0.463, 0.812),
      new THREE.Color(0.047, 0.369, 0.686),
      new THREE.Color(0.027, 0.267, 0.561),
      new THREE.Color(0.012, 0.176, 0.376),
    ];

    const hexGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 6);

    const particlesGroup = new THREE.Group();
    const particlesCount = 800;
    const particles: THREE.Mesh[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const material = new THREE.MeshBasicMaterial({
        color: randomColor,
        transparent: true,
        opacity: 0.2,
      });

      const particle = new THREE.Mesh(hexGeometry, material);

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

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
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
