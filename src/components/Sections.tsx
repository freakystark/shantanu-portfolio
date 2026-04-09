import React from 'react';
import { motion } from 'motion/react';
import { Music, Calendar, Mail, FileText, Play, Pause, Volume2, Instagram, Youtube, Twitter, ExternalLink, Phone, MessageSquare } from 'lucide-react';
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
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-piano-gold tracking-[0.3em] uppercase text-sm font-medium mb-4 block">
            {/* EDIT: Artist Title */}
            Concert Pianist, Session Keyboardist & DJ
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
            SHANTANU <br /> <span className="font-cursive text-piano-gold normal-case text-7xl md:text-9xl -mt-4 block">Jagirdar</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-piano-ivory/80 font-light leading-relaxed mb-8">
            {/* EDIT: Artist Bio/Tagline */}
            Crafting sonic landscapes through the timeless resonance of ivory and the modern pulse of synthesis.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#listen" className="px-8 py-3 bg-piano-gold text-piano-ebony font-medium rounded-full hover:bg-white transition-colors">
              Listen to Demos
            </a>
            <a href="#epk" className="px-8 py-3 border border-piano-ivory/30 rounded-full hover:bg-piano-ivory hover:text-piano-ebony transition-all">
              Session Inquiries
            </a>
          </div>
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
    { title: "Midnight Nocturne", type: "Solo Piano", duration: "4:32" },
    { title: "Neon Pulse", type: "Synth Exploration", duration: "3:15" },
    { title: "Ethereal Echoes", type: "Ambient Keys", duration: "5:10" },
    { title: "Classical Fusion", type: "Orchestral Hybrid", duration: "4:45" },
  ];
