import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const PianoScroll = () => {
  const { scrollYProgress } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const hasReachedBottom = useRef(false);
  const lastTap = useRef<number>(0);
  const hasCompletedIteration = useRef(false);
  
  // Number of keys to show in the sidebar
  const keyCount = 24; 
  
  // Audio context for synthesized piano sounds
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Major scale semitones: Do-Re-Mi-Fa-Sol-La-Ti-Do
  const majorScale = [0, 2, 4, 5, 7, 9, 11, 12];

  const playNote = (index: number) => {
    if (!audioCtx || !isSoundEnabled || isAudioPlaying) return;
    
    const now = audioCtx.currentTime;
    
    // Base frequency C4 (Middle C)
    const baseFreq = 261.63; 
    
    // Map index to major scale
    const scaleIndex = index % 8;
    const octave = Math.floor(index / 8);
    const semitones = majorScale[scaleIndex] + (octave * 12);
    
    const freq = baseFreq * Math.pow(2, semitones / 12);

    const createOscillator = (f: number, type: OscillatorType, volume: number) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(f, now);
      
      // Piano-like envelope: sharp attack, natural decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      return osc;
    };

    // Layering oscillators for a richer, more "piano-like" timbre
    const osc1 = createOscillator(freq, 'triangle', 0.1);
    const osc2 = createOscillator(freq * 2, 'sine', 0.05); 

    [osc1, osc2].forEach(osc => {
      osc.start(now);
      osc.stop(now + 0.8);
    });
  };

  useEffect(() => {
    const handlePlaybackState = (e: any) => {
      setIsAudioPlaying(e.detail.isPlaying);
    };
    window.addEventListener('audio-playback-state', handlePlaybackState);
    return () => window.removeEventListener('audio-playback-state', handlePlaybackState);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioCtx) {
        setAudioCtx(new (window.AudioContext || (window as any).webkitAudioContext)());
      }
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('scroll', handleFirstInteraction);
    window.addEventListener('click', handleFirstInteraction);
    return () => {
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, [audioCtx]);
  
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const index = Math.floor(latest * (keyCount - 1));
      
      // Track full iteration: Top -> Bottom -> Top
      if (latest > 0.98) {
        hasReachedBottom.current = true;
      }
      
      if (hasReachedBottom.current && latest < 0.02 && !hasCompletedIteration.current) {
        hasCompletedIteration.current = true;
        setIsSoundEnabled(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 6000);
      }

      if (index !== activeIndex) {
        setActiveIndex(index);
        playNote(index);
      }
    });
  }, [scrollYProgress, keyCount, activeIndex, audioCtx, isSoundEnabled]);

  const handleDoubleClick = () => {
    setIsSoundEnabled(true);
    hasReachedBottom.current = false;
    hasCompletedIteration.current = false;
    setShowToast(false);
  };

  const handleTouchStart = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      handleDoubleClick();
    }
    lastTap.current = now;
  };

  return (
    <>
      <div className={cn(
        "fixed z-50 pointer-events-none transition-all duration-500",
        // Mobile: Horizontal at top, smaller and more transparent
        "top-0 left-0 w-full h-8 flex items-center justify-center px-4 opacity-40",
        // Desktop: Vertical at right, full opacity
        "md:top-0 md:right-0 md:left-auto md:w-12 md:h-screen md:flex-col md:items-end md:justify-center md:pr-2 md:opacity-100"
      )}>
        <div 
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          className={cn(
            "flex gap-[1px] md:gap-[2px] pointer-events-auto cursor-pointer",
            "flex-row md:flex-col"
          )}
          title="Double click to enable/disable sound"
        >
          {Array.from({ length: keyCount }).map((_, i) => {
            const isBlack = [1, 3, 6, 8, 10].includes(i % 12);
            const isActive = i === activeIndex;
            
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  [typeof window !== 'undefined' && window.innerWidth < 768 ? 'y' : 'x']: isActive ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : -10) : 0,
                  backgroundColor: isActive 
                    ? (isBlack ? '#C5A059' : '#fff') 
                    : (isBlack ? '#1A1A1A' : '#FDFCF0'),
                  scale: isActive ? 1.1 : 1,
                }}
                className={cn(
                  "rounded-sm transition-colors duration-200",
                  // Mobile sizes: even smaller
                  "w-3 h-6 md:w-10 md:h-6",
                  isBlack ? "w-2 h-4 md:w-6 md:h-6 z-10 -mx-1 md:-mx-0 md:-my-3" : "border border-piano-ebony/10",
                  isActive && "shadow-lg z-20 opacity-100"
                )}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-piano-ebony/80 backdrop-blur-md text-piano-ivory rounded-full border border-piano-gold/30 text-sm font-medium shadow-2xl pointer-events-none text-center max-w-[90vw]"
          >
            Scrolling sound will be disabled for now, <br className="md:hidden" />
            please click the piano scroll twice to enable it again.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
