import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthData } from "../../../contexts/AuthContext";
import { useWisdomsData } from "../../../contexts/WisdomsContext";
import { saveWisdomDataToFireStore } from "../../../utils/fireStoreDB";
import { wisdomCategories } from "../../../utils/wisdomCategory";

export default function AddWisdomModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const { authData } = useAuthData();
  const { wisdomsData, setWisdomsData } = useWisdomsData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleWisdomSubmit(data) {
    setLoading(true);
    const wisdomData = {
      id: crypto.randomUUID(),
      wisdomName: data.wisdomName,
      description: data.description,
      category: data.category,
      createdAt: new Date(),
    };

    const isSaved = await saveWisdomDataToFireStore(
      authData?.user?.uid,
      wisdomData
    );
    if (isSaved) {
      setWisdomsData({
        ...wisdomsData,
        wisdoms: [...(wisdomsData?.wisdoms || []), wisdomData],
      });
      setLoading(false);
      onClose();
      toast.success("Wisdom added successfully");
    } else {
      toast.error("Failed to add wisdom");
      setLoading(false);
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="bg-[#F9F9EB] rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-200 ease-out opacity-100 scale-100 translate-y-0"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#240F0F]">
              Add New Wisdom Name To Practice
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              onClick={onClose}
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
                ></path>
              </svg>
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(handleWisdomSubmit)}
            className="space-y-4"
          >
            {/* Wisdom Title */}
            <div>
              <label className="block text-sm font-medium text-[#240F0F] mb-2">
                Wisdom Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#388E3C] focus:border-transparent transition-all"
                placeholder="Enter wisdom name"
                {...register("wisdomName", {
                  required: "Wisdom name is required",
                  minLength: {
                    value: 4,
                    message: "Wisdom name must be at least 4 characters long",
                  },
                })}
              />
              {errors.wisdomTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.wisdomTitle.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#240F0F] mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#388E3C] focus:border-transparent transition-all resize-none"
                rows="3"
                placeholder="Describe this wisdom..."
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long",
                  },
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[#240F0F] mb-2">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#388E3C] focus:border-transparent transition-all"
                {...register("category", {
                  required: "Category is required",
                })}
              >
                {wisdomCategories?.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                type="button"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                {loading ? "Adding Wisdom..." : "Add Wisdom"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
