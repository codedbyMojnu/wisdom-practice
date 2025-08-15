import AuthFooter from "../components/auth/AuthFooter";
import AuthForm from "../components/auth/AuthForm";
import AuthHeader from "../components/auth/AuthHeader";
import CommonLayout from "../components/layout/CommonLayout";

export default function LoginPage() {
  return (
    <CommonLayout>
      <div className="fixed inset-0 bg-background/50"></div>

      {/* <!-- Main Content --> */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* <!-- Header --> */}
          <AuthHeader
            title={"Welcome Back"}
            subtitle="Sign in to continue your wisdom journey"
          />

          {/* <!-- Login Form --> */}
          <AuthForm mode="login" />

          {/* <!-- Back to Home --> */}
          <AuthFooter />
        </div>
      </div>
    </CommonLayout>
  );
}
