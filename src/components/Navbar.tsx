
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Bell, User, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-md bg-navy p-1">
              <div className="text-lg font-bold text-white">CR</div>
            </div>
            <span className="hidden font-bold text-navy md:inline-block">Capital Reach AI</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Dashboard</Link>
              <Link to="/investors" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Investors</Link>
              <Link to="/smart-outreach" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Smart Outreach</Link>
              <Link to="/blog" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Blog</Link>
            </>
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                <Link to="/profile">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </>
          ) : (
            <Button asChild className="hidden md:inline-flex">
              <Link to="/auth/login">Sign In</Link>
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("border-t md:hidden", isMobileMenuOpen ? "block" : "hidden")}>
        <nav className="grid gap-2 p-4">
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Dashboard</Link>
              <Link to="/investors" className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Investors</Link>
              <Link to="/smart-outreach" className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Smart Outreach</Link>
              <Link to="/blog" className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Blog</Link>
              <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Profile</Link>
              <Button onClick={() => signOut()} className="w-full">Sign Out</Button>
            </>
          ) : (
            <Link to="/auth/login" className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
