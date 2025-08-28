import { useState } from "react";
import { useAuthData } from "../../../contexts/AuthContext";
import { useWisdomsData } from "../../../contexts/WisdomsContext";
import { updateWisdomData } from "../../../utils/fireStoreDB";
import { wisdomCategories } from "../../../utils/wisdomCategory";

export default function EditWisdomModal({ wisdom, onClose }) {
  const [formData, setFormData] = useState({
    wisdomName: wisdom?.wisdomName || "",
    category: wisdom?.category || "",
    description: wisdom?.description || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setWisdomsData } = useWisdomsData();
  const { authData } = useAuthData();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.wisdomName.trim() || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const updatedWisdom = {
        id: wisdom.id, // Ensure ID is always present
        wisdomName: formData.wisdomName.trim(),
        category: formData.category,
        description: formData.description.trim() || "", // Ensure description is never undefined
        // Preserve any other existing fields from the original wisdom
        ...Object.fromEntries(
          Object.entries(wisdom).filter(
            ([key]) => !["wisdomName", "category", "description"].includes(key)
          )
        ),
      };

      const success = await updateWisdomData(
        authData?.user?.uid,
        updatedWisdom
      );

      if (success) {
        // Update local state
        setWisdomsData((prev) => {
          const updatedWisdoms =
            prev.wisdoms?.map((w) =>
              w.id === wisdom.id ? updatedWisdom : w
            ) || [];

          return {
            ...prev,
            wisdoms: updatedWisdoms,
          };
        });

        onClose();
      }
    } catch (error) {
      console.error("Error updating wisdom:", error);
      alert("Failed to update wisdom. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full pointer-events-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-primary">Edit Wisdom</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Wisdom Name */}
          <div>
            <label
              htmlFor="wisdomName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Wisdom Name *
            </label>
            <input
              type="text"
              id="wisdomName"
              name="wisdomName"
              value={formData.wisdomName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Enter wisdom name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Select a category</option>
              {wisdomCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter description (optional)"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all duration-200"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Wisdom"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
