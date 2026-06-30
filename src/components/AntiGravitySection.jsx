import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { motion, useInView } from 'framer-motion';

const AntiGravitySection = ({ celebrationMode }) => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const isInView = useInView(sceneRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !sceneRef.current) return;

    // Module aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    
    // Create renderer
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
    });
    renderRef.current = render;

    // Create boundaries
    const thickness = 60;
    const ground = Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(0 - thickness / 2, height / 2, thickness, height, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true, render: { visible: false } });
    const ceiling = Bodies.rectangle(width / 2, -1000, width, thickness, { isStatic: true, render: { visible: false } }); // Very high ceiling to drop from

    Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    // Create objects (Photos, Hearts, etc. represented by styled bodies)
    const objects = [];
    const colors = ['#d4af37', '#f3e5ab', '#ff4b4b', '#ffffff', '#2a4365'];
    
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * -1000 - 100; // Start way above screen
      const size = Math.random() * 40 + 40;
      
      const isCircle = Math.random() > 0.5;
      
      let body;
      if (isCircle) {
        body = Bodies.circle(x, y, size / 2, {
          restitution: 0.8,
          render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)],
            strokeStyle: '#ffffff',
            lineWidth: 2
          }
        });
      } else {
        body = Bodies.rectangle(x, y, size * 1.5, size, {
          restitution: 0.8,
          chamfer: { radius: 10 },
          render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)],
            strokeStyle: '#ffffff',
            lineWidth: 2
          }
        });
      }
      objects.push(body);
    }
    
    Composite.add(world, objects);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Run the engine and renderer
    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      Composite.clear(world);
      Engine.clear(engine);
    };
  }, [isInView]);

  // Effect for Celebration Mode (zero gravity / random forces)
  useEffect(() => {
    if (celebrationMode && engineRef.current) {
      engineRef.current.gravity.y = -0.5; // Float upwards
      
      // Apply random forces
      const bodies = Matter.Composite.allBodies(engineRef.current.world);
      bodies.forEach(body => {
        if (!body.isStatic) {
          Matter.Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.1,
            y: (Math.random() - 0.5) * 0.1
          });
        }
      });
    }
  }, [celebrationMode]);

  return (
    <section className="relative w-full h-screen bg-luxury-dark py-20 flex flex-col overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-display text-luxury-gold text-glow mb-4">Anti-Gravity Memories</h2>
        <p className="text-white/70 font-sans italic">Drag and toss the floating memories!</p>
      </div>
      
      {/* Physics Canvas Container */}
      <div 
        ref={sceneRef} 
        className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing"
      />
    </section>
  );
};

export default AntiGravitySection;
