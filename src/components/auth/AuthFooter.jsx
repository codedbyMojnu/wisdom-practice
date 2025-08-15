import { Link } from "react-router";

export default function AuthFooter() {
  return (
    <div className="text-center mt-6">
      <Link
        to="/"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
}
