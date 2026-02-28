import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, MapPin, Droplet, Phone, Calendar, User, AlertCircle } from 'lucide-react';
import { DIVISIONS, DISTRICTS } from '../lib/locations';
import SearchableSelect from '../components/SearchableSelect';

interface Donor {
  id: number;
  name: string;
  blood_group: string;
  division: string;
  district: string;
  phone: string;
  last_donation_date: string;
  age: number;
}

// Mock data to show if Supabase is not connected
const MOCK_DONORS: Donor[] = [
  { id: 1, name: "Rahim Uddin", age: 25, blood_group: "A+", division: "Dhaka", district: "Dhaka", phone: "01700000000", last_donation_date: "2023-10-15" },
  { id: 2, name: "Karim Hasan", age: 30, blood_group: "O+", division: "Chattogram", district: "Chattogram", phone: "01800000000", last_donation_date: "2024-01-20" },
  { id: 3, name: "Sultana Razia", age: 22, blood_group: "B-", division: "Sylhet", district: "Sylhet", phone: "01900000000", last_donation_date: "2023-12-05" },
  { id: 4, name: "Jabbar Ali", age: 28, blood_group: "AB+", division: "Rajshahi", district: "Rajshahi", phone: "01600000000", last_donation_date: "2024-02-10" },
  { id: 5, name: "Mina Akter", age: 24, blood_group: "O-", division: "Dhaka", district: "Gazipur", phone: "01500000000", last_donation_date: "2023-11-30" },
];

export default function DonorList() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [bloodGroup, setBloodGroup] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  const availableDistricts = division ? DISTRICTS[division] : [];

  useEffect(() => {
    fetchDonors();
  }, [bloodGroup, division, district]);

  // Reset district when division changes
  useEffect(() => {
    if (division && !availableDistricts.includes(district)) {
      setDistrict('');
    }
  }, [division]);

  async function fetchDonors() {
    setLoading(true);
    try {
      // Check if credentials exist
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error("Missing credentials");
      }

      let query = supabase.from('donors').select('*');

      if (bloodGroup) {
        query = query.eq('blood_group', bloodGroup);
      }
      if (division) {
        query = query.eq('division', division);
      }
      if (district) {
        query = query.eq('district', district);
      }

      const { data, error } = await query;

      if (error) throw error;
      setDonors(data || []);
      setIsConnected(true);
    } catch (error) {
      console.error('Error fetching donors:', error);
      // Fallback to mock data if connection fails or keys missing
      setIsConnected(false);
      let filtered = MOCK_DONORS;
      if (bloodGroup) filtered = filtered.filter(d => d.blood_group === bloodGroup);
      if (division) filtered = filtered.filter(d => d.division === division);
      if (district) filtered = filtered.filter(d => d.district === district);
      setDonors(filtered);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white sm:text-5xl">রক্তদাতা খুঁজুন (Find Donors)</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 font-medium">
          আপনার প্রয়োজনীয় রক্তের গ্রুপ এবং এলাকা নির্বাচন করুন
        </p>
        {!isConnected && (
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-2xl inline-block text-left">
            <p className="text-yellow-800 dark:text-yellow-400 text-sm font-bold flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Supabase Not Connected
            </p>
            <p className="text-yellow-700 dark:text-yellow-500 text-xs mt-1">
              Showing mock data. To connect real database, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
            </p>
          </div>
        )}
      </div>

      {/* Search Filters */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl mb-12 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">রক্তের গ্রুপ (Blood Group)</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
            >
              <option value="">সকল গ্রুপ (All)</option>
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
            label="বিভাগ (Division)"
            options={DIVISIONS}
            value={division}
            onChange={setDivision}
            placeholder="বিভাগ নির্বাচন করুন"
          />

          <SearchableSelect
            label="জেলা (District)"
            options={availableDistricts}
            value={district}
            onChange={setDistrict}
            placeholder="জেলা নির্বাচন করুন"
            disabled={!division}
          />

          <div className="flex items-end">
            <button
              onClick={fetchDonors}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3"
            >
              <Search className="h-5 w-5" />
              খুঁজুন (Search)
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donors.map((donor) => (
            <div key={donor.id} className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-light dark:bg-brand/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand transition-colors">{donor.name}</h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1.5 text-brand" />
                        {donor.district}, {donor.division}
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-brand text-white font-black text-lg shadow-lg shadow-brand/20">
                    {donor.blood_group}
                  </div>
                </div>
                
                <div className="space-y-4 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm font-semibold">
                    <User className="h-4 w-4 mr-3 text-brand" />
                    বয়স: {donor.age || 'N/A'} বছর
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm font-semibold">
                    <Phone className="h-4 w-4 mr-3 text-brand" />
                    {donor.phone}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm font-semibold">
                    <Calendar className="h-4 w-4 mr-3 text-brand" />
                    শেষ রক্তদান: {donor.last_donation_date || 'N/A'}
                  </div>
                </div>

                <div className="mt-8">
                  <a 
                    href={`tel:${donor.phone}`}
                    className="w-full btn-secondary flex items-center justify-center gap-2 py-3"
                  >
                    <Phone className="h-4 w-4" />
                    যোগাযোগ করুন
                  </a>
                </div>
              </div>
            </div>
          ))}
          
          {donors.length === 0 && (
            <div className="col-span-full text-center py-24 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="bg-gray-50 dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplet className="h-10 w-10 text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">কোনো রক্তদাতা পাওয়া যায়নি</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium">অন্য কোনো এলাকা বা গ্রুপ দিয়ে চেষ্টা করুন</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
