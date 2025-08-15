export default function WisdomCountChart() {
  return (
    <div className="lg:col-span-2">
      <div className="bg-[#F9F9EB] rounded-lg border shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-headline text-lg font-semibold">
                Wisdom Progress
              </h3>
              <p className="text-sm text-gray-500">
                Your applied and missed wisdom entries over time.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#388E3C]">
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#388E3C]">
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
          {/*  */}
          <div className="relative h-[250px] w-full bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
