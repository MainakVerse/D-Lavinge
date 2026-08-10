import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrubVideo } from '@/hooks/useScrubVideo';
import { useIsMobile } from '@/hooks/use-mobile';
import ScrubVideoLayer from '@/components/ScrubVideoLayer';

const video5 = '/media/staircase.mp4';
const poster5 = '/media/staircase.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function StaircaseChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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
      // within the section — show the text directly and skip the
      // pin-exit darken, which has no pinned space to animate across.
      if (isMobile) {
        gsap.set(textRef.current, { clipPath: 'inset(0 0% 0 0)' });
        return;
      }

      // Text mask reveal (wipe), not a simple fade
      gsap.fromTo(
        textRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '+=150%',
            end: '+=250%',
            scrub: true,
          },
          clipPath: 'inset(0 0% 0 0)',
        }
      );

      // Darken at end
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '+=350%',
          end: '+=400%',
          scrub: true,
        },
        filter: 'brightness(0.3)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="staircase"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <ScrubVideoLayer videoRef={videoRef} src={video5} poster={poster5} />
      <div className="vignette absolute inset-0" />

      <div className="absolute top-8 left-8 z-10">
        <span className="small-caps text-[#D4AF37] text-xs">
          02 — EL DESCENSO
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          ref={textRef}
          className="font-display text-[6vw] md:text-[4vw] font-light tracking-tight text-[#e8e4df] text-center px-4"
        >
          Cada escalón, una duda...
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
