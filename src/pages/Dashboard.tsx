
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Mail, Users, Calendar, ArrowUpRight, Search, Inbox } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const Dashboard = () => {
  const [userType] = useState<'founder' | 'fundraisingPro'>('founder');
  
  return (
    <Layout showSidebar userType={userType}>
      <div className="container p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Lisa! Here's your fundraising overview.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-navy hover:bg-navy-light text-white">
              <Search className="mr-2 h-4 w-4" /> Find Investors
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Investors Contacted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">34</div>
                <div className="p-2 bg-green-100 text-green-800 rounded-full">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-1">+8 this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">42%</div>
                <div className="p-2 bg-teal-100 text-teal-800 rounded-full">
                  <Mail className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-1">+5% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Meetings Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">12</div>
                <div className="p-2 bg-purple-100 text-purple-800 rounded-full">
                  <Calendar className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-1">Next on May 24</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Top Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">23</div>
                <div className="p-2 bg-blue-100 text-blue-800 rounded-full">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-1">New recommendations available</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Fundraising Progress</CardTitle>
                <CardDescription>Track your current round</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Target: $1,500,000</span>
                      <span className="text-sm font-medium">40% Raised</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Committed</div>
                      <div className="text-xl font-bold">$600,000</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">In Discussion</div>
                      <div className="text-xl font-bold">$350,000</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Remaining</div>
                      <div className="text-xl font-bold">$550,000</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest investor interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-navy text-white p-2 rounded-full mr-3">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email from Sarah Johnson</p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-teal text-white p-2 rounded-full mr-3">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Meeting scheduled with Acme Ventures</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gold text-navy p-2 rounded-full mr-3">
                      <Inbox className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Due diligence request from TechFund</p>
                      <p className="text-xs text-gray-500">Yesterday at 3:45 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-navy text-white p-2 rounded-full mr-3">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Follow-up from Michael Green</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="link" className="w-full mt-4 text-teal">
                  View All Activity <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Investor Matches</CardTitle>
              <CardDescription>Investors that match your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Acme Ventures", "Growth Partners", "TechFund", "Innovation Capital"].map((name, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 mr-3">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-gray-500">Match score: {90 - index * 3}%</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button variant="link" className="w-full mt-4 text-teal">
                View All Matches <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Networking and pitch opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "TechCrunch Disrupt", date: "May 24, 2025", location: "San Francisco, CA" },
                  { name: "Venture Summit", date: "June 12, 2025", location: "New York, NY" },
                  { name: "Founder Connect", date: "July 3, 2025", location: "Virtual" },
                  { name: "Angel Investor Showcase", date: "July 15, 2025", location: "Boston, MA" }
                ].map((event, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium">{event.name}</p>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <div>{event.date}</div>
                      <div>{event.location}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="link" className="w-full mt-4 text-teal">
                View All Events <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
