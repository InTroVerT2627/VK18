"use client";

import { useEffect, useRef } from "react";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particleCount = window.innerWidth < 768 ? 20 : 70;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.6 + 0.4,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: Math.random() * 0.5 + 0.05
    }));

    let frame = 0;
    const animate = () => {
      frame += 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.y > canvas.height) particle.y = -4;
        if (particle.x > canvas.width || particle.x < 0) particle.x = Math.random() * canvas.width;
        context.beginPath();
        context.fillStyle = frame % 2 === 0 ? "rgba(234, 179, 8, 0.6)" : "rgba(96, 165, 250, 0.45)";
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" aria-hidden="true" />;
}
