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

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++)
      posArray[i] = (Math.random() - 0.5) * 10;

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );


    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x808080,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);

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

      particlesMesh.rotation.x += 0.02 * (targetRotationX - particlesMesh.rotation.x);
      particlesMesh.rotation.y += 0.02 * (targetRotationY - particlesMesh.rotation.y);

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

      particlesGeometry.dispose();
      particlesMaterial.dispose();
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
