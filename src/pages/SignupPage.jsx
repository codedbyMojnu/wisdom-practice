import AuthFooter from "../components/auth/AuthFooter";
import AuthForm from "../components/auth/AuthForm";
import AuthHeader from "../components/auth/AuthHeader";
import CommonLayout from "../components/layout/CommonLayout";

export default function SignupPage() {
  return (
    <CommonLayout>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthHeader
            title="Join The Journey"
            subtitle="Create your account to start tracking your wisdom practice"
          />
          <AuthForm mode="signup" />
          <AuthFooter />
        </div>
      </div>
    </CommonLayout>
  );
}
