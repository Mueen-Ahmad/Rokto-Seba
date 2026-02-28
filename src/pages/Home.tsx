import { Link } from 'react-router-dom';
import { Heart, Users, Search, ArrowRight, AlertCircle, ShieldCheck, Zap, Map as MapIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import EmergencyRequestCard, { BloodRequest } from '../components/EmergencyRequestCard';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Donor {
  id: string;
  name: string;
  blood_group: string;
  district: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
    fetchDonors();
  }, []);

  async function fetchDonors() {
    try {
      const isConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (isConfigured) {
        const { data, error } = await supabase
          .from('donors')
          .select('id, name, blood_group, district, latitude, longitude')
          .not('latitude', 'is', null)
          .not('longitude', 'is', null);
        
        if (error) throw error;
        setDonors(data || []);
      }
    } catch (err) {
      console.error('Error fetching donors for map:', err);
    }
  }

  async function fetchRequests() {
    try {
      const isConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
      const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
      
      if (isConfigured) {
        const { data, error } = await supabase
          .from('blood_requests')
          .select(`
            *,
            comments:request_comments(*)
          `)
          .gte('created_at', fortyEightHoursAgo) // Only show requests from last 48 hours
          .order('created_at', { ascending: false })
          .limit(20); // Limit to 20 requests

        if (error) throw error;
        setRequests(data || []);
      } else {
        // Fallback to local storage for demo
        const localData = localStorage.getItem('demo_blood_requests');
        if (localData) {
          const parsed = JSON.parse(localData);
          // Filter local demo data for last 48 hours and limit to 20
          const filtered = parsed
            .filter((req: any) => new Date(req.created_at).getTime() > Date.now() - 48 * 60 * 60 * 1000)
            .slice(0, 20);
          setRequests(filtered);
        }
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand/5 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light dark:bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-6">
                <Zap className="h-3 w-3 fill-brand" />
                মানবতার সেবায় আমরা
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-8">
                আপনার রক্তে <br/> বাঁচতে পারে <span className="text-brand">একটি প্রাণ</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-lg leading-relaxed">
                রক্তদান একটি মহৎ কাজ। আমাদের প্ল্যাটফর্মের মাধ্যমে আপনি খুব সহজেই রক্তদাতা খুঁজে পেতে পারেন অথবা নিজে রক্তদাতা হিসেবে নিবন্ধিত হতে পারেন।
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/emergency" className="btn-primary flex items-center gap-2 px-8">
                  <AlertCircle className="h-5 w-5" />
                  জরুরী রক্ত প্রয়োজন
                </Link>
                <Link to="/donors" className="btn-secondary flex items-center gap-2 px-8">
                  <Search className="h-5 w-5" />
                  রক্তদাতা খুঁজুন
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`} 
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 ring-1 ring-gray-100 dark:ring-gray-700"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-gray-900 dark:text-white block">৫০০০+ নিবন্ধিত রক্তদাতা</span>
                  <span className="text-gray-500 dark:text-gray-400">আপনার এলাকায় সাহায্য করতে প্রস্তুত</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1000" 
                  alt="Blood Donation"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl card-shadow max-w-[200px] -rotate-3">
                <Heart className="h-8 w-8 text-brand fill-brand mb-3" />
                <p className="text-sm font-bold text-gray-900 dark:text-white">১ ব্যাগ রক্ত = ১টি জীবন</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">আপনার ক্ষুদ্র দান কারো জন্য বিশাল আশীর্বাদ।</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Requests Section */}
      <section className="py-24 bg-gray-50/50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <AlertCircle className="h-8 w-8 text-brand" />
              জরুরী অনুরোধসমূহ
            </h2>
            <p className="text-gray-600 dark:text-gray-400">বর্তমানে যাদের জরুরী ভিত্তিতে রক্তের প্রয়োজন</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand"></div>
            </div>
          ) : requests.length > 0 ? (
            <>
              <div className="space-y-6">
                {requests.map((request, idx) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <EmergencyRequestCard 
                      request={request} 
                      onCommentAdded={fetchRequests} 
                    />
                  </motion.div>
                ))}
              </div>
              <div className="pt-10 flex justify-center">
                <Link 
                  to="/archives" 
                  className="btn-secondary group flex items-center gap-2"
                >
                  আর্কাইভ দেখুন
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="bg-gray-50 dark:bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">বর্তমানে কোনো জরুরী অনুরোধ নেই।</p>
              <Link to="/emergency" className="btn-primary">অনুরোধ পোস্ট করুন</Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'নিবন্ধিত দাতা', value: '৫০০০+', icon: Users },
              { label: 'সফল রক্তদান', value: '১২০০+', icon: Heart },
              { label: 'জেলা কভারেজ', value: '৬৪', icon: Search },
              { label: 'সক্রিয় অনুরোধ', value: '১৫+', icon: AlertCircle },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="bg-brand-light dark:bg-brand/10 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-brand" />
                </div>
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donor Map Section */}
      <section className="py-24 bg-gray-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <MapIcon className="h-8 w-8 text-brand" />
              রক্তদাতাদের অবস্থান (Donor Map)
            </h2>
            <p className="text-gray-600 dark:text-gray-400">আপনার এলাকার রক্তদাতাদের ম্যাপে দেখুন</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700 h-[500px] relative z-10">
            <MapContainer 
              center={[23.6850, 90.3563]} 
              zoom={7} 
              scrollWheelZoom={false}
              className="h-full w-full rounded-3xl"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {donors.map((donor) => (
                <Marker key={donor.id} position={[donor.latitude, donor.longitude]}>
                  <Popup>
                    <div className="p-2 text-center">
                      <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-brand font-black text-xs">{donor.blood_group}</span>
                      </div>
                      <h4 className="font-bold text-gray-900">{donor.name}</h4>
                      <p className="text-[10px] text-gray-500">{donor.district}</p>
                      <Link 
                        to="/donors" 
                        className="mt-2 block text-[10px] font-bold text-brand hover:underline"
                      >
                        বিস্তারিত দেখুন
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">
            আপনি কি রক্তদাতা হিসেবে যুক্ত হতে চান?
          </h2>
          <p className="text-red-100 text-lg mb-12 max-w-2xl mx-auto">
            আপনার একটি সিদ্ধান্ত বাঁচাতে পারে একটি পরিবারকে। আজই আমাদের বিশাল কমিউনিটির অংশ হোন।
          </p>
          <Link to="/register" className="bg-white text-brand px-10 py-4 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all shadow-2xl active:scale-95 inline-flex items-center gap-3">
            নিবন্ধন করুন <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
