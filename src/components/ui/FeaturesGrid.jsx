const featuresData = [
  {
    title: "Daily Tracking",
    description:
      "Log your daily wisdom practice and see your progress over time.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "AI Insights",
    description:
      "Get personalized wisdom suggestions based on your practice patterns.",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    iconPath:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    title: "Custom Wisdom",
    description:
      "Create your own wisdom entries and build a personal philosophy.",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
];

export default function FeaturesGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {featuresData.map((feature, index) => (
        <div
          key={index}
          className="bg-[#F9F9EB]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:scale-105 transition-transform"
        >
          <div
            className={`w-16 h-16 ${feature.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <svg
              className={`w-8 h-8 ${feature.iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={feature.iconPath}
              ></path>
            </svg>
          </div>
          <h3 className="font-headline text-xl font-semibold mb-2">
            {feature.title}
          </h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
