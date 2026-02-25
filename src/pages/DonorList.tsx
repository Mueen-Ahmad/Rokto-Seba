import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, MapPin, Droplet, Phone, Calendar, User } from 'lucide-react';
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
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-sans">রক্তদাতা খুঁজুন (Find Donors)</h2>
        <p className="mt-4 text-lg text-gray-600">
          আপনার প্রয়োজনীয় রক্তের গ্রুপ এবং এলাকা নির্বাচন করুন
        </p>
        {!isConnected && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg inline-block text-left">
            <p className="text-yellow-800 text-sm font-medium">⚠️ Supabase Not Connected</p>
            <p className="text-yellow-700 text-xs mt-1">
              Showing mock data. To connect real database, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
            </p>
          </div>
        )}
      </div>

      {/* Search Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">রক্তের গ্রুপ (Blood Group)</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="block w-full rounded-lg border-gray-300 border p-2.5 focus:border-red-500 focus:ring-red-500"
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
              className="w-full bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              খুঁজুন (Search)
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div key={donor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{donor.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {donor.district}, {donor.division}
                    </div>
                  </div>
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-700 font-bold text-sm ring-2 ring-white">
                    {donor.blood_group}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 text-sm">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    Age: {donor.age || 'N/A'}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {donor.phone}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    Last Donation: {donor.last_donation_date || 'N/A'}
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-white border border-red-200 text-red-700 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                    যোগাযোগ করুন (Contact)
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {donors.length === 0 && (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <Droplet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">কোনো রক্তদাতা পাওয়া যায়নি</h3>
              <p className="text-gray-500">অন্য কোনো এলাকা বা গ্রুপ দিয়ে চেষ্টা করুন</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
