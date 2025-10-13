export default function DashboardHeader({ headerName }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 px-6 py-4 shadow-sm backdrop-blur-lg">
      <div className="flex items-center justify-between lg:justify-start">
        <h1 className="font-headline text-2xl font-bold text-foreground">
          {headerName}
        </h1>
      </div>
    </header>
  );
}
