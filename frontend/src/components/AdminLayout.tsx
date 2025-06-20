'use client'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 bg-black text-white min-h-screen">
      {children}
    </div>
  );
}
