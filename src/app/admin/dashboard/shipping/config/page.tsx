"use client";

import { useState } from "react";
import { 
  Save,
  Plus,
  Trash2,
  Edit,
  Settings,
  Globe,
  MapPin,
  DollarSign,
  Truck,
  Package,
  Clock,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Upload,
  Copy,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Zap,
  Tag,
  CreditCard,
  Weight,
  Ruler,
  Calculator,
  Target,
  TrendingUp,
  BarChart3,
  Shield,
  Phone,
  Mail,
  Building2,
  User
} from "lucide-react";

type ShippingZoneType = "domestic" | "international";
type RateType = "flat" | "weight_based" | "distance_based" | "free";
type PackagingType = "box" | "envelope" | "tube" | "custom";

interface ShippingZone {
  id: string;
  name: string;
  type: ShippingZoneType;
  regions: string[];
  isActive: boolean;
}

interface ShippingRate {
  id: string;
  zoneName: string;
  type: RateType;
  baseRate: number;
  weightRanges?: {
    min: number;
    max: number;
    rate: number;
  }[];
  distanceRanges?: {
    min: number;
    max: number;
    rate: number;
  }[];
  freeShippingThreshold?: number;
  estimatedDays: string;
  isActive: boolean;
}

interface CODPincode {
  id: string;
  pincode: string;
  city: string;
  state: string;
  isActive: boolean;
  codCharge: number;
  maxCodAmount: number;
}

interface CourierPartner {
  id: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  apiKey?: string;
  minWeight: number;
  maxWeight: number;
  serviceTypes: string[];
}

interface PackagingOption {
  id: string;
  name: string;
  type: PackagingType;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  maxWeight: number;
  cost: number;
  isDefault: boolean;
}

