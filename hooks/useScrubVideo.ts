import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrubVideoOptions {
  sectionRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  /** ScrollTrigger `end` for the pinned section, e.g. '+=400%'. */
  end: string;
  /** Called on every ScrollTrigger update with raw progress (0-1) and the live instance, for progress bars / secondary timelines. */
  onProgress?: (progress: number, self: ScrollTrigger) => void;
  /** Include when a value used to decide whether a <video> is mounted changes, so the effect re-binds to the new DOM node. */
  deps?: unknown[];
}

/**
 * Pins a section and scrubs a video's currentTime to scroll position.
 *
 * The target time is updated immediately from ScrollTrigger's onUpdate (so it
 * never lags behind input), but the actual `video.currentTime` write happens
 * in a continuous gsap.ticker loop that eases toward that target every
 * rendered frame. Driving the ease from onUpdate alone (as opposed to a
 * frame loop) stalls between scroll events instead of settling smoothly, and
 * that's what "buggy" scrubbing looks like during a fast or flicked scroll.
 */
export function useScrubVideo({
  sectionRef,
  videoRef,
  end,
  onProgress,
  deps = [],
}: UseScrubVideoOptions) {
  const targetProgress = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const video = videoRef.current;

    video?.load();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          targetProgress.current = self.progress;
          onProgress?.(self.progress, self);
        },
      });
    }, section);

    let active = true;
    const tick = () => {
      if (!active || !video || video.seeking || !video.duration) return;
      const targetTime = targetProgress.current * video.duration;
      const delta = targetTime - video.currentTime;
      if (Math.abs(delta) < 0.004) return;
      video.currentTime += delta * 0.12;
    };
    gsap.ticker.add(tick);

    return () => {
      active = false;
      gsap.ticker.remove(tick);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, ...deps]);
}
