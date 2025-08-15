import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useAuthData } from "../../../contexts/AuthContext";
import { saveWisdomDataToFireStore } from "../../../utils/fireStoreDB";

export default function AddWisdomModal({ onClose }) {
  const { authData } = useAuthData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleWisdomSubmit(data) {
    const wisdomData = {
      uid: authData?.user?.uid,
      wisdomTitle: data.wisdomTitle,
      description: data.description,
      category: data.category,
      createdAt: new Date(),
    };

    const isSaved = await saveWisdomDataToFireStore(
      authData?.user?.uid,
      wisdomData
    );
    if (isSaved) {
      toast.success("Wisdom added successfully");
      onClose();
    } else {
      toast.error("Failed to add wisdom");
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <ToastContainer />
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
              Add New Wisdom To Practice
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
                Wisdom Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#388E3C] focus:border-transparent transition-all"
                placeholder="Enter wisdom title"
                {...register("wisdomTitle", {
                  required: "Wisdom title is required",
                  minLength: {
                    value: 4,
                    message: "Wisdom title must be at least 4 characters long",
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
                <option value="">Select a category</option>
                <option value="stoicism">Stoicism</option>
                <option value="buddhism">Buddhism</option>
                <option value="zen">Zen</option>
                <option value="philosophy">General Philosophy</option>
                <option value="mindfulness">Mindfulness</option>
                <option value="personal">Personal Wisdom</option>
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
                Add Wisdom
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
