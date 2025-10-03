"use client";

import { useState } from "react";
import { 
  Settings, 
  Store, 
  CreditCard, 
  Truck, 
  Users,
  Bell,
  Shield,
  Database,
  Save,
  Upload,
  Image as ImageIcon,
  Globe,
  MapPin,
  Phone,
  Mail,
  Building2,
  FileText,
  DollarSign,
  Clock,
  Calendar,
  Tag,
  Link,
  Eye,
  EyeOff,
  Copy,
  Check,
  X,
  AlertCircle,
  Info,
  Edit,
  Trash2,
  Plus,
  ChevronRight,
  RefreshCw,
  Search,
  Filter,
  Download,
  ExternalLink,
  Zap,
  Lock,
  Unlock,
  BarChart3,
  Target,
  TrendingUp,
  Activity,
  Palette,
  Type,
  Layout,
  Code,
  Smartphone,
  Monitor
} from "lucide-react";

type TabType = "store" | "business" | "tax" | "policies" | "general" | "advanced";

interface StoreInfo {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  supportEmail: string;
  supportPhone: string;
}

interface BusinessInfo {
  legalName: string;
  businessType: string;
  gstNumber: string;
  panNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
}

interface TaxSettings {
  enableGST: boolean;
  gstNumber: string;
  cgst: number;
  sgst: number;
  igst: number;
  taxInclusive: boolean;
  hsnCode: string;
  placeOfSupply: string;
}

interface PolicySettings {
  returnPolicy: string;
  privacyPolicy: string;
  termsOfService: string;
  shippingPolicy: string;
  refundPolicy: string;
}

