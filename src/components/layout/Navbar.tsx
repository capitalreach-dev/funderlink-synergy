
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-brand-navy">FunderLink</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/investors"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Investors
            </Link>
            <Link
              to="/outreach"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Outreach
            </Link>
            <Link
              to="/updates"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Updates
            </Link>
            <Link
              to="/events"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Events
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-brand-teal" />
              </Button>
              <div className="hidden md:flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2">
                  <AvatarCustom 
                    src={user.profilePicture} 
                    name={user.name} 
                    size="sm" 
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/investors"
              className="text-sm font-medium hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Investors
            </Link>
            <Link
              to="/outreach"
              className="text-sm font-medium hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Outreach
            </Link>
            <Link
              to="/updates"
              className="text-sm font-medium hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Updates
            </Link>
            <Link
              to="/events"
              className="text-sm font-medium hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            {user && (
              <>
                <Link
                  to="/profile"
                  className="text-sm font-medium hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
