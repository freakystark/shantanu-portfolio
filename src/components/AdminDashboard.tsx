import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Music, Calendar, Image as ImageIcon, LayoutDashboard, LogOut, Plus, Trash2, 
  Upload, Loader2, X, LogIn, Search, Check, ChevronDown, Clock, MapPin, 
  AlertCircle, Info, Phone
} from 'lucide-react';
import { auth, db, storage } from '../firebase';
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { 
  collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// Indian Cities List
const INDIAN_CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", 
  "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", 
  "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", 
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", 
  "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", 
  "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", 
  "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh", 
  "Guwahati", "Solapur", "Hubli-Dharwad"
];

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const Footer = () => (
  <footer className="py-20 px-6 border-t border-piano-ebony/5 text-center bg-piano-ivory">
    <div className="mb-10">
      <div className="text-5xl md:text-5xl font-serif tracking-tighter uppercase leading-none mb-2">
        THE PIANO <span className="text-piano-gold">PROJECT</span>
      </div>
      <div className="font-cursive text-xl text-piano-gold">By Shantanu Jagirdar</div>
    </div>
    <p className="text-[10px] text-piano-ebony/40 uppercase tracking-[0.4em]">
      &copy; {new Date().getFullYear()} &bull; All Rights Reserved
    </p>
  </footer>
);

