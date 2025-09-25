"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Upload, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  Package,
  Tag,
  Palette,
  FileText,
  BarChart3,
  Settings,
  Globe
} from "lucide-react";
import Link from "next/link";
import { ProductFormData, ProductCategory, ProductLabel, ProductStatus, ProductVisibility, ShippingClass, QuantityUnit, ProductVariant } from "@/types/admin-product";

const initialFormData: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  shortDescription: "",
  quantityUnit: "pieces",
  category: "Sweeteners",
  subCategory: "",
  labels: [],
  tags: [],
  basePrice: 0,
  originalPrice: 0,
  discount: 0,
  variants: [],
  primaryImage: {
    id: "",
    src: "",
    alt: "",
    sortOrder: 0
  },
  galleryImages: [],
  banners: [],
  features: [""],
  ingredients: [""],
  nutritionFacts: [],
  usageInstructions: [""],
  benefits: [""],
  sku: "",
  stock: 0,
  lowStockThreshold: 10,
  trackInventory: true,
  allowBackorders: false,
  weight: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0
  },
  shippingClass: "standard",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  status: "draft",
  visibility: "public",
  featured: false,
  rating: 0,
  reviewCount: 0,
  certifications: [],
  badges: [],
  availableCoupons: []
};

const categories: ProductCategory[] = [
  "Sweeteners",
  "Health Supplements",
  "Diabetic Care", 
  "Natural Products",
  "Organic Foods"
];

const subCategories: Record<ProductCategory, string[]> = {
  "Sweeteners": ["Stevia", "Natural Sweeteners", "Sugar Alternatives", "Liquid Sweeteners"],
  "Health Supplements": ["Vitamins", "Minerals", "Herbal", "Wellness"],
  "Diabetic Care": ["Blood Sugar Support", "Diet Products", "Monitoring", "Supplements"],
  "Natural Products": ["Organic", "Plant-Based", "Raw", "Unprocessed"],
  "Organic Foods": ["Certified Organic", "Non-GMO", "Fair Trade", "Sustainable"]
};

const availableLabels: ProductLabel[] = [
  "New Arrival",
  "Best Seller", 
  "Limited Edition",
  "Organic",
  "Sugar-Free",
  "Diabetic Friendly",
  "Zero Calorie",
  "Natural",
  "Vegan",
  "Gluten-Free"
];

const quantityUnits: QuantityUnit[] = [
  "pieces",
  "tablets", 
  "capsules",
  "grams",
  "kilograms",
  "milliliters",
  "liters",
  "ounces",
  "pounds",
  "sachets",
  "sticks",
  "bottles",
  "boxes",
  "packs"
];

