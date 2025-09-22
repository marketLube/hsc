import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Card } from "./Card";
import { Button } from "./Button";
import { BANNER_TILES } from "@/lib/data";

export function BannerGrid() {
  return (
    <section className="py-16 bg-gray-50" id="benefits">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            Why Choose Healthy Sugar?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover the benefits of plant-based sweetness that doesn't compromise on taste or health.
          </p>
          <Link href="/benefits">
            <Button size="lg" className="mb-8">
              Learn More About Benefits
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BANNER_TILES.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card hover className="h-full overflow-hidden group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand transition-colors">
                      {tile.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {tile.subtitle}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-premium">
            <h3 className="text-2xl font-bold text-ink mb-6">
              The Science Behind Stevia
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h4 className="font-semibold text-ink mb-2">Plant-Based</h4>
                <p className="text-gray-600 text-sm">
                  Extracted from the stevia leaf, a natural source of sweetness used for centuries.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="font-semibold text-ink mb-2">Low Glycemic</h4>
                <p className="text-gray-600 text-sm">
                  Minimal impact on blood sugar levels, making it suitable for various dietary needs.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔥</span>
                </div>
                <h4 className="font-semibold text-ink mb-2">Heat Stable</h4>
                <p className="text-gray-600 text-sm">
                  Perfect for cooking and baking, maintains sweetness even at high temperatures.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