export const AdminDashboard = () => {
  const { user, isAdmin, isArtist, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'tracks' | 'gigs' | 'gallery'>('tracks');

  if (loading) return <div className="h-screen flex items-center justify-center bg-piano-ivory"><Loader2 className="animate-spin text-piano-gold" size={48} /></div>;
  
  if (!user || (!isAdmin && !isArtist)) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-piano-ivory px-6 text-center">
        <div className="max-w-md w-full p-10 bg-white rounded-3xl shadow-2xl border border-piano-gold/10">
          <div className="w-20 h-20 bg-piano-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-piano-gold">
            <LayoutDashboard size={40} />
          </div>
          <h1 className="text-3xl font-serif mb-4">Artist Login</h1>
          <p className="text-piano-ebony/60 mb-8 lowercase tracking-tight">Access restricted to authorized artists and admins.</p>
          <button 
            onClick={() => {
              signInWithPopup(auth, new GoogleAuthProvider())
                .catch(error => {
                  console.error("Login Error:", error.code, error.message);
                  alert(`Login failed: ${error.message}`);
                });
            }}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-piano-ebony text-piano-ivory rounded-xl font-medium hover:bg-piano-gold transition-all shadow-lg"
          >
            <LogIn size={20} />
            <span>Login with Google</span>
          </button>
          <div className="mt-8">
            <a href="/" className="text-xs uppercase tracking-widest text-piano-ebony/40 hover:text-piano-gold transition-colors">Return to Site</a>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => signOut(auth);

  return (
    <div className="min-h-screen bg-piano-ivory flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-2 uppercase tracking-tighter italic">Control <span className="text-piano-gold not-italic">Center</span></h1>
              <p className="text-piano-ebony/40 lowercase tracking-tight">Manage your music, shows, and gallery.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2 border border-piano-ebony/10 rounded-full hover:bg-piano-ebony hover:text-piano-ivory transition-all text-sm uppercase tracking-widest"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { id: 'tracks', label: 'Music', icon: Music, desc: 'Tracks & Tags' },
              { id: 'gigs', label: 'Shows', icon: Calendar, desc: 'Tour Dates' },
              { id: 'gallery', label: 'Gallery', icon: ImageIcon, desc: 'Visual Assets' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex flex-col items-start p-6 rounded-2xl transition-all text-left group",
                  activeTab === tab.id 
                    ? "bg-piano-gold text-piano-ebony shadow-2xl shadow-piano-gold/30 ring-1 ring-white/20" 
                    : "bg-white border border-piano-ebony/5 text-piano-ebony hover:border-piano-gold/50"
                )}
              >
                <div className={cn(
                  "p-3 rounded-xl mb-4 transition-colors",
                  activeTab === tab.id ? "bg-white/20" : "bg-piano-gold/10 text-piano-gold group-hover:bg-piano-gold group-hover:text-piano-ebony"
                )}>
                  <tab.icon size={24} />
                </div>
                <div className="font-serif text-lg leading-none mb-1 uppercase tracking-tight">{tab.label}</div>
                <div className={cn(
                  "text-[10px] uppercase tracking-widest",
                  activeTab === tab.id ? "text-piano-ebony/60" : "text-piano-ebony/30"
                )}>{tab.desc}</div>
              </button>
            ))}
          </div>

          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl border border-piano-gold/5"
          >
            {activeTab === 'tracks' && <TrackManager />}
            {activeTab === 'gigs' && <GigManager />}
            {activeTab === 'gallery' && <GalleryManager />}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const TrackManager = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [form, setForm] = useState({ title: '', type: 'Solo Piano', tag: 'none', duration: '', audioUrl: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'tracks'), orderBy('order', 'asc'));
    return onSnapshot(q, (snapshot) => {
      setTracks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset meta
    setForm(f => ({ ...f, title: file.name.replace(/\.[^/.]+$/, "") }));
    setIsUploading(true);
    setUploadProgress(0);

    // Audio Metadata Extraction
    const audio = new Audio(URL.createObjectURL(file));
    audio.addEventListener('loadedmetadata', () => {
      const min = Math.floor(audio.duration / 60);
      const sec = Math.floor(audio.duration % 60);
      setForm(f => ({ ...f, duration: `${min}:${sec.toString().padStart(2, '0')}` }));
    });

    const storageRef = ref(storage, `tracks/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      }, 
      (error) => {
        console.error("Storage Error:", error);
        alert(`Upload failed: ${error.message}. Please verify your Storage rules.`);
        setIsUploading(false);
      }, 
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setForm(f => ({ ...f, audioUrl: url }));
          setIsUploading(false);
        } catch (err: any) {
          console.error("URL retrieval error:", err);
          alert(`Failed to get download URL: ${err.message}`);
          setIsUploading(false);
        }
      }
    );
  };

  const currentOrder = tracks.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.audioUrl) return alert("Wait for the track to finish uploading.");
    
    setIsPublishing(true);
    try {
      await addDoc(collection(db, 'tracks'), {
        ...form,
        order: currentOrder,
        createdAt: serverTimestamp()
      });
      setForm({ title: '', type: 'Solo Piano', tag: 'none', duration: '', audioUrl: '' });
      setIsAdding(false);
      setUploadProgress(0);
    } catch (error) {
      console.error(error);
      alert("Failed to publish track.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center border-b border-piano-ebony/5 pb-8">
        <div>
          <h3 className="text-3xl font-serif">Music Library</h3>
          <p className="text-sm text-piano-ebony/40">Upload and arrange your sonic repertoire.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="w-12 h-12 flex items-center justify-center bg-piano-gold text-piano-ebony rounded-full hover:rotate-90 transition-transform shadow-lg"
        >
          {isAdding ? <X size={24} /> : <Plus size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit} 
            className="p-8 bg-piano-ivory rounded-2xl space-y-6 border border-piano-gold/20 overflow-hidden"
          >
            {/* Step 1: Upload */}
            {!form.audioUrl && !isUploading && (
              <div className="space-y-4">
                <label className="block text-center p-12 border-2 border-dashed border-piano-ebony/10 rounded-2xl hover:border-piano-gold transition-colors cursor-pointer group">
                  <input type="file" accept="audio/*" className="hidden" onChange={handleFileUpload} />
                  <Upload className="mx-auto mb-4 text-piano-ebony/20 group-hover:text-piano-gold transition-colors" size={48} />
                  <span className="text-sm font-medium text-piano-ebony/60 uppercase tracking-widest">Select MP3 to Start</span>
                </label>
              </div>
            )}

            {isUploading && (
              <div className="space-y-4 text-center py-8">
                <div className="w-full bg-piano-ebony/5 h-2 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} className="h-full bg-piano-gold" />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-piano-ebony/40">Uploading... {Math.round(uploadProgress)}%</p>
              </div>
            )}

            {form.audioUrl && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Track Name</label>
                    <input required className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 outline-none" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Arrangement Meta</label>
                    <select className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 bg-white" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                      <option>Solo Piano</option>
                      <option>Ambient Keys</option>
                      <option>Cinematic Piano</option>
                      <option>Jazz Fusion</option>
                      <option>Electronic Hybrid</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Tag (e.g. Most Liked)</label>
                    <select className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 bg-white" value={form.tag} onChange={e => setForm({...form, tag: e.target.value})}>
                      <option value="none">None</option>
                      <option>Most Liked</option>
                      <option>Newly Added</option>
                      <option>Must Listen</option>
                      <option>Fan Favorite</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Duration (Auto-detected)</label>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-piano-ebony/10 bg-piano-ebony/5 text-piano-ebony/40">
                      <Clock size={16} /> {form.duration}
                    </div>
                  </div>
                </div>
                <button disabled={isPublishing} className="w-full py-4 bg-piano-ebony text-piano-ivory rounded-xl font-bold uppercase tracking-widest text-xs">
                  {isPublishing ? <Loader2 className="animate-spin mx-auto" /> : "Confirm & Publish Track"}
                </button>
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {tracks.map((track) => (
          <div key={track.id} className="flex items-center justify-between p-6 bg-piano-ivory/20 rounded-2xl border border-piano-ebony/5 group">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-piano-gold/10 flex items-center justify-center text-piano-gold">
                <Music size={20} />
              </div>
              <div>
                <h4 className="font-serif text-lg leading-tight uppercase tracking-tight">{track.title}</h4>
                <div className="flex flex-wrap gap-2 items-center mt-1">
                  <p className="text-[10px] uppercase tracking-widest text-piano-ebony/40">{track.type} &bull; {track.duration}</p>
                  {track.tag && track.tag !== 'none' && (
                    <span className="text-[8px] bg-piano-gold/20 text-piano-gold px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                      {track.tag}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={() => deleteDoc(doc(db, 'tracks', track.id))} className="p-3 text-red-500/20 hover:text-red-500 transition-all">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const GigManager = () => {
  const [gigs, setGigs] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
  const [form, setForm] = useState({ date: '', venue: '', location: '', status: 'Tickets Available' });

  useEffect(() => {
    const q = query(collection(db, 'gigs'), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setGigs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const filteredCities = INDIAN_CITIES.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.location) return alert("Please select or enter a city.");
    
    // Formatting date to APR 15 style
    const dateObj = new Date(form.date);
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const formattedDate = `${months[dateObj.getMonth()]} ${dateObj.getDate().toString().padStart(2, '0')}`;

    try {
      await addDoc(collection(db, 'gigs'), {
        ...form,
        date: formattedDate,
        timestamp: serverTimestamp()
      });
      setForm({ date: '', venue: '', location: '', status: 'Tickets Available' });
      setCitySearch("");
      setIsAdding(false);
    } catch (err: any) {
      console.error("Firestore Error (Gigs):", err);
      alert(`Error adding show: ${err.message}. Check your Firestore rules.`);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center border-b border-piano-ebony/5 pb-8">
        <div>
          <h3 className="text-3xl font-serif">Gig Calendar</h3>
          <p className="text-sm text-piano-ebony/40">Schedule your upcoming performances.</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="w-12 h-12 flex items-center justify-center bg-piano-gold text-piano-ebony rounded-full hover:rotate-90 transition-transform shadow-lg">
          {isAdding ? <X size={24} /> : <Plus size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit} 
            className="p-8 bg-piano-ivory rounded-2xl space-y-6 border border-piano-gold/20 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Select Date</label>
                <input required type="date" className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 bg-white" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
              </div>
              <div className="relative space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">City</label>
                <div className="relative">
                  <input 
                    className="w-full px-5 py-3 pl-10 rounded-xl border border-piano-ebony/10 bg-white outline-none" 
                    placeholder="Search Mumbai, Pune..." 
                    value={citySearch || form.location} 
                    onFocus={() => setIsCityMenuOpen(true)}
                    onChange={e => {
                      setCitySearch(e.target.value);
                      setForm({...form, location: e.target.value});
                    }} 
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-piano-ebony/30" size={16} />
                </div>
                {isCityMenuOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-piano-ebony/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                    {filteredCities.map(city => (
                      <button 
                        key={city}
                        type="button"
                        onClick={() => {
                          setForm({...form, location: city});
                          setCitySearch(city);
                          setIsCityMenuOpen(false);
                        }}
                        className="w-full text-left px-5 py-3 hover:bg-piano-gold/10 transition-colors flex justify-between items-center"
                      >
                        {city} {form.location === city && <Check size={14} className="text-piano-gold" />}
                      </button>
                    ))}
                    {citySearch && !filteredCities.includes(citySearch) && (
                      <button 
                        type="button" 
                        onClick={() => setIsCityMenuOpen(false)}
                        className="w-full text-left px-5 py-3 text-piano-gold italic text-xs border-t border-piano-ebony/5"
                      >
                        Add "{citySearch}" as new city
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Venue Name</label>
                <input required className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 bg-white outline-none" placeholder="e.g. Ritz Carlton" value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Ticket Status</label>
                <select className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 bg-white outline-none" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  <option>Tickets Available</option>
                  <option>Sold Out</option>
                  <option>On Door Sales Only</option>
                  <option>Guest List Full</option>
                </select>
              </div>
            </div>
            <button className="w-full py-4 bg-piano-ebony text-piano-ivory rounded-xl font-bold uppercase tracking-widest text-xs">Publish Show</button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {gigs.map((gig) => (
          <div key={gig.id} className="flex items-center justify-between p-6 bg-piano-ivory/20 rounded-2xl border border-piano-ebony/5">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-piano-ebony/5 flex flex-col items-center justify-center">
                <span className="text-xs font-serif text-piano-gold leading-none">{gig.date.split(' ')[1]}</span>
                <span className="text-[8px] uppercase font-sans">{gig.date.split(' ')[0]}</span>
              </div>
              <div>
                <h4 className="font-serif text-lg leading-tight uppercase tracking-tight">{gig.venue}</h4>
                <p className="text-[10px] uppercase tracking-widest text-piano-ebony/40 mt-1">{gig.location} &bull; {gig.status}</p>
              </div>
            </div>
            <button onClick={() => deleteDoc(doc(db, 'gigs', gig.id))} className="p-3 text-red-500/20 hover:text-red-500 transition-all">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [form, setForm] = useState({ title: '', type: 'image', url: '' });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('order', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) return alert("File too large. Max 20MB.");
    
    setIsUploading(true);
    const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (error) => { 
        console.error("Gallery Storage Error:", error);
        alert(`Storage Error: ${error.message}`); 
        setIsUploading(false); 
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setForm(f => ({ ...f, url, type: file.type.startsWith('video') ? 'video' : 'image' }));
          setIsUploading(false);
        } catch (err: any) {
          console.error("Gallery URL error:", err);
          alert(`Error getting URL: ${err.message}`);
          setIsUploading(false);
        }
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url) return;
    try {
      await addDoc(collection(db, 'gallery'), {
        ...form,
        order: items.length,
        createdAt: serverTimestamp()
      });
      setForm({ title: '', type: 'image', url: '' });
      setIsAdding(false);
    } catch (err: any) {
      console.error("Firestore Error (Gallery):", err);
      alert(`Error adding asset: ${err.message}. Check Firestore rules.`);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center border-b border-piano-ebony/5 pb-8">
        <div>
          <h3 className="text-3xl font-serif">Visual Assets</h3>
          <p className="text-sm text-piano-ebony/40">Portfolio images and session reels.</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="w-12 h-12 flex items-center justify-center bg-piano-gold text-piano-ebony rounded-full hover:rotate-90 transition-transform shadow-lg">
          {isAdding ? <X size={24} /> : <Plus size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit} 
            className="p-8 bg-piano-ivory rounded-2xl space-y-6 border border-piano-gold/20 overflow-hidden"
          >
            <div className="bg-piano-gold/5 p-4 rounded-xl border border-piano-gold/20 flex gap-3 text-piano-ebony/60">
              <Info size={18} className="shrink-0 text-piano-gold" />
              <div className="text-[10px] uppercase tracking-widest leading-relaxed">
                <span className="font-bold">Image Constraints:</span> 4:5 (1080x1350px) or 1:1. PNG/JPG.<br/>
                <span className="font-bold">Video Constraints:</span> 9:16 or 16:9. MP4. Max 20MB.
              </div>
            </div>

            {!form.url && !isUploading && (
              <label className="block text-center p-12 border-2 border-dashed border-piano-ebony/10 rounded-2xl hover:border-piano-gold transition-colors cursor-pointer group">
                <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
                <Upload className="mx-auto mb-4 text-piano-ebony/20 group-hover:text-piano-gold" size={48} />
                <span className="text-sm font-medium uppercase tracking-widest text-piano-ebony/60 whitespace-nowrap">Upload Media Asset</span>
              </label>
            )}

            {isUploading && (
              <div className="w-full bg-piano-ebony/5 h-2 rounded-full overflow-hidden mt-4">
                <motion.div animate={{ width: `${uploadProgress}%` }} className="h-full bg-piano-gold" />
              </div>
            )}

            {form.url && (
              <div className="space-y-6">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-inner border border-piano-ebony/10">
                  {form.type === 'image' ? <img src={form.url} className="w-full h-full object-cover" /> : <video src={form.url} muted className="w-full h-full object-cover" />}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Caption/Title</label>
                  <input required className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 outline-none" placeholder="e.g. Session at Abbey Road" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                </div>
                <button className="w-full py-4 bg-piano-ebony text-piano-ivory rounded-xl font-bold uppercase tracking-widest text-xs">Add to Portfolio</button>
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden group shadow-lg border border-piano-ebony/5">
            <img src={item.url} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-piano-ebony/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-4">
              <p className="text-white text-[10px] text-center mb-4 uppercase tracking-wider">{item.title}</p>
              <button onClick={() => deleteDoc(doc(db, 'gallery', item.id))} className="w-10 h-10 rounded-full bg-red-500/20 text-red-100 items-center justify-center flex hover:bg-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   Music, Calendar, Image as ImageIcon, LayoutDashboard, LogOut, Plus, Trash2, 
//   Upload, Loader2, X, LogIn, Search, Check, ChevronDown, Clock, MapPin, 
//   AlertCircle, Info, Phone
// } from 'lucide-react';
// import { auth, db, storage } from '../firebase';
// import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { 
//   collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, serverTimestamp 
// } from 'firebase/firestore';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { cn } from '../lib/utils';
// import { motion, AnimatePresence } from 'motion/react';

// // Indian Cities List
// const INDIAN_CITIES = [
//   "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", 
//   "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", 
//   "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", 
//   "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", 
//   "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", 
//   "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", 
//   "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh", 
//   "Guwahati", "Solapur", "Hubli-Dharwad"
// ];

// const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
//   <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
//   </svg>
// );

// const Footer = () => (
//   <footer className="py-20 px-6 border-t border-piano-ebony/5 text-center bg-piano-ivory">
//     <div className="mb-10">
//       <div className="text-4xl md:text-5xl font-serif tracking-tighter uppercase leading-none mb-2">
//         THE PIANO <span className="text-piano-gold">PROJECT</span>
//       </div>
//       <div className="font-cursive text-xl text-piano-gold">By Shantanu Jagirdar</div>
//     </div>
//     <p className="text-[10px] text-piano-ebony/40 uppercase tracking-[0.4em]">
//       &copy; {new Date().getFullYear()} &bull; All Rights Reserved
//     </p>
//   </footer>
// );

// export const AdminDashboard = () => {
//   const { user, isAdmin, isArtist, loading } = useAuth();
//   const [activeTab, setActiveTab] = useState<'tracks' | 'gigs' | 'gallery'>('tracks');

//   if (loading) return <div className="h-screen flex items-center justify-center bg-piano-ivory"><Loader2 className="animate-spin text-piano-gold" size={48} /></div>;
  
//   if (!user || (!isAdmin && !isArtist)) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-piano-ivory px-6 text-center">
//         <div className="max-w-md w-full p-10 bg-white rounded-3xl shadow-2xl border border-piano-gold/10">
//           <div className="w-20 h-20 bg-piano-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-piano-gold">
//             <LayoutDashboard size={40} />
//           </div>
//           <h1 className="text-3xl font-serif mb-4">Artist Login</h1>
//           <p className="text-piano-ebony/60 mb-8 lowercase tracking-tight">Access restricted to authorized artists and admins.</p>
//           <button 
//             onClick={() => {
//               signInWithPopup(auth, new GoogleAuthProvider())
//                 .catch(error => {
//                   console.error("Login Error:", error.code, error.message);
//                   alert(`Login failed: ${error.message}`);
//                 });
//             }}
//             className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-piano-ebony text-piano-ivory rounded-xl font-medium hover:bg-piano-gold transition-all shadow-lg"
//           >
//             <LogIn size={20} />
//             <span>Login with Google</span>
//           </button>
//           <div className="mt-8">
//             <a href="/" className="text-xs uppercase tracking-widest text-piano-ebony/40 hover:text-piano-gold transition-colors">Return to Site</a>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleLogout = () => signOut(auth);

//   return (
//     <div className="min-h-screen bg-piano-ivory flex flex-col">
//       <div className="flex-grow pt-32 pb-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
//             <div>
//               <h1 className="text-4xl md:text-5xl font-serif mb-2 uppercase tracking-tighter italic">Control <span className="text-piano-gold not-italic">Center</span></h1>
//               <p className="text-piano-ebony/40 lowercase tracking-tight">Manage your music, shows, and gallery.</p>
//             </div>
//             <button 
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-6 py-2 border border-piano-ebony/10 rounded-full hover:bg-piano-ebony hover:text-piano-ivory transition-all text-sm uppercase tracking-widest"
//             >
//               <LogOut size={16} />
//               <span>Logout</span>
//             </button>
//           </header>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
//             {[
//               { id: 'tracks', label: 'Music', icon: Music, desc: 'Tracks & Tags' },
//               { id: 'gigs', label: 'Shows', icon: Calendar, desc: 'Tour Dates' },
//               { id: 'gallery', label: 'Gallery', icon: ImageIcon, desc: 'Visual Assets' },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id as any)}
//                 className={cn(
//                   "flex flex-col items-start p-6 rounded-2xl transition-all text-left group",
//                   activeTab === tab.id 
//                     ? "bg-piano-gold text-piano-ebony shadow-2xl shadow-piano-gold/30 ring-1 ring-white/20" 
//                     : "bg-white border border-piano-ebony/5 text-piano-ebony hover:border-piano-gold/50"
//                 )}
//               >
//                 <div className={cn(
//                   "p-3 rounded-xl mb-4 transition-colors",
//                   activeTab === tab.id ? "bg-white/20" : "bg-piano-gold/10 text-piano-gold group-hover:bg-piano-gold group-hover:text-piano-ebony"
//                 )}>
//                   <tab.icon size={24} />
//                 </div>
//                 <div className="font-serif text-lg leading-none mb-1 uppercase tracking-tight">{tab.label}</div>
//                 <div className={cn(
//                   "text-[10px] uppercase tracking-widest",
//                   activeTab === tab.id ? "text-piano-ebony/60" : "text-piano-ebony/30"
//                 )}>{tab.desc}</div>
//               </button>
//             ))}
//           </div>

//           <motion.div 
//             key={activeTab}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl border border-piano-gold/5"
//           >
//             {activeTab === 'tracks' && <TrackManager />}
//             {activeTab === 'gigs' && <GigManager />}
//             {activeTab === 'gallery' && <GalleryManager />}
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// const TrackManager = () => {
//   const [tracks, setTracks] = useState<any[]>([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [form, setForm] = useState({ title: '', type: 'Solo Piano', tag: 'none', duration: '', audioUrl: '' });
//   const [isUploading, setIsUploading] = useState(false);
//   const [isPublishing, setIsPublishing] = useState(false);

//   useEffect(() => {
//     const q = query(collection(db, 'tracks'), orderBy('order', 'asc'));
//     return onSnapshot(q, (snapshot) => {
//       setTracks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });
//   }, []);

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Reset meta
//     setForm(f => ({ ...f, title: file.name.replace(/\.[^/.]+$/, "") }));
//     setIsUploading(true);
//     setUploadProgress(0);

//     // Audio Metadata Extraction
//     const audio = new Audio(URL.createObjectURL(file));
//     audio.addEventListener('loadedmetadata', () => {
//       const min = Math.floor(audio.duration / 60);
//       const sec = Math.floor(audio.duration % 60);
//       setForm(f => ({ ...f, duration: `${min}:${sec.toString().padStart(2, '0')}` }));
//     });

//     const storageRef = ref(storage, `tracks/${Date.now()}_${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on('state_changed', 
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       }, 
//       (error) => {
//         console.error("Storage Error:", error);
//         alert(`Upload failed: ${error.message}. Please verify your Storage rules.`);
//         setIsUploading(false);
//       }, 
//       async () => {
//         try {
//           const url = await getDownloadURL(uploadTask.snapshot.ref);
//           setForm(f => ({ ...f, audioUrl: url }));
//           setIsUploading(false);
//         } catch (err: any) {
//           console.error("URL retrieval error:", err);
//           alert(`Failed to get download URL: ${err.message}`);
//           setIsUploading(false);
//         }
//       }
//     );
//   };

//   const currentOrder = tracks.length;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.audioUrl) return alert("Wait for the track to finish uploading.");
    
//     setIsPublishing(true);
//     try {
//       await addDoc(collection(db, 'tracks'), {
//         ...form,
//         order: currentOrder,
//         createdAt: serverTimestamp()
//       });
//       setForm({ title: '', type: 'Solo Piano', tag: 'none', duration: '', audioUrl: '' });
//       setIsAdding(false);
//       setUploadProgress(0);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to publish track.");
//     } finally {
//       setIsPublishing(false);
//     }
//   };

//   return (
//     <div className="space-y-10">
//       <div className="flex justify-between items-center border-b border-piano-ebony/5 pb-8">
//         <div>
//           <h3 className="text-3xl font-serif">Music Library</h3>
//           <p className="text-sm text-piano-ebony/40">Upload and arrange your sonic repertoire.</p>
//         </div>
//         <button 
//           onClick={() => setIsAdding(!isAdding)}
//           className="w-12 h-12 flex items-center justify-center bg-piano-gold text-piano-ebony rounded-full hover:rotate-90 transition-transform shadow-lg"
//         >
//           {isAdding ? <X size={24} /> : <Plus size={24} />}
//         </button>
//       </div>

//       <AnimatePresence>
//         {isAdding && (
//           <motion.form 
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             onSubmit={handleSubmit} 
//             className="p-8 bg-piano-ivory rounded-2xl space-y-6 border border-piano-gold/20 overflow-hidden"
//           >
//             {/* Step 1: Upload */}
//             {!form.audioUrl && !isUploading && (
//               <div className="space-y-4">
//                 <label className="block text-center p-12 border-2 border-dashed border-piano-ebony/10 rounded-2xl hover:border-piano-gold transition-colors cursor-pointer group">
//                   <input type="file" accept="audio/*" className="hidden" onChange={handleFileUpload} />
//                   <Upload className="mx-auto mb-4 text-piano-ebony/20 group-hover:text-piano-gold transition-colors" size={48} />
//                   <span className="text-sm font-medium text-piano-ebony/60 uppercase tracking-widest">Select MP3 to Start</span>
//                 </label>
//               </div>
//             )}

//             {isUploading && (
//               <div className="space-y-4 text-center py-8">
//                 <div className="w-full bg-piano-ebony/5 h-2 rounded-full overflow-hidden">
//                   <motion.div initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} className="h-full bg-piano-gold" />
//                 </div>
//                 <p className="text-[10px] uppercase tracking-widest text-piano-ebony/40">Uploading... {Math.round(uploadProgress)}%</p>
//               </div>
//             )}

//             {form.audioUrl && (
//               <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Track Name</label>
//                     <input required className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 outline-none" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Arrangement Meta</label>
//                     <select className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 bg-white" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
//                       <option>Solo Piano</option>
//                       <option>Ambient Keys</option>
//                       <option>Cinematic Piano</option>
//                       <option>Jazz Fusion</option>
//                       <option>Electronic Hybrid</option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Tag (e.g. Most Liked)</label>
//                     <select className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 bg-white" value={form.tag} onChange={e => setForm({...form, tag: e.target.value})}>
//                       <option value="none">None</option>
//                       <option>Most Liked</option>
//                       <option>Newly Added</option>
//                       <option>Must Listen</option>
//                       <option>Fan Favorite</option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Duration (Auto-detected)</label>
//                     <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-piano-ebony/10 bg-piano-ebony/5 text-piano-ebony/40">
//                       <Clock size={16} /> {form.duration}
//                     </div>
//                   </div>
//                 </div>
//                 <button disabled={isPublishing} className="w-full py-4 bg-piano-ebony text-piano-ivory rounded-xl font-bold uppercase tracking-widest text-xs">
//                   {isPublishing ? <Loader2 className="animate-spin mx-auto" /> : "Confirm & Publish Track"}
//                 </button>
//               </div>
//             )}
//           </motion.form>
//         )}
//       </AnimatePresence>

//       <div className="grid grid-cols-1 gap-4">
//         {tracks.map((track) => (
//           <div key={track.id} className="flex items-center justify-between p-6 bg-piano-ivory/20 rounded-2xl border border-piano-ebony/5 group">
//             <div className="flex items-center gap-5">
//               <div className="w-12 h-12 rounded-full bg-piano-gold/10 flex items-center justify-center text-piano-gold">
//                 <Music size={20} />
//               </div>
//               <div>
//                 <h4 className="font-serif text-lg leading-tight uppercase tracking-tight">{track.title}</h4>
//                 <div className="flex flex-wrap gap-2 items-center mt-1">
//                   <p className="text-[10px] uppercase tracking-widest text-piano-ebony/40">{track.type} &bull; {track.duration}</p>
//                   {track.tag && track.tag !== 'none' && (
//                     <span className="text-[8px] bg-piano-gold/20 text-piano-gold px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">
//                       {track.tag}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <button onClick={() => deleteDoc(doc(db, 'tracks', track.id))} className="p-3 text-red-500/20 hover:text-red-500 transition-all">
//               <Trash2 size={20} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const GigManager = () => {
//   const [gigs, setGigs] = useState<any[]>([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const [citySearch, setCitySearch] = useState("");
//   const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
//   const [form, setForm] = useState({ date: '', venue: '', location: '', status: 'Tickets Available' });

//   useEffect(() => {
//     const q = query(collection(db, 'gigs'), orderBy('timestamp', 'desc'));
//     return onSnapshot(q, (snapshot) => {
//       setGigs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });
//   }, []);

//   const filteredCities = INDIAN_CITIES.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()));

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.location) return alert("Please select or enter a city.");
    
//     // Formatting date to APR 15 style
//     const dateObj = new Date(form.date);
//     const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//     const formattedDate = `${months[dateObj.getMonth()]} ${dateObj.getDate().toString().padStart(2, '0')}`;

//     try {
//       await addDoc(collection(db, 'gigs'), {
//         ...form,
//         date: formattedDate,
//         timestamp: serverTimestamp()
//       });
//       setForm({ date: '', venue: '', location: '', status: 'Tickets Available' });
//       setCitySearch("");
//       setIsAdding(false);
//     } catch (err: any) {
//       console.error("Firestore Error (Gigs):", err);
//       alert(`Error adding show: ${err.message}. Check your Firestore rules.`);
//     }
//   };

//   return (
//     <div className="space-y-10">
//       <div className="flex justify-between items-center border-b border-piano-ebony/5 pb-8">
//         <div>
//           <h3 className="text-3xl font-serif">Gig Calendar</h3>
//           <p className="text-sm text-piano-ebony/40">Schedule your upcoming performances.</p>
//         </div>
//         <button onClick={() => setIsAdding(!isAdding)} className="w-12 h-12 flex items-center justify-center bg-piano-gold text-piano-ebony rounded-full hover:rotate-90 transition-transform shadow-lg">
//           {isAdding ? <X size={24} /> : <Plus size={24} />}
//         </button>
//       </div>

//       <AnimatePresence>
//         {isAdding && (
//           <motion.form 
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             onSubmit={handleSubmit} 
//             className="p-8 bg-piano-ivory rounded-2xl space-y-6 border border-piano-gold/20 overflow-hidden"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Select Date</label>
//                 <input required type="date" className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 bg-white" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
//               </div>
//               <div className="relative space-y-2">
//                 <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">City</label>
//                 <div className="relative">
//                   <input 
//                     className="w-full px-5 py-3 pl-10 rounded-xl border border-piano-ebony/10 bg-white outline-none" 
//                     placeholder="Search Mumbai, Pune..." 
//                     value={citySearch || form.location} 
//                     onFocus={() => setIsCityMenuOpen(true)}
//                     onChange={e => {
//                       setCitySearch(e.target.value);
//                       setForm({...form, location: e.target.value});
//                     }} 
//                   />
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-piano-ebony/30" size={16} />
//                 </div>
//                 {isCityMenuOpen && (
//                   <div className="absolute z-20 w-full mt-1 bg-white border border-piano-ebony/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
//                     {filteredCities.map(city => (
//                       <button 
//                         key={city}
//                         type="button"
//                         onClick={() => {
//                           setForm({...form, location: city});
//                           setCitySearch(city);
//                           setIsCityMenuOpen(false);
//                         }}
//                         className="w-full text-left px-5 py-3 hover:bg-piano-gold/10 transition-colors flex justify-between items-center"
//                       >
//                         {city} {form.location === city && <Check size={14} className="text-piano-gold" />}
//                       </button>
//                     ))}
//                     {citySearch && !filteredCities.includes(citySearch) && (
//                       <button 
//                         type="button" 
//                         onClick={() => setIsCityMenuOpen(false)}
//                         className="w-full text-left px-5 py-3 text-piano-gold italic text-xs border-t border-piano-ebony/5"
//                       >
//                         Add "{citySearch}" as new city
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Venue Name</label>
//                 <input required className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 bg-white outline-none" placeholder="e.g. Ritz Carlton" value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Ticket Status</label>
//                 <select className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 bg-white outline-none" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
//                   <option>Tickets Available</option>
//                   <option>Sold Out</option>
//                   <option>On Door Sales Only</option>
//                   <option>Guest List Full</option>
//                 </select>
//               </div>
//             </div>
//             <button className="w-full py-4 bg-piano-ebony text-piano-ivory rounded-xl font-bold uppercase tracking-widest text-xs">Publish Show</button>
//           </motion.form>
//         )}
//       </AnimatePresence>

//       <div className="grid grid-cols-1 gap-4">
//         {gigs.map((gig) => (
//           <div key={gig.id} className="flex items-center justify-between p-6 bg-piano-ivory/20 rounded-2xl border border-piano-ebony/5">
//             <div className="flex items-center gap-5">
//               <div className="w-12 h-12 rounded-xl bg-piano-ebony/5 flex flex-col items-center justify-center">
//                 <span className="text-xs font-serif text-piano-gold leading-none">{gig.date.split(' ')[1]}</span>
//                 <span className="text-[8px] uppercase font-sans">{gig.date.split(' ')[0]}</span>
//               </div>
//               <div>
//                 <h4 className="font-serif text-lg leading-tight uppercase tracking-tight">{gig.venue}</h4>
//                 <p className="text-[10px] uppercase tracking-widest text-piano-ebony/40 mt-1">{gig.location} &bull; {gig.status}</p>
//               </div>
//             </div>
//             <button onClick={() => deleteDoc(doc(db, 'gigs', gig.id))} className="p-3 text-red-500/20 hover:text-red-500 transition-all">
//               <Trash2 size={20} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const GalleryManager = () => {
//   const [items, setItems] = useState<any[]>([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [form, setForm] = useState({ title: '', type: 'image', url: '' });
//   const [isUploading, setIsUploading] = useState(false);

//   useEffect(() => {
//     const q = query(collection(db, 'gallery'), orderBy('order', 'desc'));
//     return onSnapshot(q, (snapshot) => {
//       setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });
//   }, []);

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 20 * 1024 * 1024) return alert("File too large. Max 20MB.");
    
//     setIsUploading(true);
//     const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on('state_changed', 
//       (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
//       (error) => { 
//         console.error("Gallery Storage Error:", error);
//         alert(`Storage Error: ${error.message}`); 
//         setIsUploading(false); 
//       },
//       async () => {
//         try {
//           const url = await getDownloadURL(uploadTask.snapshot.ref);
//           setForm(f => ({ ...f, url, type: file.type.startsWith('video') ? 'video' : 'image' }));
//           setIsUploading(false);
//         } catch (err: any) {
//           console.error("Gallery URL error:", err);
//           alert(`Error getting URL: ${err.message}`);
//           setIsUploading(false);
//         }
//       }
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.url) return;
//     try {
//       await addDoc(collection(db, 'gallery'), {
//         ...form,
//         order: items.length,
//         createdAt: serverTimestamp()
//       });
//       setForm({ title: '', type: 'image', url: '' });
//       setIsAdding(false);
//     } catch (err: any) {
//       console.error("Firestore Error (Gallery):", err);
//       alert(`Error adding asset: ${err.message}. Check Firestore rules.`);
//     }
//   };

//   return (
//     <div className="space-y-10">
//       <div className="flex justify-between items-center border-b border-piano-ebony/5 pb-8">
//         <div>
//           <h3 className="text-3xl font-serif">Visual Assets</h3>
//           <p className="text-sm text-piano-ebony/40">Portfolio images and session reels.</p>
//         </div>
//         <button onClick={() => setIsAdding(!isAdding)} className="w-12 h-12 flex items-center justify-center bg-piano-gold text-piano-ebony rounded-full hover:rotate-90 transition-transform shadow-lg">
//           {isAdding ? <X size={24} /> : <Plus size={24} />}
//         </button>
//       </div>

//       <AnimatePresence>
//         {isAdding && (
//           <motion.form 
//             initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
//             onSubmit={handleSubmit} 
//             className="p-8 bg-piano-ivory rounded-2xl space-y-6 border border-piano-gold/20 overflow-hidden"
//           >
//             <div className="bg-piano-gold/5 p-4 rounded-xl border border-piano-gold/20 flex gap-3 text-piano-ebony/60">
//               <Info size={18} className="shrink-0 text-piano-gold" />
//               <div className="text-[10px] uppercase tracking-widest leading-relaxed">
//                 <span className="font-bold">Image Constraints:</span> 4:5 (1080x1350px) or 1:1. PNG/JPG.<br/>
//                 <span className="font-bold">Video Constraints:</span> 9:16 or 16:9. MP4. Max 20MB.
//               </div>
//             </div>

//             {!form.url && !isUploading && (
//               <label className="block text-center p-12 border-2 border-dashed border-piano-ebony/10 rounded-2xl hover:border-piano-gold transition-colors cursor-pointer group">
//                 <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
//                 <Upload className="mx-auto mb-4 text-piano-ebony/20 group-hover:text-piano-gold" size={48} />
//                 <span className="text-sm font-medium uppercase tracking-widest text-piano-ebony/60 whitespace-nowrap">Upload Media Asset</span>
//               </label>
//             )}

//             {isUploading && (
//               <div className="w-full bg-piano-ebony/5 h-2 rounded-full overflow-hidden mt-4">
//                 <motion.div animate={{ width: `${uploadProgress}%` }} className="h-full bg-piano-gold" />
//               </div>
//             )}

//             {form.url && (
//               <div className="space-y-6">
//                 <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-inner border border-piano-ebony/10">
//                   {form.type === 'image' ? <img src={form.url} className="w-full h-full object-cover" /> : <video src={form.url} muted className="w-full h-full object-cover" />}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[10px] uppercase tracking-widest text-piano-ebony/50 font-bold">Caption/Title</label>
//                   <input required className="w-full px-5 py-3 rounded-xl border border-piano-ebony/10 outline-none" placeholder="e.g. Session at Abbey Road" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
//                 </div>
//                 <button className="w-full py-4 bg-piano-ebony text-piano-ivory rounded-xl font-bold uppercase tracking-widest text-xs">Add to Portfolio</button>
//               </div>
//             )}
//           </motion.form>
//         )}
//       </AnimatePresence>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {items.map((item) => (
//           <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden group shadow-lg border border-piano-ebony/5">
//             <img src={item.url} className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-piano-ebony/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-4">
//               <p className="text-white text-[10px] text-center mb-4 uppercase tracking-wider">{item.title}</p>
//               <button onClick={() => deleteDoc(doc(db, 'gallery', item.id))} className="w-10 h-10 rounded-full bg-red-500/20 text-red-100 items-center justify-center flex hover:bg-red-500">
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
