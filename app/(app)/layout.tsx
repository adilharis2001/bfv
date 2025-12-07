export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar/Nav will go here in later phases */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