// Mock Data
const mockZones: ShippingZone[] = [
  {
    id: "zone-1",
    name: "Local Delhi NCR",
    type: "domestic",
    regions: ["Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad"],
    isActive: true
  },
  {
    id: "zone-2",
    name: "Metro Cities",
    type: "domestic",
    regions: ["Mumbai", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Pune"],
    isActive: true
  },
  {
    id: "zone-3",
    name: "Rest of India",
    type: "domestic",
    regions: ["All other cities and towns"],
    isActive: true
  },
  {
    id: "zone-4",
    name: "International",
    type: "international",
    regions: ["USA", "UK", "UAE", "Singapore", "Australia"],
    isActive: false
  }
];

const mockRates: ShippingRate[] = [
  {
    id: "rate-1",
    zoneName: "Local Delhi NCR",
    type: "flat",
    baseRate: 40,
    freeShippingThreshold: 999,
    estimatedDays: "1-2",
    isActive: true
  },
  {
    id: "rate-2",
    zoneName: "Metro Cities",
    type: "weight_based",
    baseRate: 50,
    weightRanges: [
      { min: 0, max: 0.5, rate: 50 },
      { min: 0.5, max: 1, rate: 70 },
      { min: 1, max: 2, rate: 100 },
      { min: 2, max: 5, rate: 150 }
    ],
    freeShippingThreshold: 1499,
    estimatedDays: "2-3",
    isActive: true
  },
  {
    id: "rate-3",
    zoneName: "Rest of India",
    type: "weight_based",
    baseRate: 60,
    weightRanges: [
      { min: 0, max: 0.5, rate: 60 },
      { min: 0.5, max: 1, rate: 85 },
      { min: 1, max: 2, rate: 120 },
      { min: 2, max: 5, rate: 180 }
    ],
    freeShippingThreshold: 1999,
    estimatedDays: "3-5",
    isActive: true
  }
];

const mockCODPincodes: CODPincode[] = [
  { id: "cod-1", pincode: "110001", city: "Delhi", state: "Delhi", isActive: true, codCharge: 30, maxCodAmount: 50000 },
  { id: "cod-2", pincode: "110002", city: "Delhi", state: "Delhi", isActive: true, codCharge: 30, maxCodAmount: 50000 },
  { id: "cod-3", pincode: "400001", city: "Mumbai", state: "Maharashtra", isActive: true, codCharge: 40, maxCodAmount: 50000 },
  { id: "cod-4", pincode: "560001", city: "Bangalore", state: "Karnataka", isActive: true, codCharge: 40, maxCodAmount: 50000 },
  { id: "cod-5", pincode: "700001", city: "Kolkata", state: "West Bengal", isActive: true, codCharge: 40, maxCodAmount: 50000 }
];

const mockCouriers: CourierPartner[] = [
  {
    id: "courier-1",
    name: "Delhivery",
    isDefault: true,
    isActive: true,
    apiKey: "DELH_****_8392",
    minWeight: 0,
    maxWeight: 50,
    serviceTypes: ["Surface", "Express", "Overnight"]
  },
  {
    id: "courier-2",
    name: "Blue Dart",
    isDefault: false,
    isActive: true,
    apiKey: "BLUE_****_5621",
    minWeight: 0,
    maxWeight: 30,
    serviceTypes: ["Standard", "Priority", "Same Day"]
  },
  {
    id: "courier-3",
    name: "FedEx",
    isDefault: false,
    isActive: true,
    minWeight: 0,
    maxWeight: 100,
    serviceTypes: ["Economy", "Express", "International"]
  }
];

const mockPackaging: PackagingOption[] = [
  {
    id: "pkg-1",
    name: "Small Box",
    type: "box",
    dimensions: { length: 20, width: 15, height: 10 },
    maxWeight: 2,
    cost: 15,
    isDefault: true
  },
  {
    id: "pkg-2",
    name: "Medium Box",
    type: "box",
    dimensions: { length: 30, width: 25, height: 15 },
    maxWeight: 5,
    cost: 25,
    isDefault: false
  },
  {
    id: "pkg-3",
    name: "Large Box",
    type: "box",
    dimensions: { length: 40, width: 35, height: 25 },
    maxWeight: 10,
    cost: 40,
    isDefault: false
  },
  {
    id: "pkg-4",
    name: "Padded Envelope",
    type: "envelope",
    dimensions: { length: 25, width: 18, height: 2 },
    maxWeight: 0.5,
    cost: 10,
    isDefault: false
  }
];

export default function ShippingConfigPage() {
  const [activeTab, setActiveTab] = useState<"zones" | "rates" | "cod" | "couriers" | "packaging" | "general">("zones");
  const [zones] = useState<ShippingZone[]>(mockZones);
  const [rates] = useState<ShippingRate[]>(mockRates);
  const [codPincodes, setCodPincodes] = useState<CODPincode[]>(mockCODPincodes);
  const [couriers] = useState<CourierPartner[]>(mockCouriers);
  const [packaging] = useState<PackagingOption[]>(mockPackaging);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    defaultHandlingTime: "1-2 business days",
    enableCOD: true,
    enableInternationalShipping: false,
    autoCalculateShipping: true,
    showEstimatedDelivery: true,
    allowPickup: false,
    pickupAddress: "123 Main Street, Delhi - 110001",
    minimumOrderForFreeShipping: 999,
    maximumCODAmount: 50000,
    codAvailableByDefault: true
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSaveSettings = () => {
    alert("Shipping configuration saved successfully!");
    console.log("Saving settings...", { zones, rates, codPincodes, couriers, packaging, generalSettings });
  };

  const handleBulkUploadCOD = () => {
    alert("Upload CSV file with pincodes (Format: pincode, city, state, cod_charge, max_amount)");
  };

  const handleAddCODPincode = () => {
    setShowAddModal(true);
  };

  const filteredCODPincodes = codPincodes.filter(cod => 
    cod.pincode.includes(searchTerm) ||
    cod.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cod.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 rotate-180" />
            </button>
            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Shipping Configuration
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Configure shipping zones, rates, COD settings, and courier partners
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleSaveSettings}
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Configuration
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Zones</p>
                <p className="text-3xl font-bold text-gray-900">{zones.filter(z => z.isActive).length}</p>
                <p className="text-xs text-gray-500 mt-1">of {zones.length} total</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">COD Pincodes</p>
                <p className="text-3xl font-bold text-gray-900">{codPincodes.filter(c => c.isActive).length}</p>
                <p className="text-xs text-green-600 mt-1">COD enabled</p>
              </div>
              <div className="p-3 bg-green-100 rounded-2xl">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Courier Partners</p>
                <p className="text-3xl font-bold text-gray-900">{couriers.filter(c => c.isActive).length}</p>
                <p className="text-xs text-gray-500 mt-1">{couriers.find(c => c.isDefault)?.name} default</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Free Shipping</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(generalSettings.minimumOrderForFreeShipping)}</p>
                <p className="text-xs text-gray-500 mt-1">Min order value</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-2xl">
                <Tag className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
          {[
            { id: "zones", name: "Shipping Zones", icon: Globe },
            { id: "rates", name: "Shipping Rates", icon: DollarSign },
            { id: "cod", name: "COD Settings", icon: CreditCard },
            { id: "couriers", name: "Courier Partners", icon: Truck },
            { id: "packaging", name: "Packaging", icon: Package },
            { id: "general", name: "General Settings", icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Zones Tab */}
      {activeTab === "zones" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Zones</h3>
                <p className="text-sm text-gray-700">
                  Define geographical zones for shipping. Each zone can have different rates and delivery times.
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 inline mr-1" />
                Add Zone
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {zones.map((zone) => (
              <div key={zone.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        zone.type === "domestic" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                      }`}>
                        {zone.type === "domestic" ? "Domestic" : "International"}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{zone.name}</h3>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      zone.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {zone.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="mb-3">
                    <div className="text-xs font-medium text-gray-500 mb-2">Covered Regions</div>
                    <div className="flex flex-wrap gap-2">
                      {zone.regions.map((region, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <Copy className="h-3 w-3 mr-1" />
                      Duplicate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rates Tab */}
      {activeTab === "rates" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 via-teal-50 to-cyan-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Rates</h3>
                <p className="text-sm text-gray-700">
                  Configure shipping rates for each zone. Support for flat rate, weight-based, and distance-based pricing.
                </p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors">
                <Plus className="h-4 w-4 inline mr-1" />
                Add Rate
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {rates.map((rate) => (
              <div key={rate.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-green-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-gray-900">{rate.zoneName}</h3>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        rate.type === "flat" ? "bg-blue-100 text-blue-800" :
                        rate.type === "weight_based" ? "bg-purple-100 text-purple-800" :
                        rate.type === "distance_based" ? "bg-orange-100 text-orange-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {rate.type.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      rate.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {rate.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2">Base Rate</div>
                      <div className="text-2xl font-bold text-green-600">{formatCurrency(rate.baseRate)}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2">Free Shipping Above</div>
                      <div className="text-2xl font-bold text-blue-600">{formatCurrency(rate.freeShippingThreshold || 0)}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2">Estimated Delivery</div>
                      <div className="text-lg font-bold text-gray-900">{rate.estimatedDays} days</div>
                    </div>
                  </div>

                  {rate.weightRanges && rate.weightRanges.length > 0 && (
                    <div className="mt-4">
                      <div className="text-xs font-medium text-gray-500 mb-2">Weight-Based Pricing</div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {rate.weightRanges.map((range, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="text-xs text-gray-600">{range.min} - {range.max} kg</div>
                            <div className="text-sm font-bold text-gray-900">{formatCurrency(range.rate)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit Rate
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <Calculator className="h-3 w-3 mr-1" />
                      Test Calculator
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COD Settings Tab */}
      {activeTab === "cod" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cash on Delivery (COD) Settings</h3>
                <p className="text-sm text-gray-700">
                  Manage pincodes where COD is available. Set COD charges and maximum COD amounts per location.
                </p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleBulkUploadCOD}
                  className="px-4 py-2 bg-white border border-orange-300 text-orange-600 text-sm font-medium rounded-xl hover:bg-orange-50 transition-colors"
                >
                  <Upload className="h-4 w-4 inline mr-1" />
                  Bulk Upload
                </button>
                <button 
                  onClick={handleAddCODPincode}
                  className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-xl hover:bg-orange-700 transition-colors"
                >
                  <Plus className="h-4 w-4 inline mr-1" />
                  Add Pincode
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                      placeholder="Search by pincode, city, or state..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4 inline mr-1" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* COD Pincodes Table */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pincode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      COD Charge
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Max COD Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCODPincodes.map((cod) => (
                    <tr key={cod.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono font-semibold text-gray-900">{cod.pincode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{cod.city}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{cod.state}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-orange-600">{formatCurrency(cod.codCharge)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(cod.maxCodAmount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          cod.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {cod.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Courier Partners Tab */}
      {activeTab === "couriers" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Courier Partners</h3>
                <p className="text-sm text-gray-700">
                  Manage your courier partnerships. Configure API keys, weight limits, and service types.
                </p>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors">
                <Plus className="h-4 w-4 inline mr-1" />
                Add Partner
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {couriers.map((courier) => (
              <div key={courier.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{courier.name}</h3>
                    {courier.isDefault && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Default
                      </span>
                    )}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    courier.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {courier.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="px-6 py-4 space-y-3">
                  <div>
                    <div className="text-xs font-medium text-gray-500">API Key</div>
                    <div className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded mt-1">
                      {courier.apiKey || "Not configured"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-medium text-gray-500">Min Weight</div>
                      <div className="text-sm font-semibold text-gray-900">{courier.minWeight} kg</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500">Max Weight</div>
                      <div className="text-sm font-semibold text-gray-900">{courier.maxWeight} kg</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">Service Types</div>
                    <div className="flex flex-wrap gap-1">
                      {courier.serviceTypes.map((service, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Configure
                    </button>
                    <div className="flex space-x-2">
                      <button className="text-xs text-gray-600 hover:text-gray-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-xs text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Packaging Tab */}
      {activeTab === "packaging" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-sky-50 rounded-2xl p-6 border border-teal-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Package className="h-6 w-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Packaging Options</h3>
                <p className="text-sm text-gray-700">
                  Define packaging materials with dimensions and costs. Used for shipping calculations.
                </p>
              </div>
              <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-700 transition-colors">
                <Plus className="h-4 w-4 inline mr-1" />
                Add Packaging
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packaging.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-teal-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        pkg.type === "box" ? "bg-blue-100 text-blue-800" :
                        pkg.type === "envelope" ? "bg-purple-100 text-purple-800" :
                        pkg.type === "tube" ? "bg-orange-100 text-orange-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {pkg.type.toUpperCase()}
                      </span>
                    </div>
                    {pkg.isDefault && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Default
                      </span>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2">Dimensions (L×W×H)</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {pkg.dimensions.length} × {pkg.dimensions.width} × {pkg.dimensions.height} cm
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2">Max Weight</div>
                      <div className="text-sm font-semibold text-gray-900">{pkg.maxWeight} kg</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2">Packaging Cost</div>
                      <div className="text-lg font-bold text-teal-600">{formatCurrency(pkg.cost)}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2">Volumetric Weight</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {((pkg.dimensions.length * pkg.dimensions.width * pkg.dimensions.height) / 5000).toFixed(2)} kg
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* General Settings Tab */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">General Shipping Settings</h3>
            
            <div className="space-y-6">
              {/* Handling Time */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Default Handling Time</div>
                  <div className="text-xs text-gray-500">Time to prepare and ship orders</div>
                </div>
                <input
                  type="text"
                  value={generalSettings.defaultHandlingTime}
                  onChange={(e) => setGeneralSettings({...generalSettings, defaultHandlingTime: e.target.value})}
                  className="w-48 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              {/* Enable COD */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Enable Cash on Delivery</div>
                  <div className="text-xs text-gray-500">Allow customers to pay on delivery</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={generalSettings.enableCOD}
                    onChange={(e) => setGeneralSettings({...generalSettings, enableCOD: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* International Shipping */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Enable International Shipping</div>
                  <div className="text-xs text-gray-500">Ship to countries outside India</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={generalSettings.enableInternationalShipping}
                    onChange={(e) => setGeneralSettings({...generalSettings, enableInternationalShipping: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Auto Calculate */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Auto Calculate Shipping</div>
                  <div className="text-xs text-gray-500">Automatically calculate based on weight/distance</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={generalSettings.autoCalculateShipping}
                    onChange={(e) => setGeneralSettings({...generalSettings, autoCalculateShipping: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Show Estimated Delivery */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Show Estimated Delivery Date</div>
                  <div className="text-xs text-gray-500">Display delivery estimate on product pages</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={generalSettings.showEstimatedDelivery}
                    onChange={(e) => setGeneralSettings({...generalSettings, showEstimatedDelivery: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Free Shipping Threshold */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Free Shipping Threshold</div>
                  <div className="text-xs text-gray-500">Minimum order value for free shipping</div>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">₹</span>
                  <input
                    type="number"
                    value={generalSettings.minimumOrderForFreeShipping}
                    onChange={(e) => setGeneralSettings({...generalSettings, minimumOrderForFreeShipping: parseInt(e.target.value)})}
                    className="w-32 pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Maximum COD Amount */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Maximum COD Amount</div>
                  <div className="text-xs text-gray-500">Maximum order value allowed for COD</div>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">₹</span>
                  <input
                    type="number"
                    value={generalSettings.maximumCODAmount}
                    onChange={(e) => setGeneralSettings({...generalSettings, maximumCODAmount: parseInt(e.target.value)})}
                    className="w-32 pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Allow Pickup */}
              <div className="flex items-center justify-between py-4">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Allow Store Pickup</div>
                  <div className="text-xs text-gray-500">Let customers pick up orders from store</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={generalSettings.allowPickup}
                    onChange={(e) => setGeneralSettings({...generalSettings, allowPickup: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {generalSettings.allowPickup && (
                <div className="pl-4 pb-4 border-b border-gray-200">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Pickup Address</label>
                  <textarea
                    value={generalSettings.pickupAddress}
                    onChange={(e) => setGeneralSettings({...generalSettings, pickupAddress: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

