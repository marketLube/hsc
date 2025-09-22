import { motion } from "framer-motion";
import { Container } from "./Container";
import { USP_ITEMS } from "@/lib/data";

export function USPStrip() {
  return (
    <section className="py-4 sm:py-6 md:py-8 bg-white border-b border-gray-100">
      <Container>
        <motion.div
          className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {USP_ITEMS.map((item, index) => (
            <motion.div
              key={item}
              className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand rounded-full" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
