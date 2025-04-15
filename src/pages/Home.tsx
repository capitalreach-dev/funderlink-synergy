
import { Link } from "react-router-dom";
import { ArrowRight, Check, LineChart, Mail, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-navy to-blue-800 text-white py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Connect with the <span className="text-brand-gold">perfect investors</span> for your startup
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">
                FunderLink helps founders and fundraising professionals streamline investor outreach, manage relationships, and close funding rounds faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-md">
                <div className="absolute -top-3 -right-3 bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-full">
                  Founder Dashboard
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Investor Pipeline</h3>
                    <span className="text-xs opacity-70">This Month</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/10 rounded p-3 text-center">
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-xs opacity-70">Researched</div>
                    </div>
                    <div className="bg-white/10 rounded p-3 text-center">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs opacity-70">Contacted</div>
                    </div>
                    <div className="bg-white/10 rounded p-3 text-center">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-xs opacity-70">Meetings</div>
                    </div>
                  </div>
                  <div className="h-12 w-full bg-white/10 rounded flex items-center justify-center">
                    <LineChart className="h-8 w-8 opacity-50" />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>Recent Activity</div>
                    <div className="opacity-70">View All</div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white/10 rounded p-2 text-xs">
                      Meeting scheduled with Horizon Ventures
                    </div>
                    <div className="bg-white/10 rounded p-2 text-xs">
                      Email received from BlueSky Capital
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Streamline Your Fundraising Process</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage investor relationships in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="bg-brand-navy/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-brand-navy" />
              </div>
              <h3 className="text-xl font-medium mb-3">Investor Database</h3>
              <p className="text-muted-foreground">
                Access thousands of investor profiles with detailed information on investment focus, check size, and contact details.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="bg-brand-teal/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-brand-teal" />
              </div>
              <h3 className="text-xl font-medium mb-3">Outreach Tools</h3>
              <p className="text-muted-foreground">
                Send personalized emails and LinkedIn messages to investors with templates and tracking capabilities.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="bg-brand-gold/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-brand-gold" />
              </div>
              <h3 className="text-xl font-medium mb-3">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Work seamlessly with your team to coordinate investor outreach, share notes, and track progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-based Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Both Sides of Fundraising</h2>
            <p className="text-lg text-muted-foreground">
              Tailored solutions for both founders and fundraising professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div className="bg-card rounded-lg p-6 md:p-8 shadow-sm border border-border">
              <h3 className="text-2xl font-bold mb-6 text-brand-navy">For Founders</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="shrink-0 rounded-full bg-brand-navy/10 p-1">
                    <Check className="h-5 w-5 text-brand-navy" />
                  </div>
                  <div>
                    <span className="font-medium">Investor Matching</span>
                    <p className="text-sm text-muted-foreground mt-1">Find investors that match your industry, stage, and funding requirements.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 rounded-full bg-brand-navy/10 p-1">
                    <Check className="h-5 w-5 text-brand-navy" />
                  </div>
                  <div>
                    <span className="font-medium">CRM for Investors</span>
                    <p className="text-sm text-muted-foreground mt-1">Track conversations, follow-ups, and relationship status with each investor.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 rounded-full bg-brand-navy/10 p-1">
                    <Check className="h-5 w-5 text-brand-navy" />
                  </div>
                  <div>
                    <span className="font-medium">Investor Updates</span>
                    <p className="text-sm text-muted-foreground mt-1">Create and send professional investor updates to keep your network informed.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/signup">
                  <Button>Sign Up as Founder</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6 md:p-8 shadow-sm border border-border">
              <h3 className="text-2xl font-bold mb-6 text-brand-teal">For Fundraising Pros</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="shrink-0 rounded-full bg-brand-teal/10 p-1">
                    <Check className="h-5 w-5 text-brand-teal" />
                  </div>
                  <div>
                    <span className="font-medium">Portfolio Management</span>
                    <p className="text-sm text-muted-foreground mt-1">Manage multiple companies and their fundraising processes simultaneously.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 rounded-full bg-brand-teal/10 p-1">
                    <Check className="h-5 w-5 text-brand-teal" />
                  </div>
                  <div>
                    <span className="font-medium">Advanced Analytics</span>
                    <p className="text-sm text-muted-foreground mt-1">Track performance metrics across fundraising campaigns and optimize strategies.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 rounded-full bg-brand-teal/10 p-1">
                    <Check className="h-5 w-5 text-brand-teal" />
                  </div>
                  <div>
                    <span className="font-medium">Investor Network</span>
                    <p className="text-sm text-muted-foreground mt-1">Leverage your existing investor relationships across multiple clients.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/signup">
                  <Button variant="outline">Sign Up as Fundraising Pro</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Fundraising Process?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of founders and fundraising professionals who are using FunderLink to connect with investors and close funding rounds faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                Get Started For Free
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
