import React, { Suspense } from "react";

const Doughnut = React.lazy(async () => {
  const mod = await import("react-chartjs-2");
  return { default: mod.Doughnut };
});

export default function LazyDoughnut(props) {
  return (
    <Suspense
      fallback={
        <div className="h-64 w-full" aria-busy>
          Loading chart…
        </div>
      }
    >
      <Doughnut {...props} />
    </Suspense>
  );
}
