import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppLayout, AuthenticatedLayout } from "./components/layout/AppLayout";
import { AuthWrapper } from "./components/auth/AuthWrapper";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Investors from "./pages/Investors";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            
            <Route path="/" element={<AuthenticatedLayout />}>
              <Route path="dashboard" element={<AuthWrapper><Dashboard /></AuthWrapper>} />
              <Route path="investors" element={<AuthWrapper><Investors /></AuthWrapper>} />
              <Route path="outreach" element={<AuthWrapper><NotFound /></AuthWrapper>} />
              <Route path="updates" element={<AuthWrapper><NotFound /></AuthWrapper>} />
              <Route path="events" element={<AuthWrapper><NotFound /></AuthWrapper>} />
              <Route path="profile" element={<AuthWrapper><NotFound /></AuthWrapper>} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
