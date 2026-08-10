import type { RefObject } from 'react';

interface ScrubVideoLayerProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  src: string;
  poster: string;
  className?: string;
}

export default function ScrubVideoLayer({
  videoRef,
  src,
  poster,
  className = 'absolute inset-0 w-full h-full object-cover',
}: ScrubVideoLayerProps) {
  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ willChange: 'transform' }}
    />
  );
}
