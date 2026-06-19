import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    // Configure network parameters
    const isMobile = width < 768;
    const NODE_COUNT = isMobile ? 40 : 80;
    const MAX_DISTANCE = isMobile ? 130 : 160;
    const MOUSE_RADIUS = 180;
    const NODE_BASE_RADIUS = 1.5;

    // Initialize nodes
    const initNodes = () => {
      nodesRef.current = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25, // Very slow motion
          vy: (Math.random() - 0.5) * 0.25,
          radius: NODE_BASE_RADIUS + Math.random() * 1.5,
          baseOpacity: 0.4 + Math.random() * 0.4,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.005 + Math.random() * 0.008
        });
      }
    };

    initNodes();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      initNodes();
    };
    window.addEventListener('resize', handleResize);

    // Track mouse position for interactive effect
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    // Animation loop
    const animate = () => {
      time += 1;

      // Clear with full transparency so the page background shows
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges for seamless loop
        if (node.x < -10) node.x = width + 10;
        if (node.x > width + 10) node.x = -10;
        if (node.y < -10) node.y = height + 10;
        if (node.y > height + 10) node.y = -10;

        // Update pulse
        node.pulsePhase += node.pulseSpeed;
      });

      // Draw connecting lines first (so they appear below nodes)
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Connect to mouse if close
        const dxM = nodeA.x - mouseRef.current.x;
        const dyM = nodeA.y - mouseRef.current.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < MOUSE_RADIUS) {
          const opacity = (1 - distM / MOUSE_RADIUS) * 0.6;
          const gradient = ctx.createLinearGradient(
            nodeA.x, nodeA.y,
            mouseRef.current.x, mouseRef.current.y
          );
          gradient.addColorStop(0, `rgba(20, 184, 166, ${opacity})`);
          gradient.addColorStop(1, `rgba(16, 185, 129, ${opacity * 0.6})`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }

        // Connect to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MAX_DISTANCE) {
            const opacity = (1 - distance / MAX_DISTANCE) * 0.35;

            // Subtle glow effect on line
            ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with pulse effect
      nodes.forEach((node) => {
        const pulseMultiplier = 1 + Math.sin(node.pulsePhase) * 0.3;
        const currentRadius = node.radius * pulseMultiplier;
        const currentOpacity = node.baseOpacity * (0.7 + Math.sin(node.pulsePhase) * 0.3);

        // Outer glow
        const glowRadius = currentRadius * 3;
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        glowGradient.addColorStop(0, `rgba(20, 184, 166, ${currentOpacity * 0.5})`);
        glowGradient.addColorStop(0.5, `rgba(16, 185, 129, ${currentOpacity * 0.2})`);
        glowGradient.addColorStop(1, 'rgba(20, 184, 166, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Solid node center
        ctx.fillStyle = `rgba(94, 234, 212, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Solid dark teal/cyan base background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #042f2e 50%, #0f172a 100%)'
      }} />

      {/* Subtle radial accent (keeps the existing teal vibe) */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top right, rgba(20, 184, 166, 0.12), transparent 60%), radial-gradient(ellipse at bottom left, rgba(6, 182, 212, 0.10), transparent 60%)'
      }} />

      {/* Geometric Network Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />
    </>
  );
};
