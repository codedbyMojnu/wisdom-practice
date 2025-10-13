import AuthForm from "../components/auth/AuthForm";
import CommonLayout from "../components/layout/CommonLayout";

export default function LoginPage() {
  return (
    <CommonLayout>
      <div className="mx-auto w-full max-w-md">
        <AuthForm mode="login" />
      </div>
    </CommonLayout>
  );
}
