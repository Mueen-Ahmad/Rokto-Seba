import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AlertCircle, Archive, Search } from 'lucide-react';
import EmergencyRequestCard, { BloodRequest } from '../components/EmergencyRequestCard';
import SearchableSelect from '../components/SearchableSelect';
import { DISTRICTS } from '../lib/locations';

export default function Archives() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');

  const allDistricts = Object.values(DISTRICTS).flat();

  useEffect(() => {
    fetchRequests();
  }, [bloodGroup, district]);

  async function fetchRequests() {
    setLoading(true);
    try {
      const isConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (isConfigured) {
        let query = supabase
          .from('blood_requests')
          .select(`
            *,
            comments:request_comments(*)
          `)
          .order('created_at', { ascending: false });

        if (bloodGroup) query = query.eq('blood_group', bloodGroup);
        if (district) query = query.eq('district', district);

        const { data, error } = await query;

        if (error) throw error;
        setRequests(data || []);
      } else {
        // Fallback to local storage for demo
        const localData = localStorage.getItem('demo_blood_requests');
        if (localData) {
          let parsed = JSON.parse(localData);
          if (bloodGroup) parsed = parsed.filter((r: any) => r.blood_group === bloodGroup);
          if (district) parsed = parsed.filter((r: any) => r.district === district);
          setRequests(parsed);
        }
      }
    } catch (err) {
      console.error('Error fetching archives:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
          <Archive className="h-8 w-8 text-brand" />
          অনুরোধের আর্কাইভ (Request Archives)
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">সকল রক্তদানের অনুরোধের তালিকা এখানে পাওয়া যাবে।</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">রক্তের গ্রুপ</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white p-2.5 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
          >
            <option value="">সকল গ্রুপ</option>
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
        <SearchableSelect
          label="জেলা"
          options={allDistricts}
          value={district}
          onChange={setDistrict}
          placeholder="জেলা নির্বাচন করুন"
        />
        <div className="flex items-end">
          <button 
            onClick={() => {setBloodGroup(''); setDistrict('');}}
            className="w-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 py-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors font-bold"
          >
            রিসেট (Reset)
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand"></div>
        </div>
      ) : requests.length > 0 ? (
        <div className="space-y-6">
          {requests.map(request => (
            <EmergencyRequestCard 
              key={request.id} 
              request={request} 
              onCommentAdded={fetchRequests} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
          <AlertCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">আর্কাইভে কোনো অনুরোধ পাওয়া যায়নি।</p>
        </div>
      )}
    </div>
  );
}
