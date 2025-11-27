import { Button } from "@/components/ui/button";
import { Bell, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import bbucLogo from "@/assets/bbuc-logo.jpg";
import { useUserRole } from "@/hooks/useUserRole";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { user, signOut } = useAuth();
  const { role, isAdmin, isStaff, isStudent } = useUserRole();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const getDashboardRoute = () => {
    if (isAdmin) return "/admin";
    if (isStaff) return "/staff";
    if (isStudent) return "/student";
    return "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img 
            src={bbucLogo} 
            alt="Bishop Barham University College" 
            className="h-12 w-12 object-contain"
          />
          <div>
            <h1 className="text-lg font-bold leading-tight text-foreground">Bishop Barham University College</h1>
            <p className="text-xs text-muted-foreground">Digital Notice Board</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(getDashboardRoute())}
                className="hidden sm:flex"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
                </span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(getDashboardRoute())}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>
              Log In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
