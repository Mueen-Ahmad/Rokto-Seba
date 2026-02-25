import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Heart } from 'lucide-react';
import { DIVISIONS, DISTRICTS } from '../lib/locations';
import SearchableSelect from '../components/SearchableSelect';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    blood_group: '',
    division: '',
    district: '',
    phone: '',
    last_donation_date: ''
  });
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
        last_donation_date: '' 
      });
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
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-red-600 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 fill-white" />
            <h2 className="text-2xl font-bold">রক্তদাতা হিসেবে নিবন্ধন করুন</h2>
          </div>
          <p className="mt-2 text-red-100">আপনার রক্তে বাঁচতে পারে একটি প্রাণ</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {message && (
            <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">নাম (Name)</label>
              <input
                required
                type="text"
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-red-500 focus:border-red-500"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">বয়স (Age)</label>
              <input
                required
                type="number"
                min="18"
                max="65"
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-red-500 focus:border-red-500"
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
                placeholder="Ex: 25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">রক্তের গ্রুপ (Blood Group)</label>
              <select
                required
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-red-500 focus:border-red-500"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ফোন নম্বর (Phone)</label>
              <input
                required
                type="tel"
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-red-500 focus:border-red-500"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">সর্বশেষ রক্তদানের তারিখ (ঐচ্ছিক / Optional)</label>
              <input
                type="date"
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-red-500 focus:border-red-500"
                value={formData.last_donation_date}
                onChange={e => setFormData({...formData, last_donation_date: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'অপেক্ষা করুন...' : 'নিবন্ধন সম্পন্ন করুন (Submit)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
