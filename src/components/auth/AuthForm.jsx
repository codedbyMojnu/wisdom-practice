import { Link } from "react-router";
import { useAuthForm } from "../../hooks/useAuthForm";
import AuthFormFooter from "./form-elements/AuthFormFooter";
import FormField from "./form-elements/FormField";
import SocialLogin from "./form-elements/SocialLogin";

export default function AuthForm({ mode }) {
  const {
    loading,
    isGoogleLoading,
    error,
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    handleGoogleSignIn,
  } = useAuthForm(mode);

  return (
    <div className="glass-card px-8 py-10">
      <header className="mb-8 text-center">
        <h2 className="font-headline text-3xl font-bold text-primary">
          {mode === "login" ? "Welcome Back" : "Create Your Account"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login"
            ? "Sign in to continue your wisdom journey."
            : "Join the community and start logging your daily wisdom."}
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        {mode === "signup" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="First Name"
              type="text"
              name="firstName"
              register={register}
              errors={errors}
              placeholder="First name"
            />
            <FormField
              label="Last Name"
              type="text"
              name="lastName"
              register={register}
              errors={errors}
              placeholder="Last name"
            />
          </div>
        )}
        <FormField
          label="Email"
          type="email"
          name="email"
          register={register}
          errors={errors}
          placeholder="you@example.com"
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          placeholder="••••••••"
        />
        {mode === "signup" && (
          <FormField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            register={register}
            errors={errors}
            placeholder="••••••••"
            watch={watch}
          />
        )}
        {mode === "signup" && (
          <div>
            <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-white/80 px-4 py-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="mt-1 h-4 w-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                {...register("terms", {
                  required: "You must agree to Our Terms and Service.",
                })}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the
                <a
                  href="#"
                  className="pl-1 font-medium text-primary hover:text-primary/80"
                >
                  Terms of Service
                </a>
                and
                <a
                  href="#"
                  className="pl-1 font-medium text-primary hover:text-primary/80"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors?.terms && (
              <p className="mt-2 text-xs text-destructive">
                {errors?.terms?.message}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            Remember me
          </label>
          {mode === "login" && (
            <div>
              <Link
                to="/reset-password"
                className="font-medium text-primary hover:text-primary/80"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading
              ? "Loading..."
              : mode === "login"
              ? "Sign in"
              : "Create an account"}
          </button>
        </div>
        <SocialLogin
          handleGoogleSignIn={handleGoogleSignIn}
          isGoogleLoading={isGoogleLoading}
        />
      </form>

      <AuthFormFooter mode={mode} />
    </div>
  );
}
