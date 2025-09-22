import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { FloatingNav } from "@/components/FloatingNav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-fg">
      <FloatingNav cartCount={0} />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand/5 via-white to-brand/10">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-8">📄</div>
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">
              Article Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sorry, we couldn't find the article you're looking for. 
              It may have been moved or doesn't exist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/benefits">
                <Button size="lg">
                  View All Articles
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
}
