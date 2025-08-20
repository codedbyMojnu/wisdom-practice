export default function DashboardHeader({ headerName }) {
  return (
    <header className="bg-[#F9F9EB] shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-foreground font-headline sm:ml-12">
            {headerName}
          </h1>
        </div>
      </div>
    </header>
  );
}
