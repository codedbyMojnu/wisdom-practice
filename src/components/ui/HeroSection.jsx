import { Link } from "react-router";

export default function HeroSection() {
  return (
    <div className="mb-16">
      <h1 className="font-headline text-6xl md:text-7xl font-bold text-primary mb-6 drop-shadow-lg">
        Wisdom Compass
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Transform ancient philosophy into daily practice. Track your growth,
        build wisdom, and live with intention.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/login"
          className="px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary/90 shadow-lg transition-colors flex items-center justify-center"
        >
          Get Started
        </Link>
        <Link
          to="/signup"
          className="px-8 py-4 border-2 border-primary text-primary rounded-lg text-lg font-semibold hover:bg-primary/10 shadow-lg transition-colors flex items-center justify-center"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
