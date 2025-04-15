
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  userType?: 'founder' | 'fundraisingPro' | null;
}

export function Layout({ children, showSidebar = false, userType = null }: LayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {showSidebar && user && <Sidebar userType={userType} />}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
