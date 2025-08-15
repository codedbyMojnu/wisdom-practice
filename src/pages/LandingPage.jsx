import CommonLayout from "../components/layout/CommonLayout";
import FeaturesGrid from "../components/ui/FeaturesGrid";
import HeroSection from "../components/ui/HeroSection";
import PhilosophyQuote from "../components/ui/PhilosophyQuote";

export default function LandingPage() {
  return (
    <CommonLayout>
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <HeroSection />

          <FeaturesGrid />

          {/* Philosophy Quote */}
          <PhilosophyQuote />
        </div>
      </div>
    </CommonLayout>
  );
}
