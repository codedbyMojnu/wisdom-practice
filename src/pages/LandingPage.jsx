import CommonLayout from "../components/layout/CommonLayout";
import FeaturesGrid from "../components/ui/FeaturesGrid";
import HeroSection from "../components/ui/HeroSection";
import PhilosophyQuote from "../components/ui/PhilosophyQuote";

export default function LandingPage() {
  return (
    <CommonLayout showOverlay={false}>
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-16 text-center">
        <HeroSection />
        <FeaturesGrid />
        <PhilosophyQuote />
      </div>
    </CommonLayout>
  );
}
