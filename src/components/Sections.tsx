import React from 'react';
import { motion } from 'motion/react';
import { Music, Calendar, Mail, FileText, Play, Pause, Volume2, Instagram, Youtube, Twitter, ExternalLink, Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// =============================================================================
// ARTIST PERSONALIZATION SECTION
// Edit the data below to customize the portfolio for the artist.
// =============================================================================

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-piano-ebony text-piano-ivory">
      <div className="absolute inset-0 opacity-40">
        {/* EDIT: Background Image URL - Replace this with your own high-quality photo */}
        <img 
          src="https://images.unsplash.com/photo-1514119412350-e174d90d280e?q=80&w=2070&auto=format&fit=crop" 
          alt="Grand Piano Setup"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-piano-ebony/50 to-piano-ebony" />
      </div>
      
      <div className="relative z-10 text-center px-4 pt-24 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-9xl font-serif mb-6 leading-[0.9] uppercase tracking-tighter">
            The Piano <br /> <span className="text-piano-gold">Project</span>
          </h1>
          <div className="flex flex-col items-center justify-center gap-1 mb-6">
            <span className="font-cursive text-xl md:text-3xl text-piano-ivory/60">By</span>
            <span className="font-cursive text-[38px] md:text-7xl text-piano-gold">Shantanu Jagirdar</span>
          </div>
          <div className="mb-10">
            <span className="text-piano-ivory/70 tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-sm font-medium block">
              Concert Pianist, Session Keyboardist & DJ
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-10">
            <a href="#listen" className="px-6 md:px-8 py-2.5 md:py-3 bg-piano-gold text-piano-ebony text-sm md:text-base font-medium rounded-full hover:bg-white transition-colors">
              Listen to Demos
            </a>
            <a href="#contact" className="px-6 md:px-8 py-2.5 md:py-3 border border-piano-ivory/30 text-sm md:text-base rounded-full hover:bg-piano-ivory hover:text-piano-ebony transition-all">
              Session Inquiries
            </a>
          </div>
          
          <p className="max-w-xl mx-auto text-xs md:text-base text-piano-ivory/50 font-light leading-relaxed tracking-wide italic">
            "Crafting sonic landscapes through the timeless resonance of ivory and the modern pulse of synthesis."
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-piano-ivory/40"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-piano-ivory/40 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export const Listen = () => {
  {/* EDIT: Track List Data */}
  const tracks = [
    { title: "Bin Tere Sanam", type: "Solo Piano", duration: "1:00" },
    { title: "Gulabi Aakhein", type: "Solo Piano", duration: "1:04" },
   // { title: "Mere Rang Mein", type: "Ambient Keys", duration: "1:14" },
    { title: "Sagar Jaisi Aankhowali", type: "Ambient Keys", duration: "1:16" },
    { title: "Tere Liye - Veer Zaara", type: "Ambient Keys", duration: "1:21" },
  ];

  const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    let interval: any;
    if (playingIndex !== null) {
      interval = setInterval(() => {
        if (audioRef.current) {
          const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(p || 0);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [playingIndex]);

  const handlePlay = (index: number) => {
    if (playingIndex === index) {
      audioRef.current?.pause();
      setPlayingIndex(null);
      window.dispatchEvent(new CustomEvent('audio-playback-state', { detail: { isPlaying: false } }));
    } else {
      if (audioRef.current) {
        // Use import.meta.env.BASE_URL for GitHub Pages compatibility
        const baseUrl = import.meta.env.BASE_URL || '/';
        const fileName = `${tracks[index].title}.mp3`;
        // Ensure no double slashes
        const trackPath = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}${fileName}`;
        
        console.log("Attempting to play:", trackPath);
        
        audioRef.current.src = encodeURI(trackPath); 
        audioRef.current.load();
        audioRef.current.play().then(() => {
          window.dispatchEvent(new CustomEvent('audio-playback-state', { detail: { isPlaying: true } }));
        }).catch(e => {
          console.error("Audio play failed:", e);
          // Fallback: try relative path if absolute fails
          if (e.name === "NotSupportedError" || e.name === "NotAllowedError" || e.message.includes("404")) {
            console.log("Retrying with relative path...");
            audioRef.current!.src = encodeURI(fileName);
            audioRef.current!.load();
            audioRef.current!.play().then(() => {
              window.dispatchEvent(new CustomEvent('audio-playback-state', { detail: { isPlaying: true } }));
            }).catch(err => console.error("All playback attempts failed:", err));
          }
        });
        setPlayingIndex(index);
      }
    }
  };

  return (
    <section id="listen" className="py-24 px-6 max-w-6xl mx-auto piano-pattern">
      <audio ref={audioRef} onEnded={() => setPlayingIndex(null)} />
      <div className="flex flex-col md:flex-row gap-16 items-start">
        <div className="w-full md:w-1/3 md:sticky md:top-24">
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">The Sound</h2>
            <div className="h-1 w-16 bg-piano-gold" />
          </div>
          
          <div className="p-8 bg-piano-ebony text-piano-ivory rounded-2xl shadow-2xl border border-piano-gold/20">
            <div className="flex items-center justify-between mb-8">
              <Music className="text-piano-gold" />
              <Volume2 size={20} className={cn("transition-opacity", playingIndex !== null ? "opacity-100 animate-pulse" : "opacity-40")} />
            </div>
            <div className="mb-6 h-20 flex flex-col justify-center">
              {playingIndex !== null ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-xs text-piano-gold uppercase tracking-widest mb-1">Now Playing</div>
                  <div className="text-xl font-serif truncate">{tracks[playingIndex].title}</div>
                  <div className="text-sm text-piano-ivory/60">{tracks[playingIndex].type}</div>
                </motion.div>
              ) : (
                <div className="text-piano-ivory/20 italic text-sm">
                  Select a track to begin listening
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="h-1 bg-piano-ivory/10 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-piano-gold"
                />
              </div>
              <div className="flex justify-between text-[10px] text-piano-ivory/40 uppercase tracking-tighter">
                <span>{playingIndex !== null && audioRef.current ? Math.floor(audioRef.current.currentTime / 60) + ":" + Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0') : "0:00"}</span>
                <span>{playingIndex !== null ? tracks[playingIndex].duration : "0:00"}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 mt-8">
              <button 
                onClick={() => playingIndex !== null && handlePlay(playingIndex)}
                className="w-12 h-12 rounded-full bg-piano-gold text-piano-ebony flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-piano-gold/20 disabled:opacity-50"
                disabled={playingIndex === null}
              >
                {playingIndex !== null ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 w-full space-y-4">
          {tracks.map((track, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handlePlay(i)}
              className={cn(
                "group flex items-center justify-between p-6 rounded-xl border transition-all cursor-pointer",
                playingIndex === i 
                  ? "border-piano-gold bg-piano-gold/5 shadow-inner" 
                  : "border-piano-ebony/5 hover:border-piano-gold/30 hover:bg-white"
              )}
            >
              <div className="flex items-center gap-6">
                <span className="text-sm font-serif text-piano-ebony/20">0{i + 1}</span>
                <div>
                  <h3 className={cn("font-medium text-lg transition-colors", playingIndex === i ? "text-piano-gold" : "group-hover:text-piano-gold")}>{track.title}</h3>
                  <p className="text-sm text-piano-ebony/40">{track.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-piano-ebony/40 font-mono">{track.duration}</span>
                {playingIndex === i ? (
                  <Pause size={16} className="text-piano-gold" />
                ) : (
                  <Play size={16} className="text-piano-ebony/20 group-hover:text-piano-gold transition-colors" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const GigCalendar = () => {
  {/* EDIT: Gig List Data */}
  const gigs = [
    { date: "APR 15", venue: "De Mora", location: "Pune", status: "Tickets Available" },
    { date: "MAY 02", venue: "Brew Merchant", location: "Pune", status: "Tickets Available" },
    { date: "MAY 18", venue: "Ritz Carlton", location: "London", status: "Tickets Available" },
    { date: "JUN 15", venue: "Conrad", location: "Bengaluru", status: "Tickets Available" },
  ];

  return (
    <section id="gigs" className="bg-piano-ebony py-24 text-piano-ivory">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Upcoming Shows</h2>
            <p className="text-piano-ivory/40 text-sm md:text-base">Catch the performance live in these locations.</p>
          </div>
          <Calendar className="text-piano-gold mb-2 hidden md:block" size={32} />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {gigs.map((gig, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-8 mb-4 md:mb-0">
                <div className="text-center min-w-[80px]">
                  <div className="text-piano-gold font-serif text-xl md:text-2xl leading-none">{gig.date.split(' ')[1]}</div>
                  <div className="text-[10px] uppercase tracking-widest text-piano-ivory/40">{gig.date.split(' ')[0]}</div>
                </div>
                <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
                <div>
                  <h3 className="text-lg md:text-xl font-serif">{gig.venue}</h3>
                  <p className="text-xs md:text-sm text-piano-ivory/60">{gig.location}</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-8">
                {/* <span className={cn(
                  "text-xs uppercase tracking-widest px-3 py-1 rounded-full border",
                  gig.status === "Sold Out" ? "border-red-500/50 text-red-400" : "border-piano-gold/50 text-piano-gold"
                )}>
                  {gig.status}
                </span> */}
                {/* <button className="p-3 rounded-full bg-piano-ivory text-piano-ebony hover:bg-piano-gold transition-colors">
                  <Play size={16} className="rotate-0" />
                </button> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Gallery = () => {
  const items = [
    { type: 'image', url: 'https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=2070&auto=format&fit=crop', title: 'Live at The Blue Note' },
    { type: 'video', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop', title: 'Studio Session - Neon Pulse' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop', title: 'Synthesizer Rig Setup' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop', title: 'Concert Hall Rehearsal' },
    { type: 'video', url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop', title: 'DJ Set - After Hours' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1520529611473-d58ff3f47a3e?q=80&w=2070&auto=format&fit=crop', title: 'Grand Piano Detail' },
  ];

  return (
    <section id="gallery" className="pt-20 md:pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12 md:mb-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Visuals</h2>
          <p className="text-piano-ebony/40 font-light text-sm md:text-base">Moments from the stage and the studio.</p>
        </div>
      </div>
      
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-piano-ebony flex-shrink-0 w-[80vw] md:w-auto snap-center"
          >
            <img 
              src={item.url} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-piano-ebony/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-piano-gold uppercase tracking-widest mb-1">{item.type}</p>
                  <h3 className="text-piano-ivory font-serif text-lg">{item.title}</h3>
                </div>
                {item.type === 'video' ? (
                  <div className="w-10 h-10 rounded-full bg-piano-gold flex items-center justify-center text-piano-ebony">
                    <Play size={16} fill="currentColor" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-piano-ivory">
                    <ExternalLink size={16} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-24 px-6 bg-gradient-to-br from-piano-ivory to-piano-gold/5 relative overflow-hidden">
      <div className="absolute inset-0 piano-pattern opacity-5 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8">Get In Touch</h2>
            <p className="text-piano-ebony/60 leading-relaxed mb-10 md:mb-12 text-sm md:text-base">
              For bookings, session inquiries, or collaboration requests, please use the form or reach out directly via social media.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-piano-gold/10 flex items-center justify-center text-piano-gold">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Email</h4>
                  <a href="mailto:booking@shantanujagirdar.com" className="text-sm font-medium text-piano-gold hover:underline">booking@shantanujagirdar.com</a>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-piano-gold/10 flex items-center justify-center text-piano-gold">
                  <WhatsAppIcon size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-lg md:text-xl mb-1">WhatsApp</h4>
                  <a href="https://wa.me/919527762077" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-medium text-piano-gold hover:underline">+91 95277 62077</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-piano-gold/20">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Name</label>
                  <input type="text" className="w-full bg-piano-ivory/30 border-b-2 border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors placeholder:text-piano-ebony/20" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Email</label>
                  <input type="email" className="w-full bg-piano-ivory/30 border-b-2 border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors placeholder:text-piano-ebony/20" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Subject</label>
                <select className="w-full bg-piano-ivory/30 border-b-2 border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors">
                  <option>Studio Session</option>
                  <option>Live Performance</option>
                  <option>Composition Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Message</label>
                <textarea rows={4} className="w-full bg-piano-ivory/30 border-b-2 border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors resize-none placeholder:text-piano-ebony/20" placeholder="How can I help you?" />
              </div>
              <button className="w-full py-4 bg-piano-ebony text-piano-ivory rounded-xl hover:bg-piano-gold transition-colors font-medium shadow-lg hover:shadow-piano-gold/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};



// import React from 'react';
// import { motion } from 'motion/react';
// import { Music, Calendar, Mail, FileText, Play, Pause, Volume2, Instagram, Youtube, Twitter, ExternalLink, Phone, MessageCircle } from 'lucide-react';
// import { cn } from '@/src/lib/utils';

// // =============================================================================
// // ARTIST PERSONALIZATION SECTION
// // Edit the data below to customize the portfolio for the artist.
// // =============================================================================

// export const Hero = () => {
//   return (
//     <section className="relative h-screen flex items-center justify-center overflow-hidden bg-piano-ebony text-piano-ivory">
//       <div className="absolute inset-0 opacity-40">
//         {/* EDIT: Background Image URL - Replace this with your own high-quality photo */}
//         <img 
//           src="https://images.unsplash.com/photo-1514119412350-e174d90d280e?q=80&w=2070&auto=format&fit=crop" 
//           alt="Grand Piano Setup"
//           className="w-full h-full object-cover"
//           referrerPolicy="no-referrer"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-piano-ebony/50 to-piano-ebony" />
//       </div>
      
//       <div className="relative z-10 text-center px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <span className="text-piano-gold tracking-[0.3em] uppercase text-sm font-medium mb-4 block">
//             {/* EDIT: Artist Title */}
//             Concert Pianist, Session Keyboardist & DJ
//           </span>
//           <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
//             SHANTANU <br /> <span className="font-cursive text-piano-gold normal-case text-7xl md:text-9xl -mt-4 block">Jagirdar</span>
//           </h1>
//           <p className="max-w-xl mx-auto text-lg text-piano-ivory/80 font-light leading-relaxed mb-8">
//             {/* EDIT: Artist Bio/Tagline */}
//             Crafting sonic landscapes through the timeless resonance of ivory and the modern pulse of synthesis.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <a href="#listen" className="px-8 py-3 bg-piano-gold text-piano-ebony font-medium rounded-full hover:bg-white transition-colors">
//               Listen to Demos
//             </a>
//             <a href="#contact" className="px-8 py-3 border border-piano-ivory/30 rounded-full hover:bg-piano-ivory hover:text-piano-ebony transition-all">
//               Session Inquiries
//             </a>
//           </div>
//         </motion.div>
//       </div>
      
//       <motion.div 
//         animate={{ y: [0, 10, 0] }}
//         transition={{ repeat: Infinity, duration: 2 }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-piano-ivory/40"
//       >
//         <div className="w-[1px] h-12 bg-gradient-to-b from-piano-ivory/40 to-transparent mx-auto" />
//       </motion.div>
//     </section>
//   );
// };

// export const Listen = () => {
//   {/* EDIT: Track List Data */}
//   const tracks = [
//     { title: "Bin Tere Sanam", type: "Solo Piano", duration: "1:00" },
//     { title: "Gulabi Aakhein", type: "Solo Piano", duration: "1:04" },
//     { title: "Mere Rang Mein", type: "Ambient Keys", duration: "1:14" },
//     { title: "Sagar Jaisi Aankhowali", type: "Ambient Keys", duration: "1:16" },
//     { title: "Tere Liye - Veer Zaara", type: "Ambient Keys", duration: "1:21" },
//   ];

//   const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);
//   const [progress, setProgress] = React.useState(0);
//   const audioRef = React.useRef<HTMLAudioElement | null>(null);

//   React.useEffect(() => {
//     let interval: any;
//     if (playingIndex !== null) {
//       interval = setInterval(() => {
//         if (audioRef.current) {
//           const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
//           setProgress(p || 0);
//         }
//       }, 100);
//     }
//     return () => clearInterval(interval);
//   }, [playingIndex]);

//   const handlePlay = (index: number) => {
//     if (playingIndex === index) {
//       audioRef.current?.pause();
//       setPlayingIndex(null);
//       window.dispatchEvent(new CustomEvent('audio-playback-state', { detail: { isPlaying: false } }));
//     } else {
//       if (audioRef.current) {
//         // Use import.meta.env.BASE_URL for GitHub Pages compatibility
//         const baseUrl = import.meta.env.BASE_URL || '/';
//         const fileName = `${tracks[index].title}.mp3`;
//         // Ensure no double slashes
//         const trackPath = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}${fileName}`;
        
//         console.log("Attempting to play:", trackPath);
        
//         audioRef.current.src = encodeURI(trackPath); 
//         audioRef.current.load();
//         audioRef.current.play().then(() => {
//           window.dispatchEvent(new CustomEvent('audio-playback-state', { detail: { isPlaying: true } }));
//         }).catch(e => {
//           console.error("Audio play failed:", e);
//           // Fallback: try relative path if absolute fails
//           if (e.name === "NotSupportedError" || e.name === "NotAllowedError" || e.message.includes("404")) {
//             console.log("Retrying with relative path...");
//             audioRef.current!.src = encodeURI(fileName);
//             audioRef.current!.load();
//             audioRef.current!.play().then(() => {
//               window.dispatchEvent(new CustomEvent('audio-playback-state', { detail: { isPlaying: true } }));
//             }).catch(err => console.error("All playback attempts failed:", err));
//           }
//         });
//         setPlayingIndex(index);
//       }
//     }
//   };

//   return (
//     <section id="listen" className="py-24 px-6 max-w-6xl mx-auto piano-pattern">
//       <audio ref={audioRef} onEnded={() => setPlayingIndex(null)} />
//       <div className="flex flex-col md:flex-row gap-16 items-start">
//         <div className="w-full md:w-1/3 md:sticky md:top-24">
//           <h2 className="text-4xl font-serif mb-6">The Sound</h2>
//           <p className="text-piano-ebony/60 leading-relaxed mb-8">
//             A curated selection of works spanning classical piano compositions to avant-garde synthesizer soundscapes.
//           </p>
//           <div className="p-8 bg-piano-ebony text-piano-ivory rounded-2xl shadow-2xl border border-piano-gold/20">
//             <div className="flex items-center justify-between mb-8">
//               <Music className="text-piano-gold" />
//               <Volume2 size={20} className={cn("transition-opacity", playingIndex !== null ? "opacity-100 animate-pulse" : "opacity-40")} />
//             </div>
//             <div className="mb-6 h-20 flex flex-col justify-center">
//               {playingIndex !== null ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                 >
//                   <div className="text-xs text-piano-gold uppercase tracking-widest mb-1">Now Playing</div>
//                   <div className="text-xl font-serif truncate">{tracks[playingIndex].title}</div>
//                   <div className="text-sm text-piano-ivory/60">{tracks[playingIndex].type}</div>
//                 </motion.div>
//               ) : (
//                 <div className="text-piano-ivory/20 italic text-sm">
//                   Select a track to begin listening
//                 </div>
//               )}
//             </div>
//             <div className="space-y-4">
//               <div className="h-1 bg-piano-ivory/10 rounded-full overflow-hidden">
//                 <motion.div 
//                   animate={{ width: `${progress}%` }}
//                   className="h-full bg-piano-gold"
//                 />
//               </div>
//               <div className="flex justify-between text-[10px] text-piano-ivory/40 uppercase tracking-tighter">
//                 <span>{playingIndex !== null && audioRef.current ? Math.floor(audioRef.current.currentTime / 60) + ":" + Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0') : "0:00"}</span>
//                 <span>{playingIndex !== null ? tracks[playingIndex].duration : "0:00"}</span>
//               </div>
//             </div>
//             <div className="flex items-center justify-center gap-8 mt-8">
//               <button 
//                 onClick={() => playingIndex !== null && handlePlay(playingIndex)}
//                 className="w-12 h-12 rounded-full bg-piano-gold text-piano-ebony flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-piano-gold/20 disabled:opacity-50"
//                 disabled={playingIndex === null}
//               >
//                 {playingIndex !== null ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
//               </button>
//             </div>
//           </div>
//         </div>
        
//         <div className="md:w-2/3 w-full space-y-4">
//           {tracks.map((track, i) => (
//             <motion.div 
//               key={i}
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ delay: i * 0.1 }}
//               onClick={() => handlePlay(i)}
//               className={cn(
//                 "group flex items-center justify-between p-6 rounded-xl border transition-all cursor-pointer",
//                 playingIndex === i 
//                   ? "border-piano-gold bg-piano-gold/5 shadow-inner" 
//                   : "border-piano-ebony/5 hover:border-piano-gold/30 hover:bg-white"
//               )}
//             >
//               <div className="flex items-center gap-6">
//                 <span className="text-sm font-serif text-piano-ebony/20">0{i + 1}</span>
//                 <div>
//                   <h3 className={cn("font-medium text-lg transition-colors", playingIndex === i ? "text-piano-gold" : "group-hover:text-piano-gold")}>{track.title}</h3>
//                   <p className="text-sm text-piano-ebony/40">{track.type}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <span className="text-xs text-piano-ebony/40 font-mono">{track.duration}</span>
//                 {playingIndex === i ? (
//                   <Pause size={16} className="text-piano-gold" />
//                 ) : (
//                   <Play size={16} className="text-piano-ebony/20 group-hover:text-piano-gold transition-colors" />
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export const GigCalendar = () => {
//   {/* EDIT: Gig List Data */}
//   const gigs = [
//     { date: "APR 15", venue: "De Mora", location: "Pune", status: "Tickets Available" },
//     { date: "MAY 02", venue: "Brew Merchant", location: "Pune", status: "Tickets Available" },
//     { date: "MAY 18", venue: "Ritz Carlton", location: "London", status: "Tickets Available" },
//     { date: "JUN 15", venue: "Conrad", location: "Bengaluru", status: "Tickets Available" },
//   ];

//   return (
//     <section id="gigs" className="bg-piano-ebony py-24 text-piano-ivory">
//       <div className="max-w-6xl mx-auto px-6">
//         <div className="flex justify-between items-end mb-16">
//           <div>
//             <h2 className="text-4xl font-serif mb-4">Upcoming Shows</h2>
//             <p className="text-piano-ivory/40">Catch the performance live in these locations.</p>
//           </div>
//           <Calendar className="text-piano-gold mb-2" size={32} />
//         </div>
        
//         <div className="grid grid-cols-1 gap-4">
//           {gigs.map((gig, i) => (
//             <motion.div 
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
//             >
//               <div className="flex items-center gap-8 mb-4 md:mb-0">
//                 <div className="text-center min-w-[80px]">
//                   <div className="text-piano-gold font-serif text-2xl leading-none">{gig.date.split(' ')[1]}</div>
//                   <div className="text-xs uppercase tracking-widest text-piano-ivory/40">{gig.date.split(' ')[0]}</div>
//                 </div>
//                 <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
//                 <div>
//                   <h3 className="text-xl font-serif">{gig.venue}</h3>
//                   <p className="text-sm text-piano-ivory/60">{gig.location}</p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between md:justify-end gap-8">
//                 {/* <span className={cn(
//                   "text-xs uppercase tracking-widest px-3 py-1 rounded-full border",
//                   gig.status === "Sold Out" ? "border-red-500/50 text-red-400" : "border-piano-gold/50 text-piano-gold"
//                 )}>
//                   {gig.status}
//                 </span> */}
//                 {/* <button className="p-3 rounded-full bg-piano-ivory text-piano-ebony hover:bg-piano-gold transition-colors">
//                   <Play size={16} className="rotate-0" />
//                 </button> */}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export const Gallery = () => {
//   const items = [
//     { type: 'image', url: 'https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=2070&auto=format&fit=crop', title: 'Live at The Blue Note' },
//     { type: 'video', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop', title: 'Studio Session - Neon Pulse' },
//     { type: 'image', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop', title: 'Synthesizer Rig Setup' },
//     { type: 'image', url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop', title: 'Concert Hall Rehearsal' },
//     { type: 'video', url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop', title: 'DJ Set - After Hours' },
//     { type: 'image', url: 'https://images.unsplash.com/photo-1520529611473-d58ff3f47a3e?q=80&w=2070&auto=format&fit=crop', title: 'Grand Piano Detail' },
//   ];

//   return (
//     <section id="gallery" className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-end mb-16">
//         <div>
//           <h2 className="text-4xl font-serif mb-4">Visuals</h2>
//           <p className="text-piano-ebony/40 font-light">Moments from the stage and the studio.</p>
//         </div>
//       </div>
      
//       <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x">
//         {items.map((item, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ delay: i * 0.1 }}
//             className="group relative aspect-square overflow-hidden rounded-2xl bg-piano-ebony flex-shrink-0 w-[80vw] md:w-auto snap-center"
//           >
//             <img 
//               src={item.url} 
//               alt={item.title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
//               referrerPolicy="no-referrer"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-piano-ebony/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-piano-gold uppercase tracking-widest mb-1">{item.type}</p>
//                   <h3 className="text-piano-ivory font-serif text-lg">{item.title}</h3>
//                 </div>
//                 {item.type === 'video' ? (
//                   <div className="w-10 h-10 rounded-full bg-piano-gold flex items-center justify-center text-piano-ebony">
//                     <Play size={16} fill="currentColor" />
//                   </div>
//                 ) : (
//                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-piano-ivory">
//                     <ExternalLink size={16} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
//   <svg 
//     viewBox="0 0 24 24" 
//     width={size} 
//     height={size} 
//     fill="currentColor" 
//     className={className}
//   >
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
//   </svg>
// );

// export const Contact = () => {
//   return (
//     <section id="contact" className="py-24 px-6 bg-gradient-to-br from-piano-ivory to-piano-gold/5 relative overflow-hidden">
//       <div className="absolute inset-0 piano-pattern opacity-5 pointer-events-none" />
//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
//           <div>
//             <h2 className="text-4xl font-serif mb-8">Get In Touch</h2>
//             <p className="text-piano-ebony/60 leading-relaxed mb-12">
//               For bookings, session inquiries, or collaboration requests, please use the form or reach out directly via social media.
//             </p>
            
//             <div className="space-y-8">
//               <div className="flex gap-6">
//                 <div className="w-12 h-12 rounded-xl bg-piano-gold/10 flex items-center justify-center text-piano-gold">
//                   <Mail size={24} />
//                 </div>
//                 <div>
//                   <h4 className="font-serif text-xl mb-1">Email</h4>
//                   <a href="mailto:booking@shantanujagirdar.com" className="text-sm font-medium text-piano-gold hover:underline">booking@shantanujagirdar.com</a>
//                 </div>
//               </div>
              
//               <div className="flex gap-6">
//                 <div className="w-12 h-12 rounded-xl bg-piano-gold/10 flex items-center justify-center text-piano-gold">
//                   <WhatsAppIcon size={24} />
//                 </div>
//                 <div>
//                   <h4 className="font-serif text-xl mb-1">WhatsApp</h4>
//                   <a href="https://wa.me/919527762077" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-piano-gold hover:underline">+91 95277 62077</a>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-10 rounded-3xl shadow-2xl border border-piano-gold/20">
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Name</label>
//                   <input type="text" className="w-full bg-piano-ivory/30 border-b-2 border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors placeholder:text-piano-ebony/20" placeholder="Your Name" />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Email</label>
//                   <input type="email" className="w-full bg-piano-ivory/30 border-b-2 border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors placeholder:text-piano-ebony/20" placeholder="your@email.com" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Subject</label>
//                 <select className="w-full bg-piano-ivory/30 border-b-2 border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors">
//                   <option>Studio Session</option>
//                   <option>Live Performance</option>
//                   <option>Composition Request</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Message</label>
//                 <textarea rows={4} className="w-full bg-piano-ivory/30 border-b-2 border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors resize-none placeholder:text-piano-ebony/20" placeholder="How can I help you?" />
//               </div>
//               <button className="w-full py-4 bg-piano-ebony text-piano-ivory rounded-xl hover:bg-piano-gold transition-colors font-medium shadow-lg hover:shadow-piano-gold/20">
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

