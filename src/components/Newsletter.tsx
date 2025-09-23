"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./Button";
import { Card, CardContent } from "./Card";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      // Store in localStorage for demo
      localStorage.setItem("newsletter-email", email);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <section className="py-8 sm:py-10 md:py-12 bg-brand">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-md mx-auto p-6">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">
                  Welcome to the Family!
                </h3>
                <p className="text-gray-600">
                  Thank you for subscribing. You'll receive healthy tips and exclusive offers soon.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-brand" id="newsletter">
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
            <CardContent className="p-0">
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-brand" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2 sm:mb-3">
                  Stay Sweet & Healthy
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                  Get exclusive recipes, health tips, and special offers delivered to your inbox. 
                  Join thousands who've made the switch to healthier sweetness.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your email address"
                      className="w-full h-16 px-4 rounded-xl border border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-colors"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="sm:px-8"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>

                {error && (
                  <motion.p
                    className="text-red-600 text-sm text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}

                <div className="text-center">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By subscribing, you agree to our{" "}
                    <a href="#" className="text-brand hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and consent to receive marketing emails. You can unsubscribe at any time.
                  </p>
                </div>
              </form>

              {/* Benefits */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-brand" />
                  <span>Exclusive recipes</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-brand" />
                  <span>Health tips</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-brand" />
                  <span>Special offers</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
