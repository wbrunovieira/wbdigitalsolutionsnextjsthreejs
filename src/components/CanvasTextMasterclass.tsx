import React, { useRef, useEffect } from 'react';

interface ParticleProps {
  x: number;
  y: number;
  color: string;
  effect: Effect;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  effect: Effect;
  size: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  distance: number;
  force: number;
  angle: number;
  friction: number;
  ease: number;

  constructor({ x, y, color, effect }: ParticleProps) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.size = 3;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;
    this.friction = 0.6;
    this.ease = 0.05;
  }

  draw() {
    const { context } = this.effect;
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.size, this.size);
    context.restore();
  }

  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.distance;
  }
}

interface EffectProps {
  context: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  text: string;
  colors: string[];
}

class Effect {
  context: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  particles: Particle[];
  gap: number;
  mouse: { x: number; y: number; radius: number };
  text: string;
  colors: string[];
  fontSize: number;
  lineHeight: number;
  textX: number;
  textY: number;
  maxTextWidth: number;
  verticalOffset: number;

  constructor({
    context,
    canvasWidth,
    canvasHeight,
    text,
    colors,
  }: EffectProps) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.text = text;
    this.colors = colors;
    this.particles = [];
    this.gap = 15;
    this.mouse = { x: 0, y: 0, radius: 20000 };
    this.fontSize = 42;
    this.lineHeight = this.fontSize * 0.9;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.maxTextWidth = this.canvasWidth * 0.7;
    this.verticalOffset = 0;
  }

  wrapText() {
    // canvas settings
    this.context.fillStyle = 'white';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.lineWidth = 1;
    this.context.strokeStyle = 'white';
    this.context.font = this.fontSize + 'px Bangers';
    // break multiline text
    let linesArray = [];
    let words = this.text.split(' ');
    let lineCounter = 0;
    let line = '';
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      if (this.context.measureText(testLine).width > this.maxTextWidth) {
        line = words[i] + ' ';
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
    }
    let textHeight = this.lineHeight * lineCounter;
    this.textY = this.canvasHeight / 2 - textHeight / 2 + this.verticalOffset;
    linesArray.forEach((el, index) => {
      this.context.fillText(
        el,
        this.textX,
        this.textY + index * this.lineHeight
      );
      //this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
    });
    this.convertToParticles();
  }

  convertToParticles() {
    this.particles = [];
    const pixels = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    ).data;
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let y = 0; y < this.canvasHeight; y += this.gap) {
      for (let x = 0; x < this.canvasWidth; x += this.gap) {
        const index = (y * this.canvasWidth + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
          this.particles.push(
            new Particle({
              effect: this,
              x: x,
              y: y,
              color: color,
            })
          );
        }
      }
    }
  }

  constellations() {
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dy, dx);
        const connectDistance = this.gap * 2;
        if (distance < connectDistance && this.particles[a].x > this.mouse.x) {
          const position = this.particles[a].size / 2;
          this.context.beginPath();
          this.context.moveTo(
            this.particles[a].x + position,
            this.particles[a].y + position
          );
          this.context.lineTo(
            this.particles[b].x + position,
            this.particles[b].y + position
          );
          this.context.strokeStyle = this.particles[a].color;
          this.context.stroke();
        }
      }
    }
  }

  render() {
    this.particles.forEach((particle) => {
      particle.draw();
      particle.update();
    });
    this.constellations();
  }
}

interface CanvasTextMasterclassProps {
  text: string;
  size: { width: number; height: number };
  colors: string[];
}

const CanvasTextMasterclass: React.FC<CanvasTextMasterclassProps> = ({
  text,
  size,
  colors,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const effect = new Effect({
          context: ctx,
          canvasWidth: size.width,
          canvasHeight: size.height,
          text,
          colors,
        });

        const handleMouseMove = (e: MouseEvent) => {
          effect.mouse.x = e.x;
          effect.mouse.y = e.y;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          effect.canvasWidth = window.innerWidth;
          effect.canvasHeight = window.innerHeight;
          effect.wrapText();
          effect.render();
        });

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }
    }
  }, [text, size, colors]);

  return (
    <div className='mt-16'>
      <canvas ref={canvasRef} width={size.width} height={size.height} />
    </div>
  );
};

export default CanvasTextMasterclass;
