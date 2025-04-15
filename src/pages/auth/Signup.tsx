
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultType = queryParams.get("type") === "pro" ? "fundraisingPro" : "founder";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<string>(defaultType);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Normally this would connect to Supabase or another authentication service
    // For demo purposes, we'll just simulate a successful signup
    try {
      // Simulating API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Account created",
        description: "Welcome to ConnectCapital!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "There was an error creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/auth/login" className="font-medium text-teal hover:text-teal-dark">
                Sign in
              </Link>
            </p>
          </div>
          
          <div className="mt-8 bg-white p-8 shadow-md rounded-lg border">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <Label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                  I am a
                </Label>
                <Select 
                  value={userType} 
                  onValueChange={setUserType}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="founder">Founder</SelectItem>
                    <SelectItem value="fundraisingPro">Fundraising Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-navy hover:bg-navy-light text-white"
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  LinkedIn
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-teal hover:text-teal-dark">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-teal hover:text-teal-dark">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
