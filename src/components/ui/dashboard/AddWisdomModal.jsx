import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { wisdomCategories } from "../../../constants/wisdomCategory";
import { useAuth } from "../../../hooks/useAuth";
import { useWisdoms } from "../../../hooks/useWisdoms";
import { saveWisdomDataToFireStore } from "../../../services/fireStoreDB";
import Button from "../../ui/primitives/Button";
import Modal from "../../ui/primitives/Modal";

export default function AddWisdomModal({ onClose, isOpen = true }) {
  const [loading, setLoading] = useState(false);
  const { authData } = useAuth();
  const { wisdomsData, setWisdomsData } = useWisdoms();

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-[92vh] w-full max-w-lg overflow-y-auto p-6"
    >
      <header className="mb-6 flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="font-headline text-2xl font-semibold text-foreground">
            Add New Wisdom
          </h2>
          <p className="text-sm text-muted-foreground">
            Capture the wisdom you want to revisit throughout the week.
          </p>
        </div>
        {/* Close handled by Modal primitive */}
      </header>

      <form onSubmit={handleSubmit(handleWisdomSubmit)} className="space-y-5">
        <div>
          <label htmlFor="wisdomName" className="input-label">
            Wisdom Name
          </label>
          <input
            id="wisdomName"
            type="text"
            className="input-field"
            placeholder="Enter wisdom name"
            {...register("wisdomName", {
              required: "Provide a wisdom name",
              minLength: {
                value: 4,
                message: "At least 4 characters",
              },
            })}
          />
          {errors.wisdomName && (
            <p className="mt-2 text-sm text-destructive">
              {errors.wisdomName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="input-label">
            Description
          </label>
          <textarea
            id="description"
            className="input-field min-h-[120px] resize-none"
            placeholder="Describe the intent or reminder for this wisdom"
            {...register("description", {
              required: "Add a short description",
              minLength: {
                value: 10,
                message: "At least 10 characters",
              },
            })}
          />
          {errors.description && (
            <p className="mt-2 text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="input-label">
            Category
          </label>
          <select
            id="category"
            className="input-field"
            defaultValue=""
            {...register("category", {
              required: "Choose a category",
            })}
          >
            <option value="" disabled>
              Select a category
            </option>
            {wisdomCategories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-2 text-sm text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Wisdom"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
