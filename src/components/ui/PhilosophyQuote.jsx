import Card from "./primitives/Card";

export default function PhilosophyQuote() {
  return (
    <Card className="mx-auto max-w-3xl p-8 text-left">
      <blockquote className="mb-4 text-xl italic text-muted-foreground">
        "The unexamined life is not worth living."
      </blockquote>
      <cite className="text-primary font-semibold">— Socrates</cite>
    </Card>
  );
}
