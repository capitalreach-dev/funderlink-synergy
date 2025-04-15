
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, User, Clock, Tag, ChevronRight, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Mock data for blog posts
const FEATURED_POSTS = [
  {
    id: 1,
    title: "How We Raised $3M in 30 Days Using AI-Powered Outreach",
    excerpt: "Learn how TechFusion leveraged Capital Reach AI to connect with the perfect investors and close their seed round in record time.",
    author: "Sarah Chen",
    authorTitle: "CEO, TechFusion",
    date: "Apr 10, 2025",
    readTime: "8 min read",
    category: "Success Story",
    image: "https://source.unsplash.com/random/600x400/?startup"
  },
  {
    id: 2,
    title: "The Science Behind Investor Matching: How AI Makes Better Connections",
    excerpt: "Discover the algorithms and data science that power Capital Reach AI's investor matching capabilities.",
    author: "Dr. Michael Wong",
    authorTitle: "Chief Data Scientist",
    date: "Apr 5, 2025",
    readTime: "12 min read",
    category: "AI Insights",
    image: "https://source.unsplash.com/random/600x400/?technology"
  },
  {
    id: 3,
    title: "5 Common Fundraising Mistakes and How to Avoid Them",
    excerpt: "Veteran investors share the most frequent pitfalls they see in founder pitches and how to navigate around them.",
    author: "Jessica Martinez",
    authorTitle: "Fundraising Coach",
    date: "Mar 28, 2025",
    readTime: "6 min read",
    category: "Fundraising Tips",
    image: "https://source.unsplash.com/random/600x400/?meeting"
  }
];

const LATEST_POSTS = [
  {
    id: 4,
    title: "The Perfect Pitch Deck: Templates and Examples from Successful Startups",
    excerpt: "Study the pitch decks that secured millions in funding and learn how to structure your own presentation.",
    author: "Alex Johnson",
    date: "Apr 12, 2025",
    readTime: "10 min read",
    category: "Resources"
  },
  {
    id: 5,
    title: "Building Relationships with VCs: Beyond the Cold Email",
    excerpt: "Strategies for meaningful connections with investors that lead to long-term partnerships.",
    author: "Robert Kim",
    date: "Apr 8, 2025",
    readTime: "7 min read",
    category: "Networking"
  },
  {
    id: 6,
    title: "How to Determine Your Startup's Valuation for Early Funding Rounds",
    excerpt: "A practical guide to valuation methodologies and common pitfalls to avoid when setting your company's price tag.",
    author: "Priya Patel",
    date: "Apr 2, 2025",
    readTime: "9 min read",
    category: "Finance"
  },
  {
    id: 7,
    title: "The Rise of AI in Fundraising: Trends and Predictions for 2026",
    excerpt: "Industry experts share their forecasts on how artificial intelligence will continue to transform the fundraising landscape.",
    author: "David Chen",
    date: "Mar 25, 2025",
    readTime: "11 min read",
    category: "AI Insights"
  },
  {
    id: 8,
    title: "From Seed to Series A: Navigating the Valley of Death",
    excerpt: "Strategic advice for scaling your startup and securing that crucial next round of funding.",
    author: "Emma Wilson",
    date: "Mar 20, 2025",
    readTime: "8 min read",
    category: "Growth Strategy"
  }
];

const POPULAR_CATEGORIES = [
  "Fundraising Tips",
  "AI Insights",
  "Success Stories",
  "Investor Perspectives",
  "Growth Strategy",
  "Pitch Techniques"
];

const Blog = () => {
  const navigate = useNavigate();
  
  return (
    <Layout showSidebar userType="founder">
      <div className="container p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-navy">Fundraising Insights</h1>
            <p className="text-gray-600">Founder stories, fundraising tips, and AI insights to help you succeed</p>
          </div>
          <div className="mt-4 md:mt-0 relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Articles</TabsTrigger>
            <TabsTrigger value="founder-stories">Founder Stories</TabsTrigger>
            <TabsTrigger value="fundraising">Fundraising Tips</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FEATURED_POSTS.map(post => (
                  <Card key={post.id} className="overflow-hidden h-full flex flex-col">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="h-48 w-full object-cover"
                    />
                    <CardHeader className="pb-3">
                      <div className="mb-2">
                        <Badge className="bg-navy">{post.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3 flex-grow">
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <User size={14} className="mr-1" />
                        <span className="mr-4">{post.author}</span>
                        <Calendar size={14} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-navy hover:bg-navy-light">
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
                <div className="space-y-6">
                  {LATEST_POSTS.map(post => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <CardContent className="flex-grow p-6">
                          <div className="mb-2">
                            <Badge variant="outline">{post.category}</Badge>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <User size={14} className="mr-1" />
                            <span className="mr-4">{post.author}</span>
                            <Calendar size={14} className="mr-1" />
                            <span className="mr-4">{post.date}</span>
                            <Clock size={14} className="mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </CardContent>
                        <div className="md:w-40 bg-gray-50 p-4 flex items-center justify-center border-t md:border-t-0 md:border-l">
                          <Button variant="ghost" className="text-navy">
                            Read More <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button variant="outline">Load More Articles</Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscribe to Newsletter</CardTitle>
                    <CardDescription>Get the latest fundraising insights in your inbox</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Input placeholder="Your email address" type="email" />
                      <Button className="w-full">Subscribe Now</Button>
                    </form>
                    <p className="text-xs text-gray-500 mt-4">
                      By subscribing, you agree to receive email updates. You can unsubscribe at any time.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_CATEGORIES.map(category => (
                        <Badge key={category} variant="outline" className="cursor-pointer hover:bg-gray-100">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded mr-3">
                        <BookOpen size={20} className="text-navy" />
                      </div>
                      <div>
                        <h4 className="font-medium">Ultimate Pitch Deck Guide</h4>
                        <p className="text-sm text-gray-500">Free template & examples</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded mr-3">
                        <TrendingUp size={20} className="text-navy" />
                      </div>
                      <div>
                        <h4 className="font-medium">Fundraising Metrics Dashboard</h4>
                        <p className="text-sm text-gray-500">Track your outreach success</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View All Resources <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="founder-stories">
            <div className="text-center p-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">Founder Stories Coming Soon</h3>
              <p className="text-gray-600 mb-4">
                We're collecting inspiring stories from founders who have successfully raised funding using our platform.
              </p>
              <Button onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="fundraising">
            <div className="text-center p-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">Fundraising Tips Coming Soon</h3>
              <p className="text-gray-600 mb-4">
                Expert advice on fundraising strategies and best practices is on the way.
              </p>
              <Button onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-insights">
            <div className="text-center p-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">AI Insights Coming Soon</h3>
              <p className="text-gray-600 mb-4">
                In-depth articles on how AI is transforming fundraising and investor outreach.
              </p>
              <Button onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Blog;
