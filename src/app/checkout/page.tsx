"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  Shield, 
  CreditCard,
  Smartphone,
  QrCode,
  Building,
  Tag,
  Clock,
  Truck,
  Gift,
  X
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";
import { PRODUCTS } from "@/lib/products";
import { formatINR } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface AddressData {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

interface CouponCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
}

const COUPON_CODES: CouponCode[] = [
  { code: 'FREEDEL', discount: 50, type: 'fixed', description: 'Free delivery on first order' },
  { code: 'HEALTHY10', discount: 10, type: 'percentage', description: '10% off on all products' },
  { code: 'SWEET15', discount: 15, type: 'percentage', description: '15% off on orders above ₹999' },
  { code: 'NEWUSER', discount: 100, type: 'fixed', description: '₹100 off for new users' },
];

type PaymentStep = 'phone' | 'address' | 'payment';
type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';

export default function CheckoutPage() {
  const router = useRouter();
  const { showToast, ToastContainer } = useToast();
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<PaymentStep>('phone');
  const [addressData, setAddressData] = useState<AddressData>({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('upi');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [errors, setErrors] = useState<Partial<AddressData>>({});

  // Load cart items on page load
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        setCartItems({});
      }
    } else {
      // If no cart items, redirect to home
      router.push('/');
      return;
    }
    setIsLoading(false);
  }, [router]);

  // Calculate totals
  const cartItemsArray = Object.entries(cartItems).map(([productId, quantity]) => {
    const product = PRODUCTS.find(p => p.id === productId);
    return product ? { product, quantity } : null;
  }).filter(Boolean) as { product: typeof PRODUCTS[0]; quantity: number }[];

  const subtotal = cartItemsArray.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 999 ? 0 : 50;
  let discount = 0;
  
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discount) / 100);
    } else {
      discount = appliedCoupon.discount;
    }
  }
  
  const total = Math.max(0, subtotal + shipping - discount);

  // OTP Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  // Redirect if cart is empty
  if (!isLoading && cartItemsArray.length === 0) {
    router.push('/');
    return null;
  }

  const validatePhone = (): boolean => {
    const newErrors: Partial<AddressData> = {};
    
    if (!addressData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(addressData.phone)) newErrors.phone = 'Enter valid 10-digit mobile number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddress = (): boolean => {
    const newErrors: Partial<AddressData> = {};
    
    if (!addressData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!addressData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addressData.email)) newErrors.email = 'Enter valid email address';
    if (!addressData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!addressData.city.trim()) newErrors.city = 'City is required';
    if (!addressData.state.trim()) newErrors.state = 'State is required';
    if (!addressData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(addressData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = () => {
    if (validatePhone()) {
      setOtpSent(true);
      setOtpTimer(30);
    }
  };

  const handleContinueToAddress = () => {
    if (validateAddress()) {
      setCurrentStep('payment');
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }

      // Auto-verify when all 4 digits are entered
      if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 4) {
        setTimeout(() => handleVerifyOTP(newOtp.join('')), 100);
      }
    }
  };

  const handleVerifyOTP = (otpValue?: string) => {
    const otpToVerify = otpValue || otp.join('');
    // For now, accept any 4-digit OTP
    if (otpToVerify.length === 4) {
      setCurrentStep('address');
    }
  };

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponCode;
    const coupon = COUPON_CODES.find(c => c.code.toLowerCase() === code.toLowerCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode('');
      showToast(`Coupon "${coupon.code}" applied successfully! ${coupon.description}`, "success");
    } else {
      // Show error for invalid coupon using toast instead of alert
      showToast(`Invalid coupon code: "${code}"`, "error");
    }
  };

  const handleRemoveCoupon = () => {
    const removedCoupon = appliedCoupon;
    setAppliedCoupon(null);
    if (removedCoupon) {
      showToast(`Coupon "${removedCoupon.code}" removed`, "info");
    }
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessingPayment(false);
    
    // Clear cart after successful payment
    localStorage.removeItem('cart');
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { totalItems: 0 } }));
    
    // Redirect to success page or home
    router.push('/?payment=success');
  };

  const handleBackToCart = () => {
    router.push('/');
  };

  const renderOrderSummary = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      {/* Items */}
      <div className="space-y-3 mb-6">
        {cartItemsArray.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-50 rounded-lg p-2">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{product.name}</p>
              <p className="text-gray-600 text-sm">Qty: {quantity}</p>
            </div>
            <p className="font-medium text-gray-900">{formatINR(product.price * quantity)}</p>
          </div>
        ))}
      </div>

      {/* Coupon Code */}
      <div className="mb-6">
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
          />
          <Button onClick={() => handleApplyCoupon()} size="sm" disabled={!couponCode}>
            Apply
          </Button>
        </div>
        
        {appliedCoupon && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">{appliedCoupon.code}</p>
                <p className="text-xs text-green-600">{appliedCoupon.description}</p>
              </div>
            </div>
            <button onClick={handleRemoveCoupon} className="text-green-600 hover:text-green-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Available Coupons */}
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Available Coupons:</p>
          <div className="space-y-1">
            {COUPON_CODES.filter(c => c.code !== appliedCoupon?.code).map(coupon => (
              <button
                key={coupon.code}
                onClick={() => handleApplyCoupon(coupon.code)}
                className="w-full text-left p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand">{coupon.code}</span>
                  <span className="text-xs text-gray-600">
                    {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{coupon.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatINR(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className={cn(
            "font-medium",
            shipping === 0 ? "text-green-600" : "text-gray-900"
          )}>
            {shipping === 0 ? "Free" : formatINR(shipping)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-600">-{formatINR(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span className="text-brand">{formatINR(total)}</span>
        </div>
      </div>

      {/* Security Note */}
      <p className="text-xs text-gray-500 text-center">
        🔒 Your payment information is secure and encrypted
      </p>
    </div>
  );

  const renderPhoneStep = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="border-b border-gray-200 pb-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Phone Verification</h3>
            <p className="text-sm text-gray-600">
              {currentStep === 'phone' ? 'Verify your number to continue' : 'Phone number verified'}
            </p>
          </div>
          {(currentStep === 'address' || currentStep === 'payment') && (
            <div className="flex items-center space-x-2 text-green-600">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          )}
        </div>
      </div>

      {currentStep === 'phone' && !otpSent ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">+91</span>
              </div>
              <input
                type="tel"
                value={addressData.phone}
                onChange={(e) => setAddressData(prev => ({ ...prev, phone: e.target.value }))}
                className={cn(
                  "w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors",
                  errors.phone ? "border-red-300" : "border-gray-300"
                )}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <Button onClick={handleSendOTP} className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Send OTP
          </Button>
        </div>
      ) : currentStep === 'phone' ? (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">OTP sent to +91 {addressData.phone}</p>
                <p className="text-xs text-blue-700">Enter the 4-digit code below</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                maxLength={1}
              />
            ))}
          </div>

          <div className="text-center">
            {otpTimer > 0 ? (
              <p className="text-sm text-gray-600">
                Resend OTP in {otpTimer}s
              </p>
            ) : (
              <button
                onClick={() => {
                  setOtpTimer(30);
                  setOtpSent(true);
                }}
                className="text-sm text-brand hover:text-brand/80 font-medium"
              >
                Resend OTP
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setOtpSent(false);
                setOtp(['', '', '', '']);
              }}
              className="flex-1"
              size="sm"
            >
              Change Number
            </Button>
            <Button 
              onClick={() => handleVerifyOTP()}
              disabled={otp.some(digit => digit === '')}
              className="flex-1"
              size="sm"
            >
              Verify
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">+91 {addressData.phone}</p>
              <p className="text-xs text-green-700">Phone number verified successfully</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAddressStep = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
        <p className="text-sm text-gray-600">Enter your delivery details</p>
      </div>

      {/* Form Fields - Flex grow to take available space */}
      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={addressData.fullName}
              onChange={(e) => setAddressData(prev => ({ ...prev, fullName: e.target.value }))}
              className={cn(
                "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors",
                errors.fullName ? "border-red-300" : "border-gray-300"
              )}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={addressData.email}
              onChange={(e) => setAddressData(prev => ({ ...prev, email: e.target.value }))}
              className={cn(
                "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors",
                errors.email ? "border-red-300" : "border-gray-300"
              )}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 *
          </label>
          <input
            type="text"
            value={addressData.addressLine1}
            onChange={(e) => setAddressData(prev => ({ ...prev, addressLine1: e.target.value }))}
            className={cn(
              "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors",
              errors.addressLine1 ? "border-red-300" : "border-gray-300"
            )}
            placeholder="House/Flat No., Building Name, Street"
          />
          {errors.addressLine1 && <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            value={addressData.addressLine2}
            onChange={(e) => setAddressData(prev => ({ ...prev, addressLine2: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
            placeholder="Landmark, Area"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input
              type="text"
              value={addressData.city}
              onChange={(e) => setAddressData(prev => ({ ...prev, city: e.target.value }))}
              className={cn(
                "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors",
                errors.city ? "border-red-300" : "border-gray-300"
              )}
              placeholder="City"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
            <input
              type="text"
              value={addressData.state}
              onChange={(e) => setAddressData(prev => ({ ...prev, state: e.target.value }))}
              className={cn(
                "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors",
                errors.state ? "border-red-300" : "border-gray-300"
              )}
              placeholder="State"
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
            <input
              type="text"
              value={addressData.pincode}
              onChange={(e) => setAddressData(prev => ({ ...prev, pincode: e.target.value }))}
              className={cn(
                "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors",
                errors.pincode ? "border-red-300" : "border-gray-300"
              )}
              placeholder="Pincode"
              maxLength={6}
            />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>
        </div>
      </div>

      {/* Buttons at bottom */}
      <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('phone')}
          className="w-24 h-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleContinueToAddress} className="flex-1 h-12">
          <CreditCard className="h-4 w-4 mr-2" />
          Continue to Payment
        </Button>
      </div>
    </div>
  );



  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  // Main component render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {currentStep === 'phone' && 'Phone Verification'}
                  {currentStep === 'address' && 'Delivery Details'}
                  {currentStep === 'payment' && 'Complete Payment'}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    currentStep === 'phone' ? "bg-brand" : currentStep === 'address' || currentStep === 'payment' ? "bg-green-500" : "bg-gray-300"
                  )} />
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    currentStep === 'address' ? "bg-brand" : currentStep === 'payment' ? "bg-green-500" : "bg-gray-300"
                  )} />
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    currentStep === 'payment' ? "bg-brand" : "bg-gray-300"
                  )} />
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-lg font-bold text-brand">{formatINR(total)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Split Layout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Checkout Flow */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Always show phone step */}
            {renderPhoneStep()}
            
            {/* Show address step below phone verification once verified */}
            {currentStep === 'address' && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                {renderAddressStep()}
              </div>
            )}
            
            {currentStep === 'payment' && (
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                {/* Header */}
                <div className="border-b border-gray-200 pb-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                  <p className="text-sm text-gray-600">Choose your preferred payment option</p>
                </div>

                {/* Address Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Delivery Address</h4>
                    <button 
                      onClick={() => setCurrentStep('address')}
                      className="text-brand hover:text-brand/80 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">{addressData.fullName}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {addressData.addressLine1}
                      {addressData.addressLine2 && `, ${addressData.addressLine2}`}
                      <br />
                      {addressData.city}, {addressData.state} - {addressData.pincode}
                    </p>
                    <p className="text-sm text-gray-600">Phone: +91 {addressData.phone}</p>
                    <p className="text-sm text-gray-600">Email: {addressData.email}</p>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">

                  {/* UPI Payment */}
                  <div className={cn(
                    "border-2 rounded-xl p-4 cursor-pointer transition-all",
                    selectedPaymentMethod === 'upi' ? "border-brand bg-brand/5" : "border-gray-200 hover:border-gray-300"
                  )} onClick={() => setSelectedPaymentMethod('upi')}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Smartphone className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">UPI Payment</h4>
                          <p className="text-sm text-gray-600">Pay using UPI apps</p>
                        </div>
                      </div>
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        selectedPaymentMethod === 'upi' ? "border-brand bg-brand" : "border-gray-300"
                      )}>
                        {selectedPaymentMethod === 'upi' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </div>
                    
                    {selectedPaymentMethod === 'upi' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="text-sm font-medium">Google Pay</span>
                          </button>
                          <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="text-sm font-medium">PhonePe</span>
                          </button>
                          <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="text-sm font-medium">Paytm</span>
                          </button>
                          <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <QrCode className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium">Scan QR</span>
                          </button>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Enter UPI ID</label>
                          <input
                            type="text"
                            placeholder="yourname@upi"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Card Payment */}
                  <div className={cn(
                    "border-2 rounded-xl p-4 cursor-pointer transition-all",
                    selectedPaymentMethod === 'card' ? "border-brand bg-brand/5" : "border-gray-200 hover:border-gray-300"
                  )} onClick={() => setSelectedPaymentMethod('card')}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Credit/Debit Card</h4>
                          <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                        </div>
                      </div>
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        selectedPaymentMethod === 'card' ? "border-brand bg-brand" : "border-gray-300"
                      )}>
                        {selectedPaymentMethod === 'card' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </div>
                    
                    {selectedPaymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="Name on card"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Net Banking */}
                  <div className={cn(
                    "border-2 rounded-xl p-4 cursor-pointer transition-all",
                    selectedPaymentMethod === 'netbanking' ? "border-brand bg-brand/5" : "border-gray-200 hover:border-gray-300"
                  )} onClick={() => setSelectedPaymentMethod('netbanking')}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Net Banking</h4>
                          <p className="text-sm text-gray-600">All major banks supported</p>
                        </div>
                      </div>
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        selectedPaymentMethod === 'netbanking' ? "border-brand bg-brand" : "border-gray-300"
                      )}>
                        {selectedPaymentMethod === 'netbanking' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </div>
                    
                    {selectedPaymentMethod === 'netbanking' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Bank</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent">
                            <option value="">Choose your bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="kotak">Kotak Mahindra Bank</option>
                            <option value="pnb">Punjab National Bank</option>
                            <option value="bob">Bank of Baroda</option>
                            <option value="canara">Canara Bank</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Wallet */}
                  <div className={cn(
                    "border-2 rounded-xl p-4 cursor-pointer transition-all",
                    selectedPaymentMethod === 'wallet' ? "border-brand bg-brand/5" : "border-gray-200 hover:border-gray-300"
                  )} onClick={() => setSelectedPaymentMethod('wallet')}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Gift className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Digital Wallets</h4>
                          <p className="text-sm text-gray-600">Paytm, Amazon Pay, etc.</p>
                        </div>
                      </div>
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        selectedPaymentMethod === 'wallet' ? "border-brand bg-brand" : "border-gray-300"
                      )}>
                        {selectedPaymentMethod === 'wallet' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </div>
                    
                    {selectedPaymentMethod === 'wallet' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="text-sm font-medium">Paytm Wallet</span>
                          </button>
                          <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="text-sm font-medium">Amazon Pay</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Payment Button */}
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessingPayment}
                    className="w-full mt-6"
                    size="lg"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5 mr-2" />
                        Pay {formatINR(total)}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div>
            {renderOrderSummary()}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
