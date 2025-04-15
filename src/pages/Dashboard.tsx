
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Calendar, LineChart, Mail, RefreshCw, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarCustom } from "@/components/ui/avatar-custom";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { useAuth } from "@/contexts/AuthContext";
import { mockInvestors, mockEvents } from "@/utils/mockData";

const data = [
  {
    name: "Jan",
    reached: 13,
    responded: 8,
    meetings: 3,
  },
  {
    name: "Feb",
    reached: 15,
    responded: 10,
    meetings: 4,
  },
  {
    name: "Mar",
    reached: 22,
    responded: 15,
    meetings: 7,
  },
  {
    name: "Apr",
    reached: 18,
    responded: 12,
    meetings: 5,
  },
  {
    name: "May",
    reached: 27,
    responded: 18,
    meetings: 9,
  },
  {
    name: "Jun",
    reached: 24,
    responded: 16,
    meetings: 8,
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentInvestors, setRecentInvestors] = useState([]);
  
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
    const now = new Date();
    const upcoming = mockEvents
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
    
    setUpcomingEvents(upcoming);
    
    const recent = mockInvestors.slice(0, 5);
    setRecentInvestors(recent);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button size="sm">
            <span>+ Add Investor</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <StatsCard
              title="Total Investors"
              value={124}
              description="Your investor database"
              icon={<Users className="h-4 w-4" />}
              trend={{ value: 12, positive: true }}
            />
            <StatsCard
              title="Active Conversations"
              value={38}
              description="Ongoing discussions"
              icon={<Mail className="h-4 w-4" />}
              trend={{ value: 7, positive: true }}
            />
            <StatsCard
              title="Scheduled Meetings"
              value={9}
              description="For this month"
              icon={<Calendar className="h-4 w-4" />}
              trend={{ value: 2, positive: false }}
            />
            <StatsCard
              title="Response Rate"
              value="42%"
              description="Average response rate"
              icon={<LineChart className="h-4 w-4" />}
              trend={{ value: 5, positive: true }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Outreach Performance</CardTitle>
                <CardDescription>
                  Monthly investor outreach and response metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={data}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Bar
                      dataKey="reached"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="responded"
                      fill="hsl(var(--secondary))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="meetings"
                      fill="hsl(var(--accent))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Your scheduled meetings and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {event.location}
                          </p>
                        </div>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px]">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No upcoming events
                    </p>
                    <Link to="/events/create">
                      <Button variant="link" size="sm">
                        Create one
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed analytics for your fundraising activities
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Advanced analytics coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent interactions with investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInvestors.map((investor) => (
                  <div
                    key={investor.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <AvatarCustom
                        name={investor.name}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium">{investor.name}</p>
                        <p className="text-sm text-muted-foreground">{investor.firm}</p>
                      </div>
                    </div>
                    <Badge>{investor.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
