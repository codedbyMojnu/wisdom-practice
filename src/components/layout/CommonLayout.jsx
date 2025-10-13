export default function CommonLayout({
  children,
  showOverlay = true,
  mainClassName = "",
}) {
  return (
    <div className="page-shell">
      {showOverlay ? (
        <div
          className="absolute inset-0 -z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="philosophy-bg absolute inset-0 opacity-20" />
          <div className="page-shell__overlay" />
        </div>
      ) : null}
      <main
        className={`relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 ${mainClassName}`.trim()}
      >
        <div className="w-full max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
