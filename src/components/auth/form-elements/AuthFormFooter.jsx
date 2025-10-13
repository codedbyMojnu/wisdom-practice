import { Link } from "react-router-dom";
import Button from "../../ui/primitives/Button";

const AuthFormFooter = ({ mode }) => {
  return (
    <div className="mt-6 text-center text-sm text-muted-foreground">
      {mode === "login" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Button
            as={Link}
            to="/signup"
            variant="outline"
            className="ml-2 px-2 py-1 text-sm font-medium"
          >
            Sign up
          </Button>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Button
            as={Link}
            to="/login"
            variant="outline"
            className="ml-2 px-2 py-1 text-sm font-medium"
          >
            Log in
          </Button>
        </p>
      )}
    </div>
  );
};

export default AuthFormFooter;
