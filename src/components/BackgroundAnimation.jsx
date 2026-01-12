import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Configuration
        const config = {
            particleCount: window.innerWidth < 768 ? 40 : 80,
            connectionDistance: 150,
            mouseRadius: 200,
            baseSpeed: 0.5,
            colors: [
                { r: 249, g: 115, b: 22 },  // Primary Orange
                { r: 139, g: 92, b: 246 },  // Secondary Purple
                { r: 6, g: 182, b: 212 }    // Accent Cyan
            ]
        };

        let width, height;
        let particles = [];
        let mouse = { x: null, y: null };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * config.baseSpeed;
                this.vy = (Math.random() - 0.5) * config.baseSpeed;
                this.size = Math.random() * 2.5 + 1; // Slightly larger particles

                // Assign a color theme
                this.colorTheme = config.colors[Math.floor(Math.random() * config.colors.length)];
                this.alpha = Math.random() * 0.5 + 0.2; // Variable transparency
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                // Premium Glow Effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = `rgb(${this.colorTheme.r}, ${this.colorTheme.g}, ${this.colorTheme.b})`;
                ctx.fillStyle = `rgba(${this.colorTheme.r}, ${this.colorTheme.g}, ${this.colorTheme.b}, ${this.alpha})`;
                ctx.fill();
                // Reset shadow for performance/other draws
                ctx.shadowBlur = 0;
            }

            update() {
                // Movement
                this.x += this.vx;
                this.y += this.vy;

                // Mouse Interaction (Magnetic + Float)
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.mouseRadius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (config.mouseRadius - distance) / config.mouseRadius;

                        // Gentle attraction
                        const attractionStrength = 0.03;
                        this.vx += forceDirectionX * force * attractionStrength;
                        this.vy += forceDirectionY * force * attractionStrength;
                    }
                }

                // Friction to stabilize movement over time
                this.vx *= 0.99;
                this.vy *= 0.99;

                // Keep a minimum movement to prevent stopping
                if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.05;
                if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.05;

                // Screen wrapping
                if (this.x < 0) this.x = width;
                else if (this.x > width) this.x = 0;

                if (this.y < 0) this.y = height;
                else if (this.y > height) this.y = 0;
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw Connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.connectionDistance) {
                        ctx.beginPath();
                        // Gradient Line
                        const opacity = 1 - (distance / config.connectionDistance);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Mouse Connection Line
            if (mouse.x != null) {
                for (let i = 0; i < particles.length; i++) {
                    let dx = mouse.x - particles[i].x;
                    let dy = mouse.y - particles[i].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.mouseRadius) {
                        ctx.beginPath();
                        const opacity = 1 - (distance / config.mouseRadius);
                        // Use particle color for mouse connection
                        const col = particles[i].colorTheme;
                        ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${opacity * 0.4})`;
                        ctx.lineWidth = 1.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        // Event Listeners
        const handleResize = () => {
            resize();
            init();
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        resize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1, // Behind everything
                background: 'transparent', // Let CSS gradient show
                pointerEvents: 'none', // Allow clicking through
            }}
        />
    );
};

export default BackgroundAnimation;
