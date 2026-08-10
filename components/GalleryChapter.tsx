import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const video3 = '/media/gallery-enter.mp4';
const poster3 = '/media/gallery-enter.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function GalleryChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const [pisos, setPisos] = useState(0);
  const [obras, setObras] = useState(0);
  const [artista, setArtista] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intersection Observer for video playback
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current!);

    const ctx = gsap.context(() => {
      // Title clip-path reveal
      gsap.fromTo(
        titleRef.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'top top',
            scrub: true,
          },
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }
      );

      // Counter animations
      ScrollTrigger.create({
        trigger: countersRef.current,
        start: 'top 80%',
        onEnter: () => {
          const obj1 = { val: 0 };
          const obj2 = { val: 0 };
          const obj3 = { val: 0 };
          
          gsap.to(obj1, {
            val: 4,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              setPisos(Math.round(obj1.val));
            }
          });
          gsap.to(obj2, {
            val: 16,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => {
              setObras(Math.round(obj2.val));
            }
          });
          gsap.to(obj3, {
            val: 1,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              setArtista(Math.round(obj3.val));
            }
          });
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 md:py-32"
    >
      <video
        ref={videoRef}
        src={video3}
        poster={poster3}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="vignette absolute inset-0" />

      <div className="relative z-10 container mx-auto px-6 md:px-8">
        <div
          ref={titleRef}
          className="font-display text-[8vw] md:text-[6vw] font-light tracking-tight text-[#e8e4df] mb-12 md:mb-24"
        >
          Salon d&apos;Exposition
        </div>

        <div ref={countersRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-16 md:mb-32">
          <div className="text-center">
            <div className="font-display text-[12vw] md:text-[6vw] text-[#D4AF37] font-light mb-2 tabular-nums">
              {pisos}
            </div>
            <div className="small-caps text-[#e8e4df] text-xs">PISOS</div>
          </div>
          <div className="text-center">
            <div className="font-display text-[12vw] md:text-[6vw] text-[#D4AF37] font-light mb-2 tabular-nums">
              {obras}
            </div>
            <div className="small-caps text-[#e8e4df] text-xs">OBRAS</div>
          </div>
          <div className="text-center">
            <div className="font-display text-[12vw] md:text-[6vw] text-[#D4AF37] font-light mb-2 tabular-nums">
              {artista}
            </div>
            <div className="small-caps text-[#e8e4df] text-xs">ARTISTA</div>
          </div>
        </div>

        {/* Artwork overlays — decorative only, hidden on mobile where the stacked layout leaves no room for them without overlapping real content */}
        <div className="hidden md:block absolute top-1/3 left-[15%] w-48 h-64 border border-[#D4AF37] shadow-2xl animate-float">
          <div className="w-full h-full bg-gradient-to-br from-[#D4AF37]/10 to-[#C45A1E]/10" />
        </div>
        <div className="hidden md:block absolute top-1/2 right-[20%] w-56 h-72 border border-[#D4AF37] shadow-2xl animate-float-delayed">
          <div className="w-full h-full bg-gradient-to-br from-[#C45A1E]/10 to-[#D4AF37]/10" />
        </div>
      </div>
    </section>
  );
}
