import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import GoogleIcon from "../../assets/icons/googleIcon";
import { useAuthData } from "../../contexts/AuthContext";
import {
  registerWithEmailPassword,
  signInWithEmailPassword,
  signInWithGoogleAuthProvider,
} from "../../utils/firebaseAuth";

export default function AuthForm({ mode }) {
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { authData, setAuthData } = useAuthData();
  const navigate = useNavigate();

  async function handleFormSubmit(data) {
    setLoading(true);
    const name = data?.firstName + " " + data?.lastName;
    if (mode == "signup") {
      const user = await registerWithEmailPassword(
        name,
        data?.email,
        data?.password
      );
      if (user) {
        setAuthData({
          user: {
            email: user?.email,
            displayName: user?.displayName,
            emailVerified: user?.emailVerified,
            photoURL: user?.providerData?.photoURL,
            uid: user?.uid,
          },
        });
        setLoading(false);
        navigate("/dashboard");
      } else {
        setError("Signup Fail");
        setLoading(false);
      }
    } else {
      const user = await signInWithEmailPassword(data?.email, data?.password);

      if (user?.email) {
        setAuthData({
          user: {
            email: user?.email,
            displayName: user?.displayName,
            emailVerified: user?.emailVerified,
            photoURL: user?.providerData?.photoURL,
            uid: user?.uid,
          },
        });

        navigate("/dashboard");
        setLoading(false);
      } else {
        setError("Login Fail");
        setLoading(false);
      }
    }
  }

  async function handleGoogleLogin() {
    setIsGoogleLoading(true);
    const user = await signInWithGoogleAuthProvider();
    if (user) {
      setAuthData({
        user: {
          email: user?.email,
          displayName: user?.displayName,
          emailVerified: user?.emailVerified,
          photoURL: user?.providerData?.photoURL,
          uid: user?.uid,
          providerId: user?.providerData?.providerId,
        },
      });

      setIsGoogleLoading(false);
      navigate("/dashboard");
    } else {
      setError("Google Login Fail");
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="bg-[#F9F9EB]/90 backdrop-blur-sm rounded-xl p-8 shadow-xl">
      {isGoogleLoading && (
        <div className="flex justify-center items-center h-full">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-transparent align-[-0.125em]"></div>
        </div>
      )}

      {!isGoogleLoading && (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {error && <p className="text-center text-red-400">{error}</p>}
          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg form-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="First name"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First Name Should have Min 2 Charecters",
                    },
                  })}
                />
                {errors?.firstName && (
                  <p className="text-red-400 text-xs">
                    {errors?.firstName?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg form-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Last name"
                  {...register("lastName", {
                    required: "Last Name is Required",
                    minLength: {
                      value: 2,
                      message: "Last Name Should Minimum 2 Charecter",
                    },
                  })}
                />
                {errors?.lastName && (
                  <p className="text-red-400 text-xs">
                    {errors?.lastName?.message}
                  </p>
                )}
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg form-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors?.email && (
              <p className="text-red-400 text-xs">{errors?.email?.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg form-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Create a password"
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 8,
                  message: "Password Should Mininmum 8 Length",
                },
              })}
            />
            {errors?.password && (
              <p className=" text-red-400 text-xs mt-1">
                {errors?.password?.message}
              </p>
            )}
          </div>

          {mode === "signup" && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg form-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm Password is Required",
                  validate: (val) => {
                    return val == watch("password") || "Password Don't Match";
                  },
                })}
              />
              {errors?.confirmPassword && (
                <p className="text-red-400 text-xs">
                  {errors?.confirmPassword?.message}
                </p>
              )}
            </div>
          )}

          {mode === "signup" && (
            <div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                  {...register("terms", {
                    required: "You must agree to Our Terms and Service.",
                  })}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-muted-foreground"
                >
                  I agree to the
                  <a href="#" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </a>
                  and
                  <a href="#" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors?.terms && (
                <p className="text-red-400 text-xs">{errors?.terms?.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {loading && (
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-gray-300 border-t-transparent align-[-0.125em] mr-2"
                aria-label="Loading"
                role="status"
              ></div>
            )}
            {mode === "signup" ? "Create Account" : "Login"}
          </button>
        </form>
      )}

      {/* <!-- Divider --> */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#F9F9EB] text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* <!-- Social Signup --> */}
      <div className="space-y-3">
        <button
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-foreground hover:bg-gray-50 transition-colors"
          onClick={handleGoogleLogin}
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </div>

      {/* <!-- Login Link --> */}
      <p className="text-center mt-6 text-sm text-muted-foreground">
        {mode === "signup" ? "Already have an account? " : "New Here? "}
        <Link
          to={mode === "signup" ? "/login" : "/signup"}
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          {mode === "signup" ? "Login Now" : "Signup Now"}
        </Link>
      </p>
    </div>
  );
}
