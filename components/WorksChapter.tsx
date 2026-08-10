import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const video4 = '/media/gallery-dolly.mp4';
const poster4 = '/media/gallery-dolly.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function WorksChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
      // Panel slide in
      gsap.fromTo(
        panelRef.current,
        { x: '100%' },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'top top',
            scrub: true,
          },
          x: '0%',
        }
      );

      // Quote lines reveal sequentially
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true,
        },
      });

      timeline
        .fromTo(
          line1Ref.current,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.3 }
        )
        .fromTo(
          line2Ref.current,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.3 },
          '+=0.1'
        )
        .fromTo(
          line3Ref.current,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.3 },
          '+=0.1'
        );
    }, sectionRef);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative w-full min-h-screen"
    >
      <video
        ref={videoRef}
        src={video4}
        poster={poster4}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="vignette absolute inset-0" />

      <div
        ref={panelRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[45%] bg-[#0a1628]/90 backdrop-blur-sm p-6 sm:p-12 md:p-24 z-10"
      >
        <div className="font-display text-[6vw] md:text-[3vw] font-light italic text-[#e8e4df] leading-tight">
          <div ref={line1Ref} className="mb-4">
            Pinto la arquitectura de la ausencia
          </div>
          <div ref={line2Ref} className="mb-4">
            — habitaciones que recuerdan,
          </div>
          <div ref={line3Ref}>
            escaleras que susurran...
          </div>
        </div>
      </div>
    </section>
  );
}
