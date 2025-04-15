
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Mail, Shield } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white">
        <div className="container px-4 py-24 md:py-32 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter mb-4">
                Connect with the right investors for your startup
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-md">
                Our platform helps founders and fundraising professionals find and connect with investors that are the perfect match for their company.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-teal hover:bg-teal-dark text-white">
                  <Link to="/auth/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/auth/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-md bg-white/5">
                    <div className="bg-teal rounded-full p-2">
                      <Users size={20} className="text-navy" />
                    </div>
                    <div>
                      <h3 className="font-medium">Investor Database</h3>
                      <p className="text-sm text-gray-300">Access 10,000+ investors</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-md bg-white/5">
                    <div className="bg-teal rounded-full p-2">
                      <TrendingUp size={20} className="text-navy" />
                    </div>
                    <div>
                      <h3 className="font-medium">Smart Matching</h3>
                      <p className="text-sm text-gray-300">Find your ideal investors</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-md bg-white/5">
                    <div className="bg-teal rounded-full p-2">
                      <Mail size={20} className="text-navy" />
                    </div>
                    <div>
                      <h3 className="font-medium">Outreach Tools</h3>
                      <p className="text-sm text-gray-300">Templates and tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">How ConnectCapital Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to find investors and manage your fundraising process from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-teal mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-navy">Find Investors</h3>
              <p className="text-gray-600">
                Search our database of investors and filter by investment thesis, check size, industry focus, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-teal mb-4">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-navy">Get Matched</h3>
              <p className="text-gray-600">
                Our algorithm matches you with investors who are most likely to be interested in your startup.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-teal mb-4">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-navy">Track Outreach</h3>
              <p className="text-gray-600">
                Manage all your investor communications in one place with email templates and tracking.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-navy hover:bg-navy-light">
              <Link to="/auth/signup" className="inline-flex items-center">
                Get started today <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Made for Founders and Fundraising Pros</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a founder raising capital or a fundraising professional helping startups, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-navy to-navy-light text-white p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold mb-4">For Founders</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 mt-0.5 text-teal" />
                  <span>Focus on building your business while we help with fundraising</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 mt-0.5 text-teal" />
                  <span>Find investors that match your company's stage, industry, and goals</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 mt-0.5 text-teal" />
                  <span>Access templates and tools proven to increase investor response rates</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild variant="secondary" size="lg" className="bg-teal hover:bg-teal-dark text-white">
                  <Link to="/auth/signup?type=founder">Sign up as a Founder</Link>
                </Button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-navy mb-4">For Fundraising Pros</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 mt-0.5 text-teal" />
                  <span className="text-gray-700">Manage multiple clients and fundraising campaigns</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 mt-0.5 text-teal" />
                  <span className="text-gray-700">Advanced analytics to measure and improve performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 mt-0.5 text-teal" />
                  <span className="text-gray-700">Premium features for professional fundraisers</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild size="lg" className="bg-navy hover:bg-navy-light text-white">
                  <Link to="/auth/signup?type=pro">Sign up as a Pro</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-teal py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to connect with investors?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of founders and fundraising professionals who have successfully raised capital through our platform.
          </p>
          <Button asChild size="lg" className="bg-white text-teal hover:bg-gray-100">
            <Link to="/auth/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ConnectCapital</h3>
              <p className="text-gray-400">
                Connecting founders with the right investors for successful fundraising.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Investor Database</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Smart Matching</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Outreach Tools</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 ConnectCapital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