interface GeneralSettings {
  currency: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  language: string;
  weightUnit: string;
  dimensionUnit: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("store");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Store Information State
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: "Healthy Sugar Home",
    tagline: "Natural Sweetness, Healthy Living",
    description: "Premium natural sugar alternatives for a healthier lifestyle. We offer high-quality stevia, monk fruit, and other healthy sugar substitutes.",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    email: "hello@healthysugarhome.com",
    phone: "+91 98765 43210",
    supportEmail: "support@healthysugarhome.com",
    supportPhone: "+91 98765 43211"
  });

  // Business Information State
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    legalName: "Healthy Sugar Home Private Limited",
    businessType: "Private Limited Company",
    gstNumber: "27AABCU9603R1ZM",
    panNumber: "AABCU9603R",
    address: {
      street: "123 Green Park Extension",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110016",
      country: "India"
    },
    bankDetails: {
      accountName: "Healthy Sugar Home Pvt Ltd",
      accountNumber: "1234567890123456",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank"
    }
  });

  // Tax Settings State
  const [taxSettings, setTaxSettings] = useState<TaxSettings>({
    enableGST: true,
    gstNumber: "27AABCU9603R1ZM",
    cgst: 9,
    sgst: 9,
    igst: 18,
    taxInclusive: true,
    hsnCode: "1702",
    placeOfSupply: "Delhi"
  });

  // Policy Settings State
  const [policySettings, setPolicySettings] = useState<PolicySettings>({
    returnPolicy: "30-day return policy for unopened products. Contact support for returns.",
    privacyPolicy: "We value your privacy and protect your personal information...",
    termsOfService: "By using our website, you agree to these terms and conditions...",
    shippingPolicy: "Free shipping on orders above ₹999. Delivery within 3-5 business days.",
    refundPolicy: "Full refund within 7 days of return approval. Refund processed to original payment method."
  });

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    currency: "INR",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12-hour",
    language: "English",
    weightUnit: "kg",
    dimensionUnit: "cm"
  });

  // Social Media Links
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/healthysugarhome",
    instagram: "https://instagram.com/healthysugarhome",
    twitter: "https://twitter.com/healthysugar",
    linkedin: "https://linkedin.com/company/healthysugarhome",
    youtube: "https://youtube.com/@healthysugarhome"
  });

  // Operating Hours
  const [operatingHours, setOperatingHours] = useState({
    monday: { open: "09:00", close: "18:00", closed: false },
    tuesday: { open: "09:00", close: "18:00", closed: false },
    wednesday: { open: "09:00", close: "18:00", closed: false },
    thursday: { open: "09:00", close: "18:00", closed: false },
    friday: { open: "09:00", close: "18:00", closed: false },
    saturday: { open: "10:00", close: "16:00", closed: false },
    sunday: { open: "10:00", close: "16:00", closed: true }
  });

  // SEO Defaults
  const [seoDefaults, setSeoDefaults] = useState({
    metaTitle: "Healthy Sugar Home - Natural Sugar Alternatives",
    metaDescription: "Shop premium natural sugar alternatives. Stevia, monk fruit & healthy sweeteners.",
    metaKeywords: "stevia, monk fruit, sugar alternatives, healthy sweeteners, natural sugar",
    ogImage: "/og-image.jpg",
    twitterCard: "summary_large_image"
  });

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      alert("Settings saved successfully!");
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const handleUploadLogo = () => {
    alert("Logo upload functionality - would open file picker");
  };

  const handleUploadFavicon = () => {
    alert("Favicon upload functionality - would open file picker");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Store Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure your store information, business details, tax settings, and policies
          </p>
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
            disabled={isSaving}
            className={`inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transition-all duration-200 transform hover:scale-[1.02] ${
              isSaving 
                ? "bg-gray-400 cursor-not-allowed" 
                : saved
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg"
            }`}
          >
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-xl shadow-sm">
        <nav className="flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
          {[
            { id: "store", name: "Store Info", icon: Store },
            { id: "business", name: "Business Details", icon: Building2 },
            { id: "tax", name: "Tax Settings", icon: DollarSign },
            { id: "policies", name: "Policies", icon: FileText },
            { id: "general", name: "General", icon: Settings },
            { id: "advanced", name: "Advanced", icon: Code }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
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

      {/* Store Info Tab */}
      {activeTab === "store" && (
        <div className="space-y-6">
          {/* Basic Store Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Store className="h-5 w-5 mr-2 text-blue-600" />
                Basic Store Information
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Store Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={storeInfo.name}
                  onChange={(e) => setStoreInfo({...storeInfo, name: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter your store name"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={storeInfo.tagline}
                  onChange={(e) => setStoreInfo({...storeInfo, tagline: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="A catchy tagline for your store"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Description
                </label>
                <textarea
                  value={storeInfo.description}
                  onChange={(e) => setStoreInfo({...storeInfo, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Describe your store and products"
                />
              </div>

              {/* Logo & Favicon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-300 overflow-hidden">
                      {storeInfo.logo ? (
                        <img src={storeInfo.logo} alt="Logo" className="h-full w-full object-contain" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      )}
            </div>
                    <div className="flex-1">
                      <button
                        onClick={handleUploadLogo}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="h-4 w-4 inline mr-2" />
                        Upload Logo
              </button>
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG up to 2MB. Recommended: 200x200px
                      </p>
            </div>
          </div>
        </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-300 overflow-hidden">
                      {storeInfo.favicon ? (
                        <img src={storeInfo.favicon} alt="Favicon" className="h-8 w-8 object-contain" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      )}
              </div>
                    <div className="flex-1">
                      <button
                        onClick={handleUploadFavicon}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="h-4 w-4 inline mr-2" />
                        Upload Favicon
                      </button>
                      <p className="mt-1 text-xs text-gray-500">
                        ICO, PNG up to 100KB. Recommended: 32x32px
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-600" />
                Contact Information
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={storeInfo.email}
                      onChange={(e) => setStoreInfo({...storeInfo, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      placeholder="hello@yourstore.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={storeInfo.phone}
                      onChange={(e) => setStoreInfo({...storeInfo, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Support Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={storeInfo.supportEmail}
                      onChange={(e) => setStoreInfo({...storeInfo, supportEmail: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      placeholder="support@yourstore.com"
                    />
          </div>
        </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Support Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={storeInfo.supportPhone}
                      onChange={(e) => setStoreInfo({...storeInfo, supportPhone: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      placeholder="+91 98765 43211"
                    />
                  </div>
              </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Link className="h-5 w-5 mr-2 text-pink-600" />
                Social Media Links
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(socialLinks).map(([platform, url]) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {platform}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setSocialLinks({...socialLinks, [platform]: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      placeholder={`https://${platform}.com/yourstore`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Business Details Tab */}
      {activeTab === "business" && (
        <div className="space-y-6">
          {/* Legal & Business Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-indigo-600" />
                Legal & Business Information
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessInfo.legalName}
                    onChange={(e) => setBusinessInfo({...businessInfo, legalName: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="Legal registered business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select
                    value={businessInfo.businessType}
                    onChange={(e) => setBusinessInfo({...businessInfo, businessType: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option>Private Limited Company</option>
                    <option>Public Limited Company</option>
                    <option>Partnership</option>
                    <option>Sole Proprietorship</option>
                    <option>LLP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Number
                  </label>
                  <input
                    type="text"
                    value={businessInfo.gstNumber}
                    onChange={(e) => setBusinessInfo({...businessInfo, gstNumber: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand font-mono"
                    placeholder="27AABCU9603R1ZM"
                  />
        </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    value={businessInfo.panNumber}
                    onChange={(e) => setBusinessInfo({...businessInfo, panNumber: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand font-mono"
                    placeholder="AABCU9603R"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Address */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                Business Address
                </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessInfo.address.street}
                    onChange={(e) => setBusinessInfo({
                      ...businessInfo,
                      address: {...businessInfo.address, street: e.target.value}
                    })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="Street address, building, apartment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessInfo.address.city}
                    onChange={(e) => setBusinessInfo({
                      ...businessInfo,
                      address: {...businessInfo.address, city: e.target.value}
                    })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessInfo.address.state}
                    onChange={(e) => setBusinessInfo({
                      ...businessInfo,
                      address: {...businessInfo.address, state: e.target.value}
                    })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessInfo.address.pincode}
                    onChange={(e) => setBusinessInfo({
                      ...businessInfo,
                      address: {...businessInfo.address, pincode: e.target.value}
                    })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="110001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={businessInfo.address.country}
                    onChange={(e) => setBusinessInfo({
                      ...businessInfo,
                      address: {...businessInfo.address, country: e.target.value}
                    })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                Bank Account Details
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0" />
                  <p className="text-sm text-yellow-800">
                    Bank details are used for refund processing and settlement. Keep this information secure.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={businessInfo.bankDetails.accountName}
                    onChange={(e) => setBusinessInfo({
                      ...businessInfo,
                      bankDetails: {...businessInfo.bankDetails, accountName: e.target.value}
                    })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="Account holder name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={businessInfo.bankDetails.accountNumber}
                    onChange={(e) => setBusinessInfo({
                      ...businessInfo,
                      bankDetails: {...businessInfo.bankDetails, accountNumber: e.target.value}
                    })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand font-mono"
                    placeholder="1234567890123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={businessInfo.bankDetails.ifscCode}
                    onChange={(e) => setBusinessInfo({
                      ...businessInfo,
                      bankDetails: {...businessInfo.bankDetails, ifscCode: e.target.value}
                    })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand font-mono"
                    placeholder="HDFC0001234"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={businessInfo.bankDetails.bankName}
                    onChange={(e) => setBusinessInfo({
                      ...businessInfo,
                      bankDetails: {...businessInfo.bankDetails, bankName: e.target.value}
                    })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="Bank name and branch"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tax Settings Tab */}
      {activeTab === "tax" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-orange-600" />
                Tax Configuration
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Enable GST Toggle */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Enable GST</div>
                  <div className="text-xs text-gray-500">Enable Goods and Services Tax</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={taxSettings.enableGST}
                    onChange={(e) => setTaxSettings({...taxSettings, enableGST: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {taxSettings.enableGST && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={taxSettings.gstNumber}
                        onChange={(e) => setTaxSettings({...taxSettings, gstNumber: e.target.value})}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand font-mono"
                        placeholder="27AABCU9603R1ZM"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CGST Rate (%)
                      </label>
                      <input
                        type="number"
                        value={taxSettings.cgst}
                        onChange={(e) => setTaxSettings({...taxSettings, cgst: parseFloat(e.target.value)})}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="9"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SGST Rate (%)
                      </label>
                      <input
                        type="number"
                        value={taxSettings.sgst}
                        onChange={(e) => setTaxSettings({...taxSettings, sgst: parseFloat(e.target.value)})}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="9"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IGST Rate (%)
                      </label>
                      <input
                        type="number"
                        value={taxSettings.igst}
                        onChange={(e) => setTaxSettings({...taxSettings, igst: parseFloat(e.target.value)})}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="18"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        HSN Code
                      </label>
                      <input
                        type="text"
                        value={taxSettings.hsnCode}
                        onChange={(e) => setTaxSettings({...taxSettings, hsnCode: e.target.value})}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="1702"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Place of Supply
                      </label>
                      <input
                        type="text"
                        value={taxSettings.placeOfSupply}
                        onChange={(e) => setTaxSettings({...taxSettings, placeOfSupply: e.target.value})}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="Delhi"
                      />
              </div>
            </div>

                  {/* Tax Inclusive Toggle */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-200">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Tax Inclusive Pricing</div>
                      <div className="text-xs text-gray-500">Product prices include tax</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={taxSettings.taxInclusive}
                        onChange={(e) => setTaxSettings({...taxSettings, taxInclusive: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Policies Tab */}
      {activeTab === "policies" && (
        <div className="space-y-6">
          {Object.entries(policySettings).map(([key, value]) => (
            <div key={key} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center capitalize">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
              </div>
              <div className="p-6">
                <textarea
                  value={value}
                  onChange={(e) => setPolicySettings({...policySettings, [key]: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* General Settings Tab */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-purple-600" />
                Regional Settings
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={generalSettings.currency}
                    onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={generalSettings.dateFormat}
                    onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Format
                  </label>
                  <select
                    value={generalSettings.timeFormat}
                    onChange={(e) => setGeneralSettings({...generalSettings, timeFormat: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option value="12-hour">12-hour (AM/PM)</option>
                    <option value="24-hour">24-hour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={generalSettings.language}
                    onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight Unit
                  </label>
                  <select
                    value={generalSettings.weightUnit}
                    onChange={(e) => setGeneralSettings({...generalSettings, weightUnit: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="g">Grams (g)</option>
                    <option value="lb">Pounds (lb)</option>
                    <option value="oz">Ounces (oz)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dimension Unit
                  </label>
                  <select
                    value={generalSettings.dimensionUnit}
                    onChange={(e) => setGeneralSettings({...generalSettings, dimensionUnit: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option value="cm">Centimeters (cm)</option>
                    <option value="m">Meters (m)</option>
                    <option value="in">Inches (in)</option>
                    <option value="ft">Feet (ft)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Tab */}
      {activeTab === "advanced" && (
        <div className="space-y-6">
          {/* SEO Settings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Target className="h-5 w-5 mr-2 text-cyan-600" />
                SEO Defaults
          </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Meta Title
                </label>
                <input
                  type="text"
                  value={seoDefaults.metaTitle}
                  onChange={(e) => setSeoDefaults({...seoDefaults, metaTitle: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Your store name and tagline"
                />
                <p className="mt-1 text-xs text-gray-500">Recommended: 50-60 characters</p>
            </div>
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Meta Description
                </label>
                <textarea
                  value={seoDefaults.metaDescription}
                  onChange={(e) => setSeoDefaults({...seoDefaults, metaDescription: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Brief description of your store"
                />
                <p className="mt-1 text-xs text-gray-500">Recommended: 150-160 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Meta Keywords
                </label>
                <input
                  type="text"
                  value={seoDefaults.metaKeywords}
                  onChange={(e) => setSeoDefaults({...seoDefaults, metaKeywords: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="mt-1 text-xs text-gray-500">Comma-separated keywords</p>
              </div>
              </div>
            </div>
            
          {/* Operating Hours */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Operating Hours
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-24">
                        <span className="text-sm font-medium text-gray-900 capitalize">{day}</span>
                      </div>
                      {hours.closed ? (
                        <span className="text-sm text-gray-500">Closed</span>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => setOperatingHours({
                              ...operatingHours,
                              [day]: {...hours, open: e.target.value}
                            })}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => setOperatingHours({
                              ...operatingHours,
                              [day]: {...hours, close: e.target.value}
                            })}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand"
                          />
                        </div>
                      )}
              </div>
                    <label className="flex items-center">
                <input
                  type="checkbox"
                        checked={hours.closed}
                        onChange={(e) => setOperatingHours({
                          ...operatingHours,
                          [day]: {...hours, closed: e.target.checked}
                        })}
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                      <span className="ml-2 text-sm text-gray-600">Closed</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
