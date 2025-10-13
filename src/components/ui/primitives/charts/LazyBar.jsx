import React, { Suspense } from "react";

const Bar = React.lazy(async () => {
  const mod = await import("react-chartjs-2");
  return { default: mod.Bar };
});

export default function LazyBar(props) {
  return (
    <Suspense
      fallback={
        <div className="h-64 w-full" aria-busy>
          Loading chart…
        </div>
      }
    >
      <Bar {...props} />
    </Suspense>
  );
}
