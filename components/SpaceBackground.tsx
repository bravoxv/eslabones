import React, { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
}

const SpaceBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Star field parameters
        const numStars = 800;
        const stars: Star[] = [];
        const speed = 2.0;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Initialize stars
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width - centerX,
                y: Math.random() * canvas.height - centerY,
                z: Math.random() * canvas.width,
            });
        }

        // Animation loop
        const animate = () => {
            // Solid black background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw stars
            stars.forEach((star) => {
                // Move star closer
                star.z -= speed;

                // Reset star if it goes past the screen
                if (star.z <= 0) {
                    star.z = canvas.width;
                    star.x = Math.random() * canvas.width - centerX;
                    star.y = Math.random() * canvas.height - centerY;
                }

                // Calculate screen position
                const sx = (star.x / star.z) * canvas.width + centerX;
                const sy = (star.y / star.z) * canvas.height + centerY;

                // Calculate star size based on depth
                const size = (1 - star.z / canvas.width) * 3;

                // Draw star only (no trails)
                ctx.beginPath();
                ctx.arc(sx, sy, size, 0, Math.PI * 2);
                const starOpacity = (1 - star.z / canvas.width);
                ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0"
            style={{ background: '#000000' }}
        />
    );
};

export default SpaceBackground;
