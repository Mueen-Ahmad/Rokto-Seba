import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Heart, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DIVISIONS, DISTRICTS } from '../lib/locations';
import SearchableSelect from '../components/SearchableSelect';
import LocationPicker from '../components/LocationPicker';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    blood_group: '',
    division: '',
    district: '',
    phone: '',
    last_donation_date: '',
    latitude: null as number | null,
    longitude: null as number | null
  });
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const availableDistricts = formData.division ? DISTRICTS[formData.division] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error("Supabase credentials missing. Cannot save to database.");
      }

      const { error } = await supabase
        .from('donors')
        .insert([{
          ...formData,
          age: parseInt(formData.age), // Ensure age is sent as a number
          last_donation_date: formData.last_donation_date || null // Send null if empty
        }]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'নিবন্ধন সফল হয়েছে! (Registration Successful)' });
      setFormData({ 
        name: '', 
        age: '', 
        blood_group: '', 
        division: '', 
        district: '', 
        phone: '', 
        last_donation_date: '',
        latitude: null,
        longitude: null
      });
      setShowMap(false);
    } catch (error: any) {
      console.error('Error:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="bg-brand px-8 py-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <Heart className="h-8 w-8 fill-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">রক্তদাতা হিসেবে নিবন্ধন করুন</h2>
              <p className="mt-1 text-red-100 font-medium opacity-80">আপনার রক্তে বাঁচতে পারে একটি প্রাণ</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
          {message && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-100 dark:border-green-900/30' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border border-red-100 dark:border-red-900/30'
            }`}>
              <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="font-bold text-sm">{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">নাম (Name)</label>
              <input
                required
                type="text"
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="আপনার নাম লিখুন"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">বয়স (Age)</label>
              <input
                required
                type="number"
                min="18"
                max="65"
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
                placeholder="উদা: ২৫"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">রক্তের গ্রুপ (Blood Group)</label>
              <select
                required
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                value={formData.blood_group}
                onChange={e => setFormData({...formData, blood_group: e.target.value})}
              >
                <option value="">নির্বাচন করুন</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">ফোন নম্বর (Phone)</label>
              <input
                required
                type="tel"
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="০১XXXXXXXXX"
              />
            </div>

            <SearchableSelect
              label="বিভাগ (Division)"
              options={DIVISIONS}
              value={formData.division}
              onChange={(val) => setFormData({...formData, division: val, district: ''})}
              placeholder="বিভাগ নির্বাচন করুন"
            />

            <SearchableSelect
              label="জেলা (District)"
              options={availableDistricts}
              value={formData.district}
              onChange={(val) => setFormData({...formData, district: val})}
              placeholder="জেলা নির্বাচন করুন"
              disabled={!formData.division}
            />

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">সর্বশেষ রক্তদানের তারিখ (ঐচ্ছিক)</label>
              <input
                type="date"
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                value={formData.last_donation_date}
                onChange={e => setFormData({...formData, last_donation_date: e.target.value})}
              />
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">আপনার এলাকার লোকেশন (ঐচ্ছিক)</label>
                <button 
                  type="button"
                  onClick={() => setShowMap(!showMap)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                    showMap 
                      ? 'bg-brand text-white' 
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {showMap ? 'ম্যাপ বন্ধ করুন' : 'ম্যাপে লোকেশন সেট করুন'}
                </button>
              </div>
              
              {showMap && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-brand" />
                    ম্যাপে আপনার এলাকার উপর ক্লিক করে লোকেশন পিন করুন।
                  </p>
                  <LocationPicker 
                    onLocationSelect={(lat, lng) => setFormData({...formData, latitude: lat, longitude: lng})}
                  />
                  {formData.latitude && (
                    <div className="mt-2 text-[10px] text-brand font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      লোকেশন সেট করা হয়েছে: {formData.latitude.toFixed(4)}, {formData.longitude?.toFixed(4)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg shadow-xl shadow-brand/20"
            >
              {loading ? 'অপেক্ষা করুন...' : 'নিবন্ধন সম্পন্ন করুন (Submit)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
