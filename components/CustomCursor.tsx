import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'VIDEO' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'VIDEO' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Animation loop with lerp
    let rafId: number;
    const animate = () => {
      const lerp = 0.15;
      positionRef.current.x +=
        (targetRef.current.x - positionRef.current.x) * lerp;
      positionRef.current.y +=
        (targetRef.current.y - positionRef.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-[10000] transition-all duration-300"
      style={{
        width: isHovering ? '40px' : '8px',
        height: isHovering ? '40px' : '8px',
        marginLeft: isHovering ? '-20px' : '-4px',
        marginTop: isHovering ? '-20px' : '-4px',
      }}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: isHovering ? 'transparent' : '#D4AF37',
          border: isHovering ? '1px solid #D4AF37' : 'none',
        }}
      >
        {isHovering && (
          <span className="small-caps text-[#D4AF37]" style={{ fontSize: '6px' }}>
            EXPLORAR
          </span>
        )}
      </div>
    </div>
  );
}
