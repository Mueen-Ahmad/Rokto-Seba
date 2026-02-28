import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AlertCircle, Heart } from 'lucide-react';
import { DIVISIONS, DISTRICTS } from '../lib/locations';
import SearchableSelect from '../components/SearchableSelect';
import { useNavigate } from 'react-router-dom';

export default function EmergencyRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient_name: '',
    blood_group: '',
    units_required: '1',
    hospital_details: '',
    division: '',
    district: '',
    contact_number: '',
    is_critical: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const allDistricts = Object.values(DISTRICTS).flat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const isConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (isConfigured) {
        const { error } = await supabase
          .from('blood_requests')
          .insert([{
            patient_name: formData.patient_name,
            blood_group: formData.blood_group,
            units_required: parseInt(formData.units_required),
            hospital_details: formData.hospital_details,
            district: formData.district,
            contact_number: formData.contact_number,
            is_critical: formData.is_critical
          }]);

        if (error) throw error;
      } else {
        // Demo Mode: Save to local storage
        const newRequest = {
          id: Date.now(),
          ...formData,
          units_required: parseInt(formData.units_required),
          created_at: new Date().toISOString(),
          comments: []
        };
        const existing = JSON.parse(localStorage.getItem('demo_blood_requests') || '[]');
        localStorage.setItem('demo_blood_requests', JSON.stringify([newRequest, ...existing].slice(0, 10)));
        
        setMessage({ type: 'success', text: 'Demo Mode: Request saved locally! (Set Supabase keys for real DB)' });
        setTimeout(() => navigate('/'), 1500);
        return;
      }

      setMessage({ type: 'success', text: 'Request posted successfully!' });
      setTimeout(() => navigate('/'), 1500);
    } catch (error: any) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to post request.' });
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
              <AlertCircle className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Emergency Blood Request</h2>
              <p className="mt-1 text-red-100 font-medium opacity-80">Post a request to find immediate help from our community.</p>
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

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Patient Name</label>
              <input
                required
                type="text"
                placeholder="Patient Name"
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                value={formData.patient_name}
                onChange={e => setFormData({...formData, patient_name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Blood Group Needed</label>
                <select
                  required
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                  value={formData.blood_group}
                  onChange={e => setFormData({...formData, blood_group: e.target.value})}
                >
                  <option value="">Select option...</option>
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
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Units Required</label>
                <input
                  required
                  type="number"
                  min="1"
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                  value={formData.units_required}
                  onChange={e => setFormData({...formData, units_required: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Hospital Name & Address</label>
              <input
                required
                type="text"
                placeholder="e.g. Dhaka Medical College, Ward 5"
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                value={formData.hospital_details}
                onChange={e => setFormData({...formData, hospital_details: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SearchableSelect
                label="District"
                options={allDistricts}
                value={formData.district}
                onChange={(val) => setFormData({...formData, district: val})}
                placeholder="Select option..."
              />
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Contact Number</label>
                <input
                  required
                  type="tel"
                  placeholder="017..."
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                  value={formData.contact_number}
                  onChange={e => setFormData({...formData, contact_number: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
              <input
                type="checkbox"
                id="critical"
                className="h-5 w-5 text-brand focus:ring-brand border-gray-300 rounded-lg"
                checked={formData.is_critical}
                onChange={e => setFormData({...formData, is_critical: e.target.checked})}
              />
              <label htmlFor="critical" className="text-sm font-bold text-brand cursor-pointer select-none">
                Critical / Emergency Request
              </label>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg shadow-xl shadow-brand/20"
            >
              {loading ? 'Posting...' : 'Post Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
