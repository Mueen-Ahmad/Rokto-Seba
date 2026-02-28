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
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error("Supabase credentials missing.");
      }

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
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-red-50">
        <div className="bg-red-600 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Emergency Blood Request</h2>
          </div>
          <p className="mt-2 text-red-100">Post a request to find immediate help from our community.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {message && (
            <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input
                required
                type="text"
                placeholder="Patient Name"
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-red-500 focus:border-red-500"
                value={formData.patient_name}
                onChange={e => setFormData({...formData, patient_name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group Needed</label>
                <select
                  required
                  className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-red-500 focus:border-red-500"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Units Required</label>
                <input
                  required
                  type="number"
                  min="1"
                  className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-red-500 focus:border-red-500"
                  value={formData.units_required}
                  onChange={e => setFormData({...formData, units_required: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name & Address</label>
              <input
                required
                type="text"
                placeholder="e.g. Dhaka Medical College, Ward 5"
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-red-500 focus:border-red-500"
                value={formData.hospital_details}
                onChange={e => setFormData({...formData, hospital_details: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SearchableSelect
                label="District"
                options={allDistricts}
                value={formData.district}
                onChange={(val) => setFormData({...formData, district: val})}
                placeholder="Select option..."
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  required
                  type="tel"
                  placeholder="017..."
                  className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-red-500 focus:border-red-500"
                  value={formData.contact_number}
                  onChange={e => setFormData({...formData, contact_number: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="critical"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                checked={formData.is_critical}
                onChange={e => setFormData({...formData, is_critical: e.target.checked})}
              />
              <label htmlFor="critical" className="text-sm font-medium text-red-600">
                Critical / Emergency Request
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
