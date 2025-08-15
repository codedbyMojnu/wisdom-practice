export default function CommonLayout({ children }) {
  return (
    <div className="font-body bg-background text-foreground">
      {/* <!-- Background Image --> */}
      <div className="fixed inset-0 philosophy-bg"></div>
      <div className="fixed inset-0 bg-background/50"></div>
      {children}
    </div>
  );
}
