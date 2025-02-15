import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div 
      className="min-h-screen font-[Arial,Helvetica,sans-serif] overflow-y-auto"
      style={{
        background: 'linear-gradient(130deg, rgba(249, 241, 249, 1) 0%, rgba(234, 243, 253, 1) 35%, rgba(237, 251, 242, 1) 100%)'
      }}
    >
      <main>{children}</main>
    </div>
  );
}