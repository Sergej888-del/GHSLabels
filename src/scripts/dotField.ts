// src/scripts/dotField.ts
//
// Animated dot field for the home hero.
//
// Renders a grid of small dots on a <canvas> with three concurrent
// animation systems:
//   1. Per-dot phase oscillation (alpha varies smoothly per-dot)
//   2. Diagonal sweep wave at -30° passing across the canvas every 14s
//   3. Radial alpha falloff (vignette built into the dot field itself)
//
// ~8% of dots render in amber (rgba 217,119,6) instead of zinc-600.
// The amber distribution is deterministic via index hash so it stays
// stable across resizes.
//
// Performance:
//   - DPR capped at 2 (no benefit beyond 2x for small dots)
//   - ~600 dots at 1280x600 viewport, ~1800 at 2560x1080
//   - Target: 60fps on a 2019-era mid-range laptop
//   - If frame timing exceeds ~16ms, drop `density` from caller
//
// Reduced motion:
//   - Detects prefers-reduced-motion at init AND watches for changes
//   - In reduced mode: no sweep wave, no oscillation, static dots
//
// Cleanup contract:
//   - Returns a cleanup() function that cancels the RAF loop and
//     disconnects the ResizeObserver. Caller must invoke on teardown.

interface Dot {
  x: number;
  y: number;
  phase: number;
  phaseB: number;
  speed: number;
  r: number;
  baseAlpha: number;
  amber: boolean;
}

export function initDotField(
  canvas: HTMLCanvasElement,
  density = 1
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let dots: Dot[] = [];
  let rafId = 0;

  // Reduced-motion check, watched for changes
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduce = motionQuery.matches;
  const onMotionChange = (e: MediaQueryListEvent) => {
    reduce = e.matches;
  };
  motionQuery.addEventListener('change', onMotionChange);

  // Diagonal sweep parameters (-30° upward-right)
  const diagAngle = -Math.PI / 6;
  const cosA = Math.cos(diagAngle);
  const sinA = Math.sin(diagAngle);
  const waveBandWidth = 240;
  const wavePeriod = 14; // seconds

  function resize(): void {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    const spacing = 22 / density;
    dots = [];
    const cx = w / 2;
    const cy = h / 2;
    const maxDist = Math.hypot(cx, cy);
    let i = 0;
    for (let y = spacing; y < h; y += spacing) {
      for (let x = spacing; x < w; x += spacing) {
        const d = Math.hypot(x - cx, y - cy);
        const radial = 1 - d / maxDist;
        const isAmber = (i++ * 1031) % 100 < 8;
        dots.push({
          x,
          y,
          phase: Math.random() * Math.PI * 2,
          phaseB: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.3,
          r: 1 + radial * 0.7,
          baseAlpha: 0.2 + radial * 0.55,
          amber: isAmber,
        });
      }
    }
  }

  function draw(t: number): void {
    ctx!.clearRect(0, 0, w, h);
    const time = t / 1000;
    const reach = w + h;
    const wavePos =
      ((time % wavePeriod) / wavePeriod) * (reach * 2.4) - reach * 1.2;

    for (const d of dots) {
      const osc = reduce ? 0 : Math.sin(time * d.speed + d.phase);
      const oscB = reduce
        ? 0
        : Math.sin(time * (d.speed * 0.7) + d.phaseB);
      const y = d.y + osc * 3;
      const a =
        d.baseAlpha *
        (0.3 + 0.6 * (reduce ? 0.5 : oscB * 0.5 + 0.5));

      let waveBoost = 0;
      if (!reduce) {
        const proj = d.x * cosA + d.y * sinA;
        const dist = Math.abs(proj - wavePos);
        if (dist < waveBandWidth) {
          waveBoost = (1 - dist / waveBandWidth) * 0.55;
        }
      }
      const alpha = Math.min(1, a + waveBoost);

      ctx!.fillStyle = d.amber
        ? `rgba(217, 119, 6, ${alpha * 0.85})`
        : `rgba(82, 82, 91, ${alpha})`;
      ctx!.beginPath();
      ctx!.arc(d.x, y, d.r + (waveBoost > 0 ? 0.4 : 0), 0, Math.PI * 2);
      ctx!.fill();
    }
    rafId = requestAnimationFrame(draw);
  }

  resize();
  rafId = requestAnimationFrame(draw);

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  return () => {
    cancelAnimationFrame(rafId);
    ro.disconnect();
    motionQuery.removeEventListener('change', onMotionChange);
  };
}
