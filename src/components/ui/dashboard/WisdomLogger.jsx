import { useState } from "react";
import AddWisdomModal from "./AddWisdomModal";

export default function WisdomLogger() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-[#F9F9EB] rounded-lg border shadow-sm">
      {openModal && <AddWisdomModal onClose={() => setOpenModal(false)} />}
      <div className="p-6">
        <h3 className="font-headline text-lg font-semibold mb-2">
          Daily Wisdom Log
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          What wisdom did you practice today?
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#240F0F] mb-2">
              Select Wisdom
            </label>
            <div className="flex gap-2">
              <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#388E3C]">
                <option value="">Choose a wisdom to log...</option>
                <option value="gw-1">Memento Mori</option>
                <option value="gw-2">Amor Fati</option>
                <option value="gw-3">The Obstacle Is The Way</option>
                <option value="gw-4">Ego is the Enemy</option>
                <option value="gw-5">Beginner's Mind (Shoshin)</option>
                <option value="gw-6">Wabi-Sabi</option>
              </select>
              <button
                type="button"
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                onClick={() => setOpenModal(true)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 bg-[#388E3C] text-white py-2 px-4 rounded-md hover:bg-[#388E3C]/90 transition-colors flex items-center justify-center"
            >
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
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Applied
            </button>
            <button
              type="button"
              className="flex-1 bg-[#D32F2F] text-white py-2 px-4 rounded-md hover:bg-[#D32F2F]/90 transition-colors flex items-center justify-center"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Missed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
