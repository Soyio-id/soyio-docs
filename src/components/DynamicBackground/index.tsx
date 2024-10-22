import { useCallback, useEffect, useRef, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

import styles from './styles.module.css';

const circleBaseRadius = 60;

type Circle = { x: number; y: number; radius: number; color: string; speedX: number; speedY: number; };

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const createCircle = (color: string): Circle => {
  return {
    x: Math.random() * window.innerWidth,
    y: -(circleBaseRadius * getRandomArbitrary(5, 15)),
    radius: circleBaseRadius * getRandomArbitrary(5, 15),
    color: color,
    speedX: (1 + Math.random() * 3) * (Math.round(Math.random()) * 2 - 1),
    speedY: (1 + Math.random() * 3) * (Math.round(Math.random()) * 2 - 1),
  };
};

type Props = {
  mutedBg?: boolean;
} & React.CanvasHTMLAttributes<HTMLCanvasElement>;

const colorCounts = [
  { color: '#0091ff', count: 3 },
  { color: '#393cff', count: 1 },
  { color: '#87cbff', count: 3 },
  { color: '#858dff', count: 4 },
  { color: '#004585', count: 1 },
  { color: '#b17dff', count: 3 },
];

const generateCircles = (): Circle[] => {
  return colorCounts.flatMap(({ color, count }) =>
    Array(count).fill(null).map(() => createCircle(color))
  );
};

export default function DynamicBackground({ mutedBg, ...props }: Props) {
  const { width = '100%', height = '100%', ...rest } = props;
  const canvasRef = useRef(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [circles] = useState<Circle[]>(() => generateCircles());

  const resizeCanvas = (context: CanvasRenderingContext2D | null) => {
    if (!context) return;
    const canvas = context.canvas;
    const { width, height } = canvas.getBoundingClientRect();

    if (isBrowser && (canvas.width !== width || canvas.height !== height)) {
      const { devicePixelRatio: ratio = 1 } = window;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
      return true;
    }
    return false;
  };

  const draw = useCallback(() => {
    if (!context) return;
    const canvas = context.canvas;
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Update and draw each circle
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      circle.y += circle.speedY; // Update position
      circle.x += circle.speedX; // Update position

      // Reset position if it goes beyond the canvas
      if (circle.y - circle.radius > canvas.height)
        circle.y = -circle.radius * 2;
      if (circle.x - circle.radius > canvas.width)
        circle.x = -circle.radius * 2;
      if (circle.speedX < 0 && circle.x + circle.radius * 2 < 0)
        circle.x = canvas.width + circle.radius;
      if (circle.speedY < 0 && circle.y + circle.radius * 2 < 0)
        circle.y = canvas.height + circle.radius;

      // Draw the circle
      context.beginPath();
      context.fillStyle = circle.color;
      context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      context.fill();
    }
  }, [circles, context]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    // Check if null context has been replaced on component mount
    if (context) {
      const render = () => {
        resizeCanvas(context);
        draw();
        if (isBrowser) {
          animationFrameId = window.requestAnimationFrame(render);
        }
      };
      render();
    }

    return () => {
      if (isBrowser) window.cancelAnimationFrame(animationFrameId);
    };
  }, [context, draw]);

  return (
    <>
      <div className={styles.noise} />

      <canvas
        className={`${styles.canvas} ${mutedBg ? styles.canvasMuted : ''}`}
        ref={canvasRef}
        style={{ width, height }}
        {...rest}
      />
    </>
  );
}
