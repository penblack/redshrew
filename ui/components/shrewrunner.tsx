/*
'use client';

import { useEffect, useRef } from 'react';

export default function ShrewRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.imageSmoothingEnabled = false;

    const groundHeight = 30;
    const gravity = 1.5;

    const spriteFrameCount = 3;
    const frameWidth = 32;
    const frameHeight = 32;
    const displayScale = 3;

    let currentFrame = 0;
    let frameTick = 0;
    let spriteLoaded = false;

    const shrew = {
      x: 50,
      y: 400 - groundHeight - frameHeight * displayScale - 10,
      width: frameWidth * displayScale,
      height: frameHeight * displayScale,
      velocityY: 0,
      isJumping: false,
    };

    const obstacles = [
      { x: 800, y: 240, width: 20, height: 60 }
    ];

    const handleJump = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !shrew.isJumping) {
        shrew.velocityY = -20;
        shrew.isJumping = true;
      }
    };

    document.addEventListener('keydown', handleJump);

    const shrewSprite = new Image();
    shrewSprite.src = '/shrewsprite.png';

    shrewSprite.onload = () => {
      spriteLoaded = true;
      console.log("🖼️ Sprite loaded", {
        width: shrewSprite.naturalWidth,
        height: shrewSprite.naturalHeight,
      });
      draw();
      gameLoop();
    };

    shrewSprite.onerror = () => {
      console.error("❌ Failed to load sprite.");
    };

    const update = () => {
      shrew.velocityY += gravity;
      shrew.y += shrew.velocityY;

      if (shrew.y + shrew.height >= canvas.height - groundHeight) {
        shrew.y = canvas.height - groundHeight - shrew.height;
        shrew.velocityY = 0;
        shrew.isJumping = false;
      }

      obstacles.forEach((obs) => {
        obs.x -= 6;
        if (obs.x + obs.width < 0) {
          obs.x = canvas.width + Math.random() * 300;
        }

        if (
          shrew.x < obs.x + obs.width &&
          shrew.x + shrew.width > obs.x &&
          shrew.y < obs.y + obs.height &&
          shrew.y + shrew.height > obs.y
        ) {
          obs.x = canvas.width;
          shrew.y = canvas.height - groundHeight - shrew.height;
          shrew.velocityY = 0;
        }
      });

      frameTick++;
      if (frameTick % 10 === 0) {
        currentFrame = (currentFrame + 1) % spriteFrameCount;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#222';
      ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

      if (spriteLoaded) {
        ctx.drawImage(
          shrewSprite,
          currentFrame * frameWidth, 0,
          frameWidth, frameHeight,
          shrew.x, shrew.y,
          shrew.width, shrew.height
        );
        console.log(`✅ Drawing frame ${currentFrame}`);
      } else {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(shrew.x, shrew.y, shrew.width, shrew.height);
        console.log('⏳ Sprite not ready yet – drawing fallback');
      }

      ctx.fillStyle = '#f00';
      obstacles.forEach((obs) => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      });

      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, 25, 25);
    };

    const gameLoop = () => {
      update();
      draw();
      animationRef.current = requestAnimationFrame(gameLoop);
    };

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      document.removeEventListener('keydown', handleJump);
    };
  }, []);

  return (
    <div className="flex justify-center items-center bg-black p-2 border border-zinc-800 rounded-md">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="rounded shadow-md"
      />
    </div>
  );
}
*/