export default function AuthHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-8">
      <h1 className="font-headline text-3xl font-bold text-primary mb-2">
        {title}
      </h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
