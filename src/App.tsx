// 
import React, { useState, useEffect } from 'react';
import { PianoScroll } from './components/PianoScroll';
import { Hero, Listen, GigCalendar, Gallery, Contact } from './components/Sections';
import { Instagram, Youtube, Twitter, MessageCircle, Phone, Menu, X } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Listen', href: '#listen' },
    { name: 'Gigs', href: '#gigs' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <main className={cn("relative min-h-screen", isMenuOpen && "overflow-hidden h-screen")}>
      {/* Piano Scroll Indicator */}
      <PianoScroll />
      
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[100] px-6 md:px-8 py-6 flex justify-between items-center transition-all duration-300",
        isScrolled 
          ? "bg-piano-ivory/90 backdrop-blur-md shadow-sm py-4" 
          : "bg-transparent py-6"
      )}>
        <div className={cn(
          "hidden md:flex text-xl md:text-2xl font-serif transition-colors duration-300 flex-col leading-none pl-2 md:pl-0",
          isScrolled ? "text-piano-gold" : "text-white"
        )}>
          <span className="tracking-tighter uppercase">The Piano</span>
          <span className={cn(
            "text-[10px] tracking-[0.3em] uppercase",
            isScrolled ? "text-piano-ebony/60" : "text-piano-gold"
          )}>Project</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className={cn(
                "text-xs uppercase tracking-widest font-medium transition-colors duration-300",
                isScrolled ? "text-piano-gold hover:text-piano-ebony" : "text-white hover:text-piano-gold"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={cn(
            "md:hidden p-2 transition-colors duration-300",
            isScrolled ? "text-piano-gold" : "text-white"
          )}
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Mobile Menu Overlay (Drawer) */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
              />
              
              {/* Drawer */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[85%] bg-white z-[60] flex flex-col p-8 md:hidden shadow-2xl"
              >
                  <div className="flex justify-between items-center mb-12">
                    <div className="flex flex-col leading-none">
                      <span className="text-2xl font-serif text-piano-ebony uppercase tracking-tighter">The Piano</span>
                      <span className="text-[10px] font-sans text-piano-gold uppercase tracking-[0.3em]">Project</span>
                    </div>
                    <button 
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 text-piano-ebony"
                    >
                      <X size={28} />
                    </button>
                  </div>
                
                <div className="flex flex-col gap-8">
                  {navItems.map((item) => (
                    <a 
                      key={item.name} 
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-3xl font-serif text-piano-ebony hover:text-piano-gold transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-piano-ebony/10">
                  <div className="mb-8">
                    <div className="text-xl font-serif tracking-widest uppercase text-piano-gold">
                      Shantanu Jagirdar
                    </div>
                  </div>
                  
                  <p className="text-[10px] uppercase tracking-widest text-piano-ebony/40 mb-4 font-medium">Connect</p>
                  <div className="flex gap-6">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-piano-ebony hover:text-piano-gold transition-colors">
                      <Instagram size={24} />
                    </a>
                    <a href="https://wa.me/919527762077" target="_blank" rel="noopener noreferrer" className="text-piano-ebony hover:text-piano-gold transition-colors">
                      <WhatsAppIcon size={24} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Sections */}
      <Hero />
      <Listen />
      <GigCalendar />
      <Gallery />
      <Contact />

      {/* Footer */}
      <footer className="py-20 md:py-24 px-6 border-t border-piano-ebony/5 text-center bg-piano-ivory">
        <div className="mb-10 md:mb-12">
          <div className="text-4xl md:text-7xl font-serif tracking-tighter uppercase leading-none mb-2">
            THE PIANO <span className="text-piano-gold">PROJECT</span>
          </div>
          <div className="font-cursive text-xl md:text-3xl text-piano-gold">By Shantanu Jagirdar</div>
        </div>
        
        {/* Contact Info in Footer */}
        <div className="flex flex-col items-center gap-2 mb-10 md:mb-12 text-piano-ebony/60">
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-piano-gold" />
            <span className="text-[10px] md:text-sm">+91 95277 62077</span>
          </div>
          <div className="flex items-center gap-2">
            <WhatsAppIcon size={12} className="text-piano-gold" />
            <span className="text-[10px] md:text-sm">WhatsApp available</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 md:gap-8 mb-10 md:mb-12">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 md:p-3 rounded-full border border-piano-ebony/10 hover:border-piano-gold hover:text-piano-gold transition-all">
            <Instagram size={20} />
          </a>
          <a href="https://wa.me/919527762077" target="_blank" rel="noopener noreferrer" className="p-2.5 md:p-3 rounded-full border border-piano-ebony/10 hover:border-piano-gold hover:text-piano-gold transition-all">
            <WhatsAppIcon size={20} />
          </a>
        </div>

        <p className="text-[10px] text-piano-ebony/40 uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} &bull; All Rights Reserved
        </p>
      </footer>
    </main>
  );
}