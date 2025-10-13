const base =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 disabled:opacity-60 disabled:pointer-events-none";
const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline: "border border-border bg-white text-foreground hover:bg-muted/50",
};
const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  as: Comp = "button",
  size = "md",
  isLoading = false,
  ...props
}) {
  const content = isLoading ? (
    <span className="inline-flex items-center gap-2">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      <span>Loading…</span>
    </span>
  ) : (
    children
  );

  return (
    <Comp
      className={`${base} ${variants[variant] || ""} ${
        sizes[size] || ""
      } ${className}`}
      aria-busy={isLoading || undefined}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {content}
    </Comp>
  );
}
