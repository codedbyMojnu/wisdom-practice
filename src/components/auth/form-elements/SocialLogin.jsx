import GoogleIcon from "../../../assets/icons/googleIcon";
import Button from "../../ui/primitives/Button";

const SocialLogin = ({ handleGoogleSignIn, isGoogleLoading }) => {
  return (
    <>
      <div className="my-6 flex items-center justify-between text-sm text-muted-foreground">
        <span className="divider-line" aria-hidden="true"></span>
        <span className="shrink-0 px-3 text-xs uppercase tracking-wide text-muted-foreground/80">
          Or continue with
        </span>
        <span className="divider-line" aria-hidden="true"></span>
      </div>
      <Button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
        variant="outline"
        className="w-full flex gap-2"
      >
        <GoogleIcon />
        {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
      </Button>
    </>
  );
};

export default SocialLogin;
