'use client';

import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '@/hooks/use-mobile';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import HeroChapter from '@/components/HeroChapter';
import FacadeChapter from '@/components/FacadeChapter';
import GalleryChapter from '@/components/GalleryChapter';
import WorksChapter from '@/components/WorksChapter';
import StaircaseChapter from '@/components/StaircaseChapter';
import SecondGalleryChapter from '@/components/SecondGalleryChapter';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isLoading) return;

    // Pinned sections measure layout before web fonts finish swapping in;
    // refresh once fonts are ready so pin start/end offsets match final text
    // metrics instead of the fallback-font layout.
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    // Lenis exists to smooth wheel/trackpad scroll for the desktop pinned
    // scrub effect (see useScrubVideo). Mobile never pins anything, and
    // Lenis's synthetic momentum fights the OS's native touch momentum —
    // that's what reads as "stuck and jittery" on phones. Let mobile use
    // native scroll untouched.
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Single RAF driver for Lenis, synced to GSAP's own ticker. A second,
    // independent requestAnimationFrame loop calling lenis.raf() with a
    // different time base causes conflicting deltas per visual frame.
    const driveLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(driveLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(driveLenis);
      lenis.destroy();
    };
  }, [isLoading, isMobile]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <div className="grain-overlay">
          <CustomCursor />
          <Navigation />
          <main>
            <HeroChapter />
            <FacadeChapter />
            <GalleryChapter />
            <WorksChapter />
            <StaircaseChapter />
            <SecondGalleryChapter />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
}
