import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three';

/** Draws a plank floor texture on a canvas, so no texture file is shipped. */
export function createFloorTexture(repeatX: number, repeatY: number): CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas is not available');

  const planks = 8;
  const h = size / planks;
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  for (let row = 0; row < planks; row++) {
    const offset = rand() * size;
    for (let seg = 0; seg < 2; seg++) {
      const x = (offset + seg * (size / 2)) % size;
      const tone = 0.82 + rand() * 0.3;
      const r = Math.round(116 * tone);
      const g = Math.round(82 * tone);
      const b = Math.round(56 * tone);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, row * h, size / 2, h);
      if (x + size / 2 > size) ctx.fillRect(x - size, row * h, size / 2, h);
      ctx.strokeStyle = 'rgba(40,24,14,0.55)';
      ctx.lineWidth = 3;
      ctx.strokeRect(x, row * h, size / 2, h);
      for (let k = 0; k < 28; k++) {
        ctx.strokeStyle = `rgba(50,30,18,${0.05 + rand() * 0.08})`;
        ctx.lineWidth = 1 + rand() * 1.5;
        const y = row * h + rand() * h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size / 2, y + (rand() - 0.5) * 6);
        ctx.stroke();
      }
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** Soft sky gradient for the window pane. */
export function createSkyTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas is not available');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#9cc3e6');
  grad.addColorStop(0.55, '#dcebf6');
  grad.addColorStop(0.62, '#f6efe3');
  grad.addColorStop(1, '#c9d2c2');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 256);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
