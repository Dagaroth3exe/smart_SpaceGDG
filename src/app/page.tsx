import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AIChatSection from "@/components/sections/AIChatSection";
import MarketStats from "@/components/sections/MarketStats";
import PropertyListings from "@/components/sections/PropertyListings";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AIChatSection />
      <MarketStats />
      <PropertyListings />
      <CTASection />
      <Footer />
    </main>
  );
}