export default function AddProductPage() {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [activeTab, setActiveTab] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayFieldChange = (field: keyof ProductFormData, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: keyof ProductFormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""]
    }));
  };

  const removeArrayField = (field: keyof ProductFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
      metaTitle: name
    }));
  };

  const handleSave = async (status: ProductStatus) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Saving product:", { ...formData, status });
      setIsLoading(false);
      // Redirect to products list or show success message
    }, 1000);
  };

  const tabs = [
    { id: "basic", name: "Basic Info", icon: FileText },
    { id: "media", name: "Media & Banners", icon: ImageIcon },
    { id: "details", name: "Product Details", icon: Package },
    { id: "variants", name: "Variants & Pricing", icon: Tag },
    { id: "inventory", name: "Inventory", icon: BarChart3 },
    { id: "seo", name: "SEO & Settings", icon: Globe }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/admin/dashboard/products"
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave("active")}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Publishing..." : "Publish Product"}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-3 px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 rounded-t-xl ${
                  activeTab === tab.id
                    ? "border-brand text-brand bg-brand/5"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
        <div className="px-6 py-6">
          
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="e.g., Healthy Sugar Tablets"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="healthy-sugar-tablets"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description (Blurb) *
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="e.g., Instantly sweetens tea & coffee."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description *
                </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 focus:shadow-md"
                    placeholder="Detailed product description..."
                  />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value as ProductCategory)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 focus:shadow-md"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub Category
                  </label>
                  <select
                    value={formData.subCategory}
                    onChange={(e) => handleInputChange("subCategory", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 focus:shadow-md"
                  >
                    <option value="">Select Sub Category</option>
                    {subCategories[formData.category]?.map(subCat => (
                      <option key={subCat} value={subCat}>{subCat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity Unit *
                  </label>
                  <select
                    value={formData.quantityUnit}
                    onChange={(e) => handleInputChange("quantityUnit", e.target.value as QuantityUnit)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 focus:shadow-md"
                  >
                    {quantityUnits.map(unit => (
                      <option key={unit} value={unit}>
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 focus:shadow-md"
                    placeholder="HSC-TABLETS-001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Labels
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableLabels.map(label => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        const isSelected = formData.labels.includes(label);
                        if (isSelected) {
                          handleInputChange("labels", formData.labels.filter(l => l !== label));
                        } else {
                          handleInputChange("labels", [...formData.labels, label]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                        formData.labels.includes(label)
                          ? "bg-gradient-to-r from-brand to-brand-dark text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Media & Banners Tab */}
          {activeTab === "media" && (
            <div className="space-y-8">
              {/* Primary Image */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Product Image</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-brand/50 transition-all duration-200 hover:bg-brand/5">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <button className="bg-gradient-to-r from-brand to-brand-dark text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                      Upload Primary Image
                    </button>
                    <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Gallery (Up to 5 images)</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-brand/50 transition-all duration-200 hover:bg-brand/5 group">
                      <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                      <button className="mt-2 text-sm text-brand hover:text-brand-dark transition-colors group-hover:font-medium">
                        Upload Image {index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Banners */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Page Banners</h3>
                <div className="space-y-6">
                  {/* Primary Banner */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Primary Banner (Green Style)</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                          placeholder="How Stevia is Going to Change Your Life Forever"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                        <input
                          type="color"
                          defaultValue="#22c55e"
                          className="w-full h-10 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                          placeholder="Experience the natural sweetness revolution. Zero calories, zero guilt, maximum health benefits..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                          placeholder="Natural • Healthy • Sustainable"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Secondary Banner */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Secondary Banner (Blue Style)</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                          placeholder="One Tablet a Day, Keeps the Doctor Away"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                        <input
                          type="color"
                          defaultValue="#3b82f6"
                          className="w-full h-10 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                          placeholder="Simple daily wellness routine. Just one tablet replaces 2 teaspoons of sugar..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                          placeholder="Simple • Effective • Daily"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features
                </label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayFieldChange("features", index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField("features", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField("features")}
                  className="flex items-center text-brand hover:text-brand-dark"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </button>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredients
                </label>
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleArrayFieldChange("ingredients", index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="Enter ingredient"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField("ingredients", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField("ingredients")}
                  className="flex items-center text-brand hover:text-brand-dark"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Ingredient
                </button>
              </div>

              {/* Usage Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usage Instructions
                </label>
                {formData.usageInstructions.map((instruction, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={instruction}
                      onChange={(e) => handleArrayFieldChange("usageInstructions", index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="Enter usage instruction"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField("usageInstructions", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField("usageInstructions")}
                  className="flex items-center text-brand hover:text-brand-dark"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Instruction
                </button>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Health Benefits
                </label>
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayFieldChange("benefits", index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="Enter health benefit"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField("benefits", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField("benefits")}
                  className="flex items-center text-brand hover:text-brand-dark"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Benefit
                </button>
              </div>

              {/* Nutrition Facts */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Nutrition Facts</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-4">Add nutritional information per serving</p>
                  <button
                    type="button"
                    className="flex items-center text-brand hover:text-brand-dark"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Nutrition Fact
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Variants & Pricing Tab */}
          {activeTab === "variants" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => handleInputChange("basePrice", Number(e.target.value))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 focus:shadow-md"
                    placeholder="299"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange("originalPrice", Number(e.target.value))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 focus:shadow-md"
                    placeholder="399"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => handleInputChange("discount", Number(e.target.value))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 focus:shadow-md"
                    placeholder="25"
                  />
                </div>
              </div>

              {/* Product Variants */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newVariant: ProductVariant = {
                        id: `variant-${Date.now()}`,
                        name: "",
                        sku: "",
                        price: 0,
                        stock: 0,
                        quantityValue: 0,
                        quantityUnit: formData.quantityUnit,
                        isDefault: false
                      };
                      handleInputChange("variants", [...formData.variants, newVariant]);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Variant
                  </button>
                </div>

                {formData.variants.length === 0 ? (
                  <div className="border border-gray-200 rounded-2xl p-6 text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-500 mb-4">
                      No variants added yet. Create variants for different sizes, quantities, or packaging options.
                    </p>
                    <p className="text-xs text-gray-400">
                      Example: 100 tablets, 200 tablets, 500 tablets
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.variants.map((variant, index) => (
                      <div key={variant.id} className="border border-gray-200 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900">Variant {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedVariants = formData.variants.filter((_, i) => i !== index);
                              handleInputChange("variants", updatedVariants);
                            }}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Quantity Value *
                            </label>
                            <input
                              type="number"
                              value={variant.quantityValue}
                              onChange={(e) => {
                                const updatedVariants = [...formData.variants];
                                updatedVariants[index] = {
                                  ...variant,
                                  quantityValue: Number(e.target.value),
                                  name: `${e.target.value} ${variant.quantityUnit}`
                                };
                                handleInputChange("variants", updatedVariants);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                              placeholder="200"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Unit
                            </label>
                            <select
                              value={variant.quantityUnit}
                              onChange={(e) => {
                                const updatedVariants = [...formData.variants];
                                updatedVariants[index] = {
                                  ...variant,
                                  quantityUnit: e.target.value as QuantityUnit,
                                  name: `${variant.quantityValue} ${e.target.value}`
                                };
                                handleInputChange("variants", updatedVariants);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                            >
                              {quantityUnits.map(unit => (
                                <option key={unit} value={unit}>
                                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price (₹) *
                            </label>
                            <input
                              type="number"
                              value={variant.price}
                              onChange={(e) => {
                                const updatedVariants = [...formData.variants];
                                updatedVariants[index] = {
                                  ...variant,
                                  price: Number(e.target.value)
                                };
                                handleInputChange("variants", updatedVariants);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                              placeholder="549"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Stock Quantity *
                            </label>
                            <input
                              type="number"
                              value={variant.stock}
                              onChange={(e) => {
                                const updatedVariants = [...formData.variants];
                                updatedVariants[index] = {
                                  ...variant,
                                  stock: Number(e.target.value)
                                };
                                handleInputChange("variants", updatedVariants);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                              placeholder="100"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              SKU
                            </label>
                            <input
                              type="text"
                              value={variant.sku}
                              onChange={(e) => {
                                const updatedVariants = [...formData.variants];
                                updatedVariants[index] = {
                                  ...variant,
                                  sku: e.target.value
                                };
                                handleInputChange("variants", updatedVariants);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                              placeholder={`${formData.sku}-${variant.quantityValue}`}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Original Price (₹)
                            </label>
                            <input
                              type="number"
                              value={variant.originalPrice || ""}
                              onChange={(e) => {
                                const updatedVariants = [...formData.variants];
                                updatedVariants[index] = {
                                  ...variant,
                                  originalPrice: e.target.value ? Number(e.target.value) : undefined
                                };
                                handleInputChange("variants", updatedVariants);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                              placeholder="599"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Badge
                            </label>
                            <select
                              value={variant.badge || ""}
                              onChange={(e) => {
                                const updatedVariants = [...formData.variants];
                                updatedVariants[index] = {
                                  ...variant,
                                  badge: e.target.value as any || undefined
                                };
                                handleInputChange("variants", updatedVariants);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                            >
                              <option value="">No Badge</option>
                              <option value="Most Popular">Most Popular</option>
                              <option value="Best Value">Best Value</option>
                              <option value="Limited Edition">Limited Edition</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center">
                          <input
                            type="checkbox"
                            checked={variant.isDefault}
                            onChange={(e) => {
                              const updatedVariants = formData.variants.map((v, i) => ({
                                ...v,
                                isDefault: i === index ? e.target.checked : false
                              }));
                              handleInputChange("variants", updatedVariants);
                            }}
                            className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            Set as default variant
                          </label>
                        </div>

                        {variant.quantityValue > 0 && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-600">
                              <strong>Variant Name:</strong> {variant.name || `${variant.quantityValue} ${variant.quantityUnit}`}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === "inventory" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) => handleInputChange("lowStockThreshold", Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (grams)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.dimensions.length}
                    onChange={(e) => handleInputChange("dimensions", { ...formData.dimensions, length: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.dimensions.width}
                    onChange={(e) => handleInputChange("dimensions", { ...formData.dimensions, width: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.dimensions.height}
                    onChange={(e) => handleInputChange("dimensions", { ...formData.dimensions, height: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.trackInventory}
                    onChange={(e) => handleInputChange("trackInventory", e.target.checked)}
                    className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Track inventory for this product
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.allowBackorders}
                    onChange={(e) => handleInputChange("allowBackorders", e.target.checked)}
                    className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Allow backorders when out of stock
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* SEO & Settings Tab */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="SEO optimized title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="SEO meta description"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value as ProductStatus)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility
                  </label>
                  <select
                    value={formData.visibility}
                    onChange={(e) => handleInputChange("visibility", e.target.value as ProductVisibility)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="password_protected">Password Protected</option>
                    <option value="members_only">Members Only</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange("featured", e.target.checked)}
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Feature this product on homepage
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
