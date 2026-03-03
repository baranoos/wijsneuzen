import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { BordenOverviewSection } from "@/components/home/borden-overview-section"
import { getPageContent } from "@/lib/page-content"

export default async function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <BordenOverviewSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
