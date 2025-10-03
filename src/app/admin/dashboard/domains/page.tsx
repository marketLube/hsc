"use client";

import { useState } from "react";
import { 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Shield,
  RefreshCw,
  ExternalLink,
  Settings,
  DollarSign,
  Calendar,
  Lock,
  Unlock,
  ArrowUpRight,
  Copy,
  Check,
  Server,
  Zap,
  TrendingUp,
  Activity,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Eye,
  EyeOff,
  Info,
  AlertCircle,
  XCircle,
  ChevronRight,
  BarChart3,
  MapPin,
  Mail,
  Phone,
  User,
  Building
} from "lucide-react";

interface Domain {
  id: string;
  domain: string;
  status: "active" | "expiring-soon" | "expired" | "pending";
  isPrimary: boolean;
  registrar: string;
  registeredDate: string;
  expiryDate: string;
  autoRenewal: boolean;
  sslStatus: "active" | "expiring" | "none";
  sslExpiry?: string;
  nameservers: string[];
  dnsRecords: number;
  monthlyTraffic: number;
  price: number;
  privacyProtection: boolean;
}

interface DNSRecord {
  id: string;
  type: "A" | "CNAME" | "MX" | "TXT" | "AAAA";
  name: string;
  value: string;
  ttl: number;
  status: "active" | "pending";
}

// Mock Data
const domains: Domain[] = [
  {
    id: "dom-001",
    domain: "healthysugar.com",
    status: "active",
    isPrimary: true,
    registrar: "GoDaddy",
    registeredDate: "2022-03-15",
    expiryDate: "2025-03-15",
    autoRenewal: true,
    sslStatus: "active",
    sslExpiry: "2024-12-15",
    nameservers: ["ns1.digitalocean.com", "ns2.digitalocean.com", "ns3.digitalocean.com"],
    dnsRecords: 12,
    monthlyTraffic: 45680,
    price: 1299,
    privacyProtection: true
  },
  {
    id: "dom-002",
    domain: "healthysugar.in",
    status: "expiring-soon",
    isPrimary: false,
    registrar: "Namecheap",
    registeredDate: "2023-01-20",
    expiryDate: "2024-04-20",
    autoRenewal: false,
    sslStatus: "active",
    sslExpiry: "2024-10-20",
    nameservers: ["ns1.digitalocean.com", "ns2.digitalocean.com"],
    dnsRecords: 8,
    monthlyTraffic: 12340,
    price: 899,
    privacyProtection: true
  },
  {
    id: "dom-003",
    domain: "healthysugar.co.in",
    status: "active",
    isPrimary: false,
    registrar: "BigRock",
    registeredDate: "2023-06-10",
    expiryDate: "2025-06-10",
    autoRenewal: true,
    sslStatus: "active",
    sslExpiry: "2024-11-10",
    nameservers: ["ns1.digitalocean.com", "ns2.digitalocean.com"],
    dnsRecords: 6,
    monthlyTraffic: 8920,
    price: 799,
    privacyProtection: false
  }
];

