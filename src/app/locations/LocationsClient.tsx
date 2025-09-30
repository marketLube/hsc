"use client";

import { useState } from 'react';
import { MapPin, Truck, Clock, Phone, Mail, Search, Filter } from 'lucide-react';
import { Container } from '@/components/Container';
import { FloatingNav } from '@/components/FloatingNav';

interface Location {
  id: string;
  city: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  population: string;
  deliveryTime: string;
  isMetro: boolean;
  pincode: string[];
  landmarks: string[];
}

const locations: Location[] = [
  {
    id: 'mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'West',
    population: '12.4M',
    deliveryTime: '1-2 days',
    isMetro: true,
    pincode: ['400001', '400002', '400003', '400004', '400005'],
    landmarks: ['Bandra', 'Andheri', 'Powai', 'Thane', 'Navi Mumbai']
  },
  {
    id: 'delhi',
    city: 'Delhi',
    state: 'Delhi',
    region: 'North',
    population: '11.0M',
    deliveryTime: '1-2 days',
    isMetro: true,
    pincode: ['110001', '110002', '110003', '110004', '110005'],
    landmarks: ['Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Dwarka', 'Rohini']
  },
  {
    id: 'bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    region: 'South',
    population: '8.4M',
    deliveryTime: '1-2 days',
    isMetro: true,
    pincode: ['560001', '560002', '560003', '560004', '560005'],
    landmarks: ['Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'HSR Layout']
  },
  {
    id: 'chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    population: '7.0M',
    deliveryTime: '2-3 days',
    isMetro: true,
    pincode: ['600001', '600002', '600003', '600004', '600005'],
    landmarks: ['T. Nagar', 'Anna Nagar', 'Velachery', 'OMR', 'Adyar']
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    region: 'South',
    population: '6.9M',
    deliveryTime: '2-3 days',
    isMetro: true,
    pincode: ['500001', '500002', '500003', '500004', '500005'],
    landmarks: ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Hitech City', 'Kondapur']
  },
  {
    id: 'pune',
    city: 'Pune',
    state: 'Maharashtra',
    region: 'West',
    population: '3.1M',
    deliveryTime: '2-3 days',
    isMetro: false,
    pincode: ['411001', '411002', '411003', '411004', '411005'],
    landmarks: ['Koregaon Park', 'Baner', 'Wakad', 'Hinjewadi', 'Kothrud']
  },
  {
    id: 'kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    population: '4.5M',
    deliveryTime: '3-4 days',
    isMetro: true,
    pincode: ['700001', '700002', '700003', '700004', '700005'],
    landmarks: ['Park Street', 'Salt Lake', 'Ballygunge', 'Howrah', 'New Town']
  },
  {
    id: 'ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    region: 'West',
    population: '5.6M',
    deliveryTime: '3-4 days',
    isMetro: false,
    pincode: ['380001', '380002', '380003', '380004', '380005'],
    landmarks: ['Satellite', 'Vastrapur', 'Bopal', 'Prahlad Nagar', 'SG Highway']
  },
  {
    id: 'jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    region: 'North',
    population: '3.1M',
    deliveryTime: '3-4 days',
    isMetro: false,
    pincode: ['302001', '302002', '302003', '302004', '302005'],
    landmarks: ['C-Scheme', 'Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'Tonk Road']
  },
  {
    id: 'lucknow',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'North',
    population: '2.8M',
    deliveryTime: '4-5 days',
    isMetro: false,
    pincode: ['226001', '226002', '226003', '226004', '226005'],
    landmarks: ['Hazratganj', 'Gomti Nagar', 'Indira Nagar', 'Aliganj', 'Alambagh']
  },
  {
    id: 'kochi',
    city: 'Kochi',
    state: 'Kerala',
    region: 'South',
    population: '2.1M',
    deliveryTime: '4-5 days',
    isMetro: false,
    pincode: ['682001', '682002', '682003', '682004', '682005'],
    landmarks: ['Marine Drive', 'Kakkanad', 'Edapally', 'Panampilly Nagar', 'Vyttila']
  },
  {
    id: 'gurgaon',
    city: 'Gurgaon',
    state: 'Haryana',
    region: 'North',
    population: '1.1M',
    deliveryTime: '2-3 days',
    isMetro: false,
    pincode: ['122001', '122002', '122003', '122004', '122005'],
    landmarks: ['Cyber City', 'DLF Phase 1', 'Sector 14', 'Golf Course Road', 'Sohna Road']
  }
];

const regions = ['All Regions', 'North', 'South', 'East', 'West', 'Central'];

export default function LocationsClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [showMetroOnly, setShowMetroOnly] = useState(false);

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.landmarks.some(landmark => landmark.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = selectedRegion === 'All Regions' || location.region === selectedRegion;
    const matchesMetro = !showMetroOnly || location.isMetro;
    return matchesSearch && matchesRegion && matchesMetro;
  });

  const getDeliveryBadgeColor = (deliveryTime: string) => {
    if (deliveryTime.includes('1-2')) return 'bg-green-100 text-green-800';
    if (deliveryTime.includes('2-3')) return 'bg-blue-100 text-blue-800';
    if (deliveryTime.includes('3-4')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  return (
    <>
      <FloatingNav />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20">
        <Container>
          {/* Header Section */}
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Available Nationwide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stevia Sweeteners Available{' '}
              <span className="text-blue-600">Across India</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium stevia products delivered to your doorstep in major Indian cities. 
              Free shipping nationwide with express delivery in metro cities.
            </p>
          </div>

          {/* Delivery Info Banner */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white mb-12">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Truck className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-green-100">On all orders above ₹299 across India</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Express Delivery</h3>
                <p className="text-green-100">1-2 days in metro cities, 3-5 days elsewhere</p>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-green-100">Customer service available round the clock</p>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by city, state, or area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              
              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>

              {/* Metro Filter */}
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={showMetroOnly}
                  onChange={(e) => setShowMetroOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Metro Cities Only</span>
              </label>
            </div>
          </div>

          {/* Locations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {location.city}
                    </h3>
                    <p className="text-gray-600">{location.state}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeliveryBadgeColor(location.deliveryTime)}`}>
                      {location.deliveryTime}
                    </span>
                    {location.isMetro && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        Metro
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{location.region} India • Pop: {location.population}</span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Popular Areas:</p>
                    <div className="flex flex-wrap gap-1">
                      {location.landmarks.slice(0, 3).map((landmark) => (
                        <span
                          key={landmark}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {landmark}
                        </span>
                      ))}
                      {location.landmarks.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{location.landmarks.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">PIN Codes:</p>
                    <div className="flex flex-wrap gap-1">
                      {location.pincode.slice(0, 3).map((pin) => (
                        <span
                          key={pin}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded font-mono"
                        >
                          {pin}
                        </span>
                      ))}
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        +more
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    Check Delivery to {location.city}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredLocations.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No locations found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters.</p>
            </div>
          )}

          {/* Contact Section */}
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Don't See Your City?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                We're expanding rapidly across India. Contact us to check delivery availability in your area 
                or to become a local distributor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
                <a
                  href="tel:+91-98765-43210"
                  className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call +91-98765-43210
                </a>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
