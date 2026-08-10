import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            y: '-100%',
            duration: 1.2,
            ease: 'power3.inOut',
            onComplete: () => {
              onComplete();
            },
          });
        },
      });

      // Stagger letters
      tl.from('.preloader-letter', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      });

      // Draw underline
      tl.to(
        '.preloader-underline',
        {
          width: '100%',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '-=0.3'
      );

      // Counter animation
      tl.to(
        counterRef.current,
        {
          innerText: 100,
          duration: 1.5,
          snap: { innerText: 1 },
          ease: 'power1.inOut',
        },
        '-=1.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ backgroundColor: '#0a1628' }}
    >
      <div className="text-center">
        <div className="font-display text-[8vw] font-light tracking-tight text-[#e8e4df] mb-4">
          {'DLAVIGNE'.split('').map((letter, i) => (
            <span key={i} className="preloader-letter inline-block">
              {letter}
            </span>
          ))}
        </div>
        <div className="relative w-full h-[2px] mb-8">
          <div
            className="preloader-underline absolute left-0 top-0 h-full"
            style={{
              width: '0%',
              backgroundColor: '#D4AF37',
            }}
          />
        </div>
        <div className="font-display text-[3vw] font-light text-[#D4AF37] tabular-nums">
          <span ref={counterRef}>0</span>
        </div>
      </div>
    </div>
  );
}
