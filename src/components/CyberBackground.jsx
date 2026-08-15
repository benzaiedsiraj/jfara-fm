import React, { useEffect, useRef } from 'react';

const CyberBackground = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Animation Variables
    let angle = 0;

    // Draw Topology Contour Lines & Rotating Globe Grid
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const blueColor = isDark ? 'rgba(0, 130, 166, ' : 'rgba(0, 130, 166, ';
      const goldColor = isDark ? 'rgba(200, 164, 78, ' : 'rgba(180, 140, 40, ';

      angle += 0.005;

      // ── 1. DRAW ANIMATED TOPOLOGY CONTOUR WAVES ──
      const numLines = 6;
      ctx.lineWidth = 1;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        const lineY = height * 0.2 + i * (height * 0.12);
        const opacity = isDark ? 0.04 + i * 0.015 : 0.03 + i * 0.01;
        ctx.strokeStyle = i % 2 === 0 ? `${blueColor}${opacity})` : `${goldColor}${opacity})`;

        for (let x = 0; x <= width; x += 15) {
          // Complex topological wave formula
          const y =
            lineY +
            Math.sin(x * 0.003 + angle + i) * 35 +
            Math.cos(x * 0.006 - angle * 0.5) * 20 +
            Math.sin(x * 0.001 + i) * 15;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // ── 2. DRAW ROTATING DIGITAL GLOBE GRID (Bottom Right / Center Background Accent) ──
      const globeX = width * 0.85;
      const globeY = height * 0.5;
      const globeRadius = Math.min(width, height) * 0.35;

      ctx.save();
      ctx.translate(globeX, globeY);

      // Globe Outline Circle
      ctx.beginPath();
      ctx.arc(0, 0, globeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `${blueColor}${isDark ? 0.08 : 0.06})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Latitude Rings
      const numLats = 7;
      for (let i = 1; i < numLats; i++) {
        const latY = -globeRadius + (i * (globeRadius * 2)) / numLats;
        const latRadius = Math.sqrt(globeRadius * globeRadius - latY * latY);

        ctx.beginPath();
        ctx.ellipse(0, latY, latRadius, latRadius * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `${blueColor}${isDark ? 0.05 : 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Longitude Rotating Meridian Lines
      const numLongs = 8;
      for (let i = 0; i < numLongs; i++) {
        const rotAngle = angle + (i * Math.PI) / numLongs;
        const rx = Math.cos(rotAngle) * globeRadius;

        ctx.beginPath();
        ctx.ellipse(0, 0, Math.abs(rx), globeRadius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? `${blueColor}${isDark ? 0.06 : 0.04})` : `${goldColor}${isDark ? 0.05 : 0.03})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Broadcasting Signal Pulse Circles (Emanating from Ben Guerdane Signal Hub)
      for (let p = 0; p < 3; p++) {
        const pulseRadius = ((angle * 60 + p * 80) % globeRadius);
        const pulseOpacity = Math.max(0, (1 - pulseRadius / globeRadius) * (isDark ? 0.15 : 0.1));

        ctx.beginPath();
        ctx.arc(-globeRadius * 0.2, -globeRadius * 0.1, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${goldColor}${pulseOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background HTML5 Topology & Globe Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Logo-Matched Ambient Orbs */}
      <div 
        className="absolute -top-32 right-1/4 w-[550px] h-[550px] rounded-full blur-[140px] transition-all duration-700 pointer-events-none"
        style={{ background: 'var(--orb-blue)' }}
      />
      <div 
        className="absolute top-1/3 -left-32 w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-700 pointer-events-none"
        style={{ background: 'var(--orb-gold)' }}
      />
      <div 
        className="absolute -bottom-32 right-10 w-[500px] h-[500px] rounded-full blur-[130px] transition-all duration-700 pointer-events-none"
        style={{ background: 'var(--orb-blue)' }}
      />
    </div>
  );
};

export default CyberBackground;
