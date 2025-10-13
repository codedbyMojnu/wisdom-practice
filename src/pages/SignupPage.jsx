import AuthForm from "../components/auth/AuthForm";
import CommonLayout from "../components/layout/CommonLayout";

export default function SignupPage() {
  return (
    <CommonLayout>
      <div className="mx-auto w-full max-w-md">
        <AuthForm mode="signup" />
      </div>
    </CommonLayout>
  );
}
