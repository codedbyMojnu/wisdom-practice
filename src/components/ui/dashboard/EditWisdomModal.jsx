import { useState } from "react";
import { wisdomCategories } from "../../../constants/wisdomCategory";
import { useAuth } from "../../../hooks/useAuth";
import { useWisdoms } from "../../../hooks/useWisdoms";
import { updateWisdomData } from "../../../services/fireStoreDB";
import Button from "../../ui/primitives/Button";
import Modal from "../../ui/primitives/Modal";

export default function EditWisdomModal({ wisdom, onClose, isOpen = true }) {
  const { authData } = useAuth();
  const { setWisdomsData } = useWisdoms();
  const [formData, setFormData] = useState({
    wisdomName: wisdom?.wisdomName || "",
    category: wisdom?.category || "",
    description: wisdom?.description || "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-lg p-6">
      <header className="mb-6 flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="font-headline text-2xl font-semibold text-foreground">
            Edit Wisdom
          </h2>
          <p className="text-sm text-muted-foreground">
            Adjust the title, category, or reminder for this wisdom entry.
          </p>
        </div>
        {/* Close handled by Modal primitive */}
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="wisdomName" className="input-label">
            Wisdom Name
          </label>
          <input
            type="text"
            id="wisdomName"
            name="wisdomName"
            value={formData.wisdomName}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter wisdom name"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="input-label">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="input-field"
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

        <div>
          <label htmlFor="description" className="input-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="input-field min-h-[120px] resize-none"
            placeholder="Enter description (optional)"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Wisdom"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
