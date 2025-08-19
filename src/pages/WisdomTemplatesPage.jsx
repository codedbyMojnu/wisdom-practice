import DashboardHeader from "../components/ui/DashboardHeader";
import { useWisdomsData } from "../contexts/WisdomsContext";

export default function WisdomTemplatesPage() {
  // Hardcoded wisdom entries for the table
  const { wisdomsData, setWisdomsData } = useWisdomsData();

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        id="sidebarOverlay"
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden hidden"
      ></div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen bg-background/80">
        {/* Header */}
        <DashboardHeader headerName="Your Wisdoms" />

        {/* Content */}
        <main className="p-6">
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse table-auto">
              <thead className="bg-primary/10">
                <tr>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    #
                  </th>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    Wisdom Name
                  </th>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    Description
                  </th>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    Category
                  </th>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    Applied Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {wisdomsData?.wisdoms?.map(
                  ({ id, wisdomName, description, category }, index) => (
                    <tr
                      key={id}
                      className="even:bg-white odd:bg-primary/5 hover:bg-primary/20 transition-colors"
                    >
                      <td className="border border-primary/40 p-3 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="border border-primary/40 p-3 text-sm text-gray-800 font-medium">
                        {wisdomName}
                      </td>
                      <td className="border border-primary/40 p-3 text-sm text-gray-700">
                        {description}
                      </td>
                      <td className="border border-primary/40 p-3 text-sm text-gray-700">
                        {category}
                      </td>
                      <td className="border border-primary/40 p-3 text-sm text-gray-700">
                        0
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
