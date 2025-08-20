import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useProfile } from "../contexts/ProfileContext";

export default function ProfileData() {
  const [editMode, setEditMode] = useState(false);

  const { userInfo, loading, error, updateUserProfile } = useProfile();
  const { register, handleSubmit } = useForm();

  async function handleUserDataUpdate(data) {
    const updatedData = { ...userInfo, ...data };
    const success = await updateUserProfile(userInfo?.uid, updatedData);

    if (success) {
      toast("Profile Data Updated Successfully");
      setEditMode(false);
    }
  }

  return (
    <section className="bg-[#F9F9EB] rounded-lg border shadow-sm">
      {error && <p className="text-red-400 text-center">{error}</p>}
      {loading ? (
        <p className="text-blue-500 text-center mt-6">Loading...</p>
      ) : (
        <div className="p-6">
          <div className="flex justify-between">
            <div>
              <h2 className="font-headline text-xl font-semibold mb-2">
                Personal Information
              </h2>
              <p className="text-sm text-secondary mb-6">
                Update your account details.
              </p>
            </div>
            <div>
              <button
                className={`inline-flex items-center px-6 py-3 ${
                  editMode ? "bg-red-400" : "bg-primary"
                }  text-white font-semibold rounded-lg hover:bg-primary-dark transition`}
                onClick={() => setEditMode(!editMode)}
              >
                {!editMode ? "Edit" : "Cancel"}
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleUserDataUpdate)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                defaultValue={userInfo?.displayName}
                className={`w-full border ${
                  editMode ? "border-green-500" : "border-gray-300"
                } px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                {...register("displayName", {
                  required: "Display Name is Required",
                })}
                readOnly={!editMode}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={userInfo?.email}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-foreground mb-2"
              >
                About
              </label>
              <textarea
                id="about"
                name="about"
                rows={4}
                className={` w-full px-4 py-3 border ${
                  editMode ? "border-green-500" : "border-gray-300 "
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                defaultValue={userInfo?.about}
                {...register("about", { required: "About Field is Required" })}
                readOnly={!editMode}
              />
            </div>
            {editMode && (
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
              >
                Save Changes
              </button>
            )}
          </form>
        </div>
      )}
    </section>
  );
}
