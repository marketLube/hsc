import { motion } from "framer-motion";
import { Check, Leaf, Thermometer, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";

export function SteviaScience() {
  const benefits = [
    {
      icon: Leaf,
      title: "Plant-Derived Glycosides",
      description: "Steviol glycosides are the sweet compounds naturally found in stevia leaves, providing intense sweetness without calories."
    },
    {
      icon: BarChart3,
      title: "Low Glycemic Impact†",
      description: "Stevia has minimal effect on blood glucose levels, making it suitable for various dietary requirements."
    },
    {
      icon: Thermometer,
      title: "Heat Stable for Beverages",
      description: "Maintains its sweetening properties even at high temperatures, perfect for hot drinks and cooking."
    }
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white" id="science">
      <Container>
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-3 sm:mb-4">
            The Science of Stevia
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Understanding what makes stevia a superior natural sweetener for modern lifestyles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-6 sm:mb-8">
          {/* Left Section - Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-ink mb-4 sm:mb-6">
              What makes stevia sweet?
            </h3>
            
            {/* Video Placeholder */}
            <div className="relative">
              <div className="relative h-48 sm:h-56 md:h-64 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-brand to-brand/80 flex items-center justify-center">
                {/* Video Placeholder */}
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Stevia Leaf Macro</p>
                  <p className="text-sm text-white/80">Click to play video</p>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-premium">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand">300x</div>
                  <div className="text-xs text-gray-600">Sweeter than sugar</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Benefits Points */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="p-6 border-l-4 border-l-brand hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="h-6 w-6 text-brand" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-ink mb-2 text-base">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Full Width Disclaimer */}
        <motion.div
          className="mb-8 p-4 bg-gray-50 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <Check className="h-4 w-4 text-brand flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-700 leading-relaxed text-center">
                <strong>Safe for pregnant women and children.</strong> Approved by health authorities worldwide for all age groups.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Centered Learn More Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link href="/science">
            <Button size="lg">
              Learn More About The Science
            </Button>
          </Link>
        </motion.div>

        {/* Research Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-brand text-white rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Backed by Research</h3>
              <p className="text-white/90 max-w-2xl mx-auto">
                Stevia has been extensively studied and is recognized by food safety authorities worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">2008</div>
                <p className="text-white/90 text-sm">FDA approved stevia as safe</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">200+</div>
                <p className="text-white/90 text-sm">Scientific studies conducted</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">60+</div>
                <p className="text-white/90 text-sm">Countries approve stevia use</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
