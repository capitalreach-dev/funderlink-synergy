import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Linkedin, 
  Calendar, 
  Settings, 
  LogOut, 
  Sparkles,
  BarChart2
} from "lucide-react";

interface SidebarProps {
  userType: 'founder' | 'fundraisingPro' | null;
}

export function Sidebar({ userType }: SidebarProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden lg:flex flex-col h-screen bg-sidebar text-sidebar-foreground w-64 border-r border-sidebar-border">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-md bg-white p-1">
            <div className="text-lg font-bold text-navy">CR</div>
          </div>
          <span className="font-bold text-white">Capital Reach AI</span>
        </Link>
      </div>

      <div className="flex flex-col gap-1 p-3 flex-1">
        <Link
          to="/dashboard"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isActive("/dashboard") && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/investors"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isActive("/investors") && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <Users size={20} />
          <span>Investors</span>
        </Link>

        <Link
          to="/smart-outreach"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isActive("/smart-outreach") && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <Sparkles size={20} />
          <span>Smart Outreach</span>
        </Link>

        <Link
          to="/linkedin"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isActive("/linkedin") && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <Linkedin size={20} />
          <span>LinkedIn</span>
        </Link>

        <Link
          to="/events"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isActive("/events") && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <Calendar size={20} />
          <span>Events</span>
        </Link>

        {userType === "fundraisingPro" && (
          <Link
            to="/analytics"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive("/analytics") && "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
          >
            <BarChart2 size={20} />
            <span>Analytics</span>
          </Link>
        )}
      </div>

      <div className="p-3 border-t border-sidebar-border mt-auto">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isActive("/settings") && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <Link
          to="/auth/logout"
          className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}