const dnsRecords: DNSRecord[] = [
  { id: "dns-001", type: "A", name: "@", value: "104.26.10.123", ttl: 3600, status: "active" },
  { id: "dns-002", type: "A", name: "www", value: "104.26.10.123", ttl: 3600, status: "active" },
  { id: "dns-003", type: "CNAME", name: "blog", value: "healthysugar.com", ttl: 3600, status: "active" },
  { id: "dns-004", type: "MX", name: "@", value: "mail.healthysugar.com", ttl: 3600, status: "active" },
  { id: "dns-005", type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", ttl: 3600, status: "active" },
  { id: "dns-006", type: "CNAME", name: "shop", value: "healthysugar.com", ttl: 3600, status: "pending" }
];

const registrarOptions = [
  { name: "GoDaddy", icon: Globe, popular: true },
  { name: "Namecheap", icon: Globe, popular: true },
  { name: "Google Domains", icon: Globe, popular: true },
  { name: "BigRock", icon: Globe, popular: false },
  { name: "Domain.com", icon: Globe, popular: false },
  { name: "Hover", icon: Globe, popular: false }
];

export default function DomainsPage() {
  const [selectedDomain, setSelectedDomain] = useState<Domain>(domains[0]);
  const [showDNSRecords, setShowDNSRecords] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<"overview" | "dns" | "ssl" | "settings">("overview");

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status: Domain["status"]) => {
    const configs = {
      active: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
        icon: CheckCircle,
        label: "Active"
      },
      "expiring-soon": {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
        icon: AlertTriangle,
        label: "Expiring Soon"
      },
      expired: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
        icon: XCircle,
        label: "Expired"
      },
      pending: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
        icon: Clock,
        label: "Pending"
      }
    };

    const config = configs[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getSSLBadge = (sslStatus: Domain["sslStatus"]) => {
    if (sslStatus === "active") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          <Lock className="h-3 w-3 mr-1" />
          SSL Active
        </span>
      );
    } else if (sslStatus === "expiring") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          SSL Expiring
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          <Unlock className="h-3 w-3 mr-1" />
          No SSL
        </span>
      );
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

  const daysUntilExpiry = getDaysUntilExpiry(selectedDomain.expiryDate);
  const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Domain Management
              </h1>
              <p className="text-lg text-gray-600">
                Manage your domains, SSL certificates, and DNS settings
              </p>
            </div>
            <div className="mt-4 flex gap-3 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <Upload className="mr-2 h-4 w-4" />
                Transfer Domain
              </button>
              <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <Plus className="mr-2 h-4 w-4" />
                Add Domain
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{domains.length}</p>
            <p className="text-sm text-gray-500">Active Domains</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Shield className="h-8 w-8 text-green-600" />
              <span className="text-xs text-green-600 font-medium">SSL</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {domains.filter(d => d.sslStatus === "active").length}
            </p>
            <p className="text-sm text-gray-500">SSL Certificates</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <span className="text-xs text-yellow-600 font-medium">Alert</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {domains.filter(d => d.status === "expiring-soon").length}
            </p>
            <p className="text-sm text-gray-500">Expiring Soon</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">Traffic</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {(domains.reduce((sum, d) => sum + d.monthlyTraffic, 0) / 1000).toFixed(1)}K
            </p>
            <p className="text-sm text-gray-500">Monthly Visitors</p>
          </div>
        </div>

        {/* Primary Domain Highlight */}
        {isExpiringSoon && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 mb-8 border-2 border-yellow-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Domain Expiring Soon!</h3>
                  <p className="text-gray-600 mb-3">
                    Your domain <strong>{selectedDomain.domain}</strong> will expire in <strong>{daysUntilExpiry} days</strong> on {new Date(selectedDomain.expiryDate).toLocaleDateString()}.
                  </p>
                  <div className="flex gap-3">
                    <button className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-all text-sm font-medium">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Renew Now
                    </button>
                    <button className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-sm border border-gray-300">
                      Enable Auto-Renewal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Domains List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Domains</h3>
              <div className="space-y-3">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomain(domain)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedDomain.id === domain.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Globe className={`h-5 w-5 ${selectedDomain.id === domain.id ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span className="font-semibold text-gray-900">{domain.domain}</span>
                      </div>
                      {domain.isPrimary && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-md">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      {getStatusBadge(domain.status)}
                      <ChevronRight className={`h-4 w-4 ${selectedDomain.id === domain.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Domain Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Domain Header */}
              <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <Globe className="h-8 w-8" />
                      <h2 className="text-2xl font-bold">{selectedDomain.domain}</h2>
                    </div>
                    <p className="text-green-100">Registered with {selectedDomain.registrar}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSSLBadge(selectedDomain.sslStatus)}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <p className="text-green-100 text-xs mb-1">Registered</p>
                    <p className="font-semibold">{new Date(selectedDomain.registeredDate).toLocaleDateString()}</p>
                  </div>
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <p className="text-green-100 text-xs mb-1">Expires</p>
                    <p className="font-semibold">{new Date(selectedDomain.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <p className="text-green-100 text-xs mb-1">Days Left</p>
                    <p className="font-semibold">{daysUntilExpiry} days</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-6 px-6">
                  {[
                    { id: "overview", label: "Overview", icon: Activity },
                    { id: "dns", label: "DNS Records", icon: Server },
                    { id: "ssl", label: "SSL Certificate", icon: Lock },
                    { id: "settings", label: "Settings", icon: Settings }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id as any)}
                        className={`flex items-center pb-3 pt-4 border-b-2 transition-all ${
                          selectedTab === tab.id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Overview Tab */}
                {selectedTab === "overview" && (
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">Auto Renewal</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={selectedDomain.autoRenewal} className="sr-only peer" readOnly />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {selectedDomain.autoRenewal ? "Enabled" : "Disabled"}
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">Privacy Protection</span>
                          <Shield className={`h-5 w-5 ${selectedDomain.privacyProtection ? 'text-green-600' : 'text-gray-400'}`} />
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {selectedDomain.privacyProtection ? "Active" : "Inactive"}
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-sm text-gray-500 block mb-2">Annual Cost</span>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(selectedDomain.price)}</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-sm text-gray-500 block mb-2">Monthly Traffic</span>
                        <p className="text-lg font-bold text-gray-900">{selectedDomain.monthlyTraffic.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Nameservers */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-3">Nameservers</h4>
                      <div className="space-y-2">
                        {selectedDomain.nameservers.map((ns, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Server className="h-4 w-4 text-gray-400" />
                              <code className="text-sm font-mono text-gray-700">{ns}</code>
                            </div>
                            <button
                              onClick={() => copyToClipboard(ns, `ns-${index}`)}
                              className="p-1 hover:bg-gray-200 rounded transition-all"
                            >
                              {copiedText === `ns-${index}` ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Renew Domain
                      </button>
                      <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all">
                        <Upload className="h-4 w-4 mr-2" />
                        Transfer Out
                      </button>
                    </div>
                  </div>
                )}

                {/* DNS Tab */}
                {selectedTab === "dns" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">DNS Records</h4>
                        <p className="text-sm text-gray-500">{selectedDomain.dnsRecords} records configured</p>
                      </div>
                      <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Record
                      </button>
                    </div>

                    <div className="space-y-2">
                      {dnsRecords.map((record) => (
                        <div key={record.id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-mono font-bold rounded">
                                {record.type}
                              </span>
                              <code className="text-sm font-mono text-gray-700">{record.name}</code>
                            </div>
                            <div className="flex items-center gap-2">
                              {record.status === "active" ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Clock className="h-4 w-4 text-yellow-600" />
                              )}
                              <button className="p-1 hover:bg-gray-200 rounded">
                                <Edit className="h-4 w-4 text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-red-100 rounded">
                                <Trash2 className="h-4 w-4 text-red-400" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <code className="text-gray-600">{record.value}</code>
                            <span className="text-gray-400">TTL: {record.ttl}s</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SSL Tab */}
                {selectedTab === "ssl" && (
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-green-100 rounded-xl">
                            <Lock className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">SSL Certificate Active</h4>
                            <p className="text-sm text-gray-600">Your website is secured with HTTPS</p>
                          </div>
                        </div>
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Issued By</p>
                          <p className="font-medium text-gray-900">Let's Encrypt</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Valid Until</p>
                          <p className="font-medium text-gray-900">
                            {selectedDomain.sslExpiry && new Date(selectedDomain.sslExpiry).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Encryption</p>
                          <p className="font-medium text-gray-900">256-bit</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Auto-Renewal</p>
                          <p className="font-medium text-green-600">Enabled</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </button>
                      <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Renew SSL
                      </button>
                    </div>

                    {/* SSL Features */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gray-900">SSL Features</h4>
                      {[
                        "HTTPS encryption for all pages",
                        "Browser padlock indicator",
                        "Improved SEO rankings",
                        "Customer trust and credibility",
                        "PCI DSS compliance ready"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {selectedTab === "settings" && (
                  <div className="space-y-6">
                    {/* Auto Renewal */}
                    <div className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900">Auto-Renewal</h4>
                          <p className="text-sm text-gray-500">Automatically renew before expiration</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={selectedDomain.autoRenewal} className="sr-only peer" />
                          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* Privacy Protection */}
                    <div className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900">Privacy Protection</h4>
                          <p className="text-sm text-gray-500">Hide your personal information from WHOIS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={selectedDomain.privacyProtection} className="sr-only peer" />
                          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* Set as Primary */}
                    {!selectedDomain.isPrimary && (
                      <button className="w-full inline-flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all">
                        <Star className="h-4 w-4 mr-2" />
                        Set as Primary Domain
                      </button>
                    )}

                    {/* Danger Zone */}
                    <div className="p-4 border-2 border-red-200 rounded-xl bg-red-50">
                      <h4 className="font-bold text-red-900 mb-3">Danger Zone</h4>
                      <div className="space-y-2">
                        <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-white border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-all text-sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Transfer Domain Out
                        </button>
                        <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Domain
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Registrars */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need a New Domain?</h3>
              <p className="text-gray-600 mb-4">Register your domain with these popular registrars</p>
              <div className="flex flex-wrap gap-3">
                {registrarOptions.filter(r => r.popular).map((registrar) => (
                  <a
                    key={registrar.name}
                    href="#"
                    className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-sm border border-gray-300 shadow-sm"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {registrar.name}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