// ... rest of the file ...

  return (
    <section id="listen" className="py-24 px-6 max-w-6xl mx-auto piano-pattern">
      <div className="flex flex-col md:flex-row gap-16 items-start">
        <div className="w-full md:w-1/3 md:sticky md:top-24">
          <h2 className="text-4xl font-serif mb-6">The Sound</h2>
          <p className="text-piano-ebony/60 leading-relaxed mb-8">
            A curated selection of works spanning classical piano compositions to avant-garde synthesizer soundscapes.
          </p>
          <div className="p-8 bg-piano-ebony text-piano-ivory rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <Music className="text-piano-gold" />
              <Volume2 size={20} className="text-piano-ivory/40" />
            </div>
            <div className="mb-6">
              <div className="text-xs text-piano-gold uppercase tracking-widest mb-1">Now Playing</div>
              <div className="text-xl font-serif">Midnight Nocturne</div>
              <div className="text-sm text-piano-ivory/60">Solo Piano</div>
            </div>
            <div className="space-y-4">
              <div className="h-1 bg-piano-ivory/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "45%" }}
                  className="h-full bg-piano-gold"
                />
              </div>
              <div className="flex justify-between text-[10px] text-piano-ivory/40 uppercase tracking-tighter">
                <span>1:42</span>
                <span>4:32</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 mt-8">
              <button className="text-piano-ivory/60 hover:text-piano-ivory transition-colors">
                <Play size={24} fill="currentColor" />
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
              className="group flex items-center justify-between p-6 rounded-xl border border-piano-ebony/5 hover:border-piano-gold/30 hover:bg-white transition-all cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <span className="text-sm font-serif text-piano-ebony/20">0{i + 1}</span>
                <div>
                  <h3 className="font-medium text-lg group-hover:text-piano-gold transition-colors">{track.title}</h3>
                  <p className="text-sm text-piano-ebony/40">{track.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-piano-ebony/40 font-mono">{track.duration}</span>
                <Play size={16} className="text-piano-ebony/20 group-hover:text-piano-gold transition-colors" />
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
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-serif mb-4">Upcoming Shows</h2>
            <p className="text-piano-ivory/40">Catch the performance live in these locations.</p>
          </div>
          <Calendar className="text-piano-gold mb-2" size={32} />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {gigs.map((gig, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-8 mb-4 md:mb-0">
                <div className="text-center min-w-[80px]">
                  <div className="text-piano-gold font-serif text-2xl leading-none">{gig.date.split(' ')[1]}</div>
                  <div className="text-xs uppercase tracking-widest text-piano-ivory/40">{gig.date.split(' ')[0]}</div>
                </div>
                <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
                <div>
                  <h3 className="text-xl font-serif">{gig.venue}</h3>
                  <p className="text-sm text-piano-ivory/60">{gig.location}</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-8">
                <span className={cn(
                  "text-xs uppercase tracking-widest px-3 py-1 rounded-full border",
                  gig.status === "Sold Out" ? "border-red-500/50 text-red-400" : "border-piano-gold/50 text-piano-gold"
                )}>
                  {gig.status}
                </span>
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
    <section id="gallery" className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl font-serif mb-4">Visuals</h2>
          <p className="text-piano-ebony/40 font-light">Moments from the stage and the studio.</p>
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

export const Contact = () => {
  return (
    <section id="contact" className="pt-12 pb-24 px-6 max-w-6xl mx-auto piano-pattern">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h2 className="text-4xl font-serif mb-8">Get In Touch</h2>
          <p className="text-piano-ebony/60 leading-relaxed mb-12">
            For bookings, session inquiries, or collaboration requests, please use the form or reach out to me directly via social media.
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
                <MessageSquare size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-1">WhatsApp</h4>
                <a href="https://wa.me/919527762077" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-piano-gold hover:underline">+91 95277 62077</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-piano-ebony/5">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Name</label>
                <input type="text" className="w-full bg-piano-ivory/50 border-b border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Email</label>
                <input type="email" className="w-full bg-piano-ivory/50 border-b border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Subject</label>
              <select className="w-full bg-piano-ivory/50 border-b border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors">
                <option>Studio Session</option>
                <option>Live Performance</option>
                <option>Composition Request</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Message</label>
              <textarea rows={4} className="w-full bg-piano-ivory/50 border-b border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors resize-none" />
            </div>
            <button className="w-full py-4 bg-piano-ebony text-piano-ivory rounded-xl hover:bg-piano-gold transition-colors font-medium">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const EPK = () => {
  return (
    <section id="epk" className="py-24 px-6 max-w-6xl mx-auto piano-pattern">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h2 className="text-4xl font-serif mb-8">Session Inquiries</h2>
          <p className="text-piano-ebony/60 leading-relaxed mb-12">
            Available for studio sessions, live shows,  tour support. Specializing in grand piano, vintage electric pianos, and complex synth & sound programming.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-xl bg-piano-gold/10 flex items-center justify-center text-piano-gold">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-1">Electronic Press Kit</h4>
                <p className="text-sm text-piano-ebony/40 mb-3">Download high-res photos, bio, and tech rider.</p>
                <button className="text-sm font-medium text-piano-gold hover:underline">Download EPK (PDF 12MB)</button>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-xl bg-piano-gold/10 flex items-center justify-center text-piano-gold">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-1">Direct Contact</h4>
                <p className="text-sm text-piano-ebony/40 mb-3">For booking and collaboration requests.</p>
                {/* EDIT: Contact Email */}
                <a href="mailto:booking@shantanujagirdar.com" className="text-sm font-medium text-piano-gold hover:underline">booking@shantanujagirdar.com</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-piano-ebony/5">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Name</label>
                <input type="text" className="w-full bg-piano-ivory/50 border-b border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Email</label>
                <input type="email" className="w-full bg-piano-ivory/50 border-b border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Subject</label>
              <select className="w-full bg-piano-ivory/50 border-b border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors">
                <option>Studio Session</option>
                <option>Live Performance</option>
                <option>Composition Request</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-piano-ebony/40 font-medium">Message</label>
              <textarea rows={4} className="w-full bg-piano-ivory/50 border-b border-piano-ebony/10 py-2 focus:border-piano-gold outline-none transition-colors resize-none" />
            </div>
            <button className="w-full py-4 bg-piano-ebony text-piano-ivory rounded-xl hover:bg-piano-gold transition-colors font-medium">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
