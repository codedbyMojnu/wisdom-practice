import DashboardHeader from "../components/ui/DashboardHeader";

export default function WisdomTemplatesPage() {
  // Hardcoded wisdom entries for the table
  const wisdomEntries = [
    {
      id: 1,
      title: "The Power of Now",
      description: "Living fully in the present moment improves mindfulness.",
      category: "Stoicism",
    },
    {
      id: 2,
      title: "Zen Simplicity",
      description: "Simplicity brings peace and clarity.",
      category: "Zen Buddhism",
    },
    {
      id: 3,
      title: "Wabi-Sabi",
      description: "Embrace imperfection and impermanence.",
      category: "Japanese Aesthetics",
    },
    {
      id: 4,
      title: "Control What You Can",
      description: "Focus on things within your control to find tranquility.",
      category: "Stoicism",
    },
    {
      id: 5,
      title: "Meditation Practice",
      description: "Regular meditation calms the mind and body.",
      category: "Zen Buddhism",
    },
    {
      id: 6,
      title: "Mono no aware",
      description: "Appreciation of the transient beauty of things.",
      category: "Japanese Aesthetics",
    },
  ];

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
        <DashboardHeader headerName="Wisdom Templates" />

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
                    Title
                  </th>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    Description
                  </th>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {wisdomEntries.map(({ id, title, description, category }) => (
                  <tr
                    key={id}
                    className="even:bg-white odd:bg-primary/5 hover:bg-primary/20 transition-colors"
                  >
                    <td className="border border-primary/40 p-3 text-sm text-gray-700">
                      {id}
                    </td>
                    <td className="border border-primary/40 p-3 text-sm text-gray-800 font-medium">
                      {title}
                    </td>
                    <td className="border border-primary/40 p-3 text-sm text-gray-700">
                      {description}
                    </td>
                    <td className="border border-primary/40 p-3 text-sm text-gray-700">
                      {category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
