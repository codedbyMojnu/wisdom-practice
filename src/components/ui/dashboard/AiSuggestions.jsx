export default function AiSuggestions() {
  return (
    <div className="bg-[#F9F9EB] rounded-lg border shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-6 h-6 text-[#D4AC0D]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            ></path>
          </svg>
          <h3 className="text-lg font-semibold">AI-Powered Suggestions</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Discover new wisdom based on your recent logs.
        </p>
        <div className="min-h-[120px]">
          <div className="text-center text-gray-500 pt-4">
            Click the button to get new suggestions.
          </div>
        </div>
        <button className="w-full bg-[#D4AC0D] text-[#240F0F] py-2 px-4 rounded-md hover:bg-[#D4AC0D]/90 transition-colors flex items-center justify-center mt-4">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            ></path>
          </svg>
          Get New Suggestions
        </button>
      </div>
    </div>
  );
}
