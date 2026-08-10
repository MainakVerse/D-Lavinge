import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrubVideo } from '@/hooks/useScrubVideo';
import { useIsMobile } from '@/hooks/use-mobile';
import ScrubVideoLayer from '@/components/ScrubVideoLayer';

const video1 = '/media/hero-paris.mp4';
const poster1 = '/media/hero-paris.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function HeroChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const scrollInviteRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useScrubVideo({
    sectionRef,
    videoRef,
    end: '+=400%',
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
      // within the section — show both lines directly instead.
      if (isMobile) {
        gsap.set(subheadlineRef.current, { opacity: 1, y: 0 });

        gsap.to(scrollInviteRef.current, {
          opacity: 0.3,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: 'power1.inOut',
        });
        return;
      }

      // Headline fade out
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: true,
        },
        opacity: 0,
        y: -100,
      });

      // Subheadline fade in
      gsap.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 100 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '+=100%',
            end: '+=200%',
            scrub: true,
          },
          opacity: 1,
          y: 0,
        }
      );

      // Scroll invite pulse
      gsap.to(scrollInviteRef.current, {
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <ScrubVideoLayer videoRef={videoRef} src={video1} poster={poster1} />
      <div className="vignette absolute inset-0" />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div
          ref={headlineRef}
          className="font-display text-[10vw] md:text-[8vw] font-light tracking-tight text-[#e8e4df] text-center leading-none"
        >
          El Edificio
        </div>
        <div
          ref={subheadlineRef}
          className="font-display text-[6vw] md:text-[5vw] font-light tracking-tight text-[#e8e4df] text-center leading-tight mt-8 px-4"
          style={{ opacity: 0 }}
        >
          Donde el arte
          <br />
          vive en las paredes
        </div>
      </div>

      <div
        ref={scrollInviteRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
      >
        <div className="w-24 h-[1px] bg-[#D4AF37]" />
        <span className="small-caps text-[#D4AF37] text-[10px]">
          DESPLÁZATE PARA ENTRAR
        </span>
      </div>

      {/* Progress bar */}
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
