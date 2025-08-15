import { getAuth } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthData } from "../../contexts/AuthContext";
import { handleChangePassword } from "../../utils/firebaseAuth";

export default function ResetPassword() {
  const { authData } = useAuthData();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  async function handleResetPassword(data) {
    await handleChangePassword(
      auth.currentUser, // real Firebase User object
      auth.currentUser?.email,
      data?.currentPassword,
      data?.newPassword
    );
    toast("Password Reset Successfull");
    reset();
  }
  return (
    <section className="bg-[#F9F9EB] rounded-lg border shadow-sm">
      <div className="p-6">
        <h2 className="font-headline text-xl font-semibold mb-2">
          Change Password
        </h2>
        <p className="text-sm text-secondary mb-6">
          Update your password to keep your account secure.
        </p>

        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("currentPassword", {
                required: "Current Password Is Required",
              })}
            />
            <p className="text-xs text-red-400">
              {errors?.currentPassword?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-foreground mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("newPassword", {
                required: "New Password is Required",
              })}
            />
            <p className="text-xs text-red-400">
              {errors?.newPassword?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("confirmPassword", {
                required: "confirm password is required",
                validate: (val) => {
                  return val === watch("newPassword") || "Password Don't Match";
                },
              })}
            />
            <p className="text-xs text-red-400">
              {errors?.confirmPassword?.message}
            </p>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </section>
  );
}
