import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen font-[Arial,Helvetica,sans-serif] overflow-y-auto">
      {children}
    </div>
  );
}