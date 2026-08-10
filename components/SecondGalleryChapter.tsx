import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrubVideo } from '@/hooks/useScrubVideo';
import { useIsMobile } from '@/hooks/use-mobile';
import ScrubVideoLayer from '@/components/ScrubVideoLayer';

const video6 = '/media/gallery-second.mp4';
const poster6 = '/media/gallery-second.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function SecondGalleryChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();

  useScrubVideo({
    sectionRef,
    videoRef,
    end: '+=350%',
    onProgress: (progress) => {
      if (progressRef.current) {
        progressRef.current.style.height = `${progress * 100}%`;
      }
    },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // On mobile there's no pinned scroll distance (see useScrubVideo), so
      // scroll-scrubbed reveals tied to '+=N%' offsets have nowhere to run
      // within the section — show the title and CTA directly.
      if (isMobile) {
        gsap.set(titleRef.current, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        });
        gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        return;
      }

      // Title clip-path reveal
      gsap.fromTo(
        titleRef.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: true,
          },
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }
      );

      // CTA fade in
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '+=250%',
            end: '+=300%',
            scrub: true,
          },
          opacity: 1,
          y: 0,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxDisplacement = 12;
    setMousePos({
      x: Math.max(-maxDisplacement, Math.min(maxDisplacement, x * 0.15)),
      y: Math.max(-maxDisplacement, Math.min(maxDisplacement, y * 0.15)),
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <section
      id="second-gallery"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <ScrubVideoLayer videoRef={videoRef} src={video6} poster={poster6} />
      <div className="vignette absolute inset-0" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-8">
        <div
          ref={titleRef}
          className="font-display text-[9vw] sm:text-[10vw] md:text-[7vw] font-light tracking-tight text-[#e8e4df] mb-12 sm:mb-20 md:mb-32 text-center"
        >
          Mansarde Nocturne
        </div>

        <button
          ref={ctaRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
          className="relative px-8 py-4 md:px-12 md:py-6 border border-[#D4AF37] text-[#D4AF37] font-sans text-sm tracking-wider overflow-hidden group transition-all duration-300"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            opacity: 0,
          }}
          data-testid="button-solicitar-obra"
        >
          <span className="relative z-10 small-caps">Solicitar una Obra</span>
          <div
            className="absolute left-0 top-0 h-full bg-[#D4AF37] transition-all duration-500 ease-out"
            style={{
              width: isHovering ? '100%' : '0%',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />
          <span
            className="absolute inset-0 flex items-center justify-center small-caps transition-opacity duration-500"
            style={{
              color: '#0a1628',
              opacity: isHovering ? 1 : 0,
            }}
          >
            Solicitar una Obra
          </span>
        </button>

        {/* Artwork overlays — decorative only, hidden on mobile to avoid crowding the title/CTA in the shorter h-screen section */}
        <div className="hidden md:block absolute top-1/4 left-[10%] w-40 h-52 border border-[#D4AF37] shadow-2xl animate-float">
          <div className="w-full h-full bg-gradient-to-br from-[#D4AF37]/10 to-[#C45A1E]/10" />
        </div>
        <div className="hidden md:block absolute bottom-1/4 right-[15%] w-48 h-60 border border-[#D4AF37] shadow-2xl animate-float-delayed">
          <div className="w-full h-full bg-gradient-to-br from-[#C45A1E]/10 to-[#D4AF37]/10" />
        </div>
      </div>

      <div className="absolute top-0 right-4 h-full w-[1px] bg-[#D4AF37]/20 z-20">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 w-full bg-[#D4AF37]"
          style={{ height: '0%' }}
        />
      </div>
    </section>
  );
}
