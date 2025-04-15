
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Check, 
  Filter, 
  Search,
  Star,
  Mail,
  Calendar,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data for investor profiles
const MOCK_INVESTORS = [
  {
    id: 1,
    name: "Sarah Johnson",
    firm: "Acme Ventures",
    title: "Partner",
    focus: ["SaaS", "FinTech", "AI"],
    stage: "Series A",
    matchScore: 95,
    location: "San Francisco, CA",
    minCheck: "$500K",
    maxCheck: "$2M",
    portfolio: ["Stripe", "Airbnb", "Robinhood"],
    isFollowing: true,
  },
  {
    id: 2,
    name: "David Chen",
    firm: "Growth Partners",
    title: "Managing Director",
    focus: ["HealthTech", "EdTech"],
    stage: "Seed",
    matchScore: 88,
    location: "New York, NY",
    minCheck: "$250K",
    maxCheck: "$1M",
    portfolio: ["Calm", "Coursera", "Oscar Health"],
    isFollowing: false,
  },
  {
    id: 3,
    name: "Michael Green",
    firm: "TechFund",
    title: "General Partner",
    focus: ["Web3", "Crypto", "FinTech"],
    stage: "Pre-seed",
    matchScore: 82,
    location: "Boston, MA",
    minCheck: "$100K",
    maxCheck: "$500K",
    portfolio: ["Coinbase", "Gemini", "BlockFi"],
    isFollowing: true,
  },
  {
    id: 4,
    name: "Jennifer Lee",
    firm: "Innovation Capital",
    title: "Principal",
    focus: ["E-commerce", "Marketplaces"],
    stage: "Series A",
    matchScore: 76,
    location: "Austin, TX",
    minCheck: "$1M",
    maxCheck: "$5M",
    portfolio: ["Shopify", "Etsy", "Instacart"],
    isFollowing: false,
  },
  {
    id: 5,
    name: "Robert Wilson",
    firm: "Catalyst Fund",
    title: "Founding Partner",
    focus: ["CleanTech", "Sustainability"],
    stage: "Seed",
    matchScore: 71,
    location: "San Diego, CA",
    minCheck: "$250K",
    maxCheck: "$2M",
    portfolio: ["Tesla", "Sunrun", "ChargePoint"],
    isFollowing: false,
  },
  {
    id: 6,
    name: "Emily Rodriguez",
    firm: "Horizon Partners",
    title: "Partner",
    focus: ["B2B SaaS", "Enterprise"],
    stage: "Series B",
    matchScore: 68,
    location: "Chicago, IL",
    minCheck: "$5M",
    maxCheck: "$15M",
    portfolio: ["Salesforce", "HubSpot", "Slack"],
    isFollowing: false,
  },
];

const Investors = () => {
  const [investors] = useState(MOCK_INVESTORS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [userType] = useState<'founder' | 'fundraisingPro'>('founder');
  
  return (
    <Layout showSidebar userType={userType}>
      <div className="container p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-navy">Investor Database</h1>
            <p className="text-gray-600">Find and connect with the right investors for your startup</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search investors or firms..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              <Filter size={16} />
              Filters
            </Button>
            <Select defaultValue="match">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Match Score</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="firm">Firm</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filtersVisible && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Investment Stage</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="All Stages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        <SelectItem value="pre-seed">Pre-seed</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="seriesA">Series A</SelectItem>
                        <SelectItem value="seriesB">Series B+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Industry Focus</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="All Industries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="fintech">FinTech</SelectItem>
                        <SelectItem value="healthtech">HealthTech</SelectItem>
                        <SelectItem value="ai">AI/ML</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="sf">San Francisco</SelectItem>
                        <SelectItem value="nyc">New York</SelectItem>
                        <SelectItem value="boston">Boston</SelectItem>
                        <SelectItem value="la">Los Angeles</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Check Size</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Any Amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Amount</SelectItem>
                        <SelectItem value="small">$100K - $500K</SelectItem>
                        <SelectItem value="medium">$500K - $2M</SelectItem>
                        <SelectItem value="large">$2M - $10M</SelectItem>
                        <SelectItem value="xlarge">$10M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="mr-2">Reset</Button>
                  <Button>Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          {investors.map((investor) => (
            <Card key={investor.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-lg mr-4">
                          {investor.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{investor.name}</h3>
                          <p className="text-gray-600">
                            {investor.title} at {investor.firm}
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <Button 
                          variant={investor.isFollowing ? "default" : "outline"} 
                          size="sm"
                          className={investor.isFollowing ? "bg-navy hover:bg-navy-light" : ""}
                        >
                          {investor.isFollowing ? (
                            <>
                              <Check size={16} className="mr-1" /> Following
                            </>
                          ) : (
                            <>
                              <Star size={16} className="mr-1" /> Follow
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-medium w-32">Match Score:</span>
                        <div className="flex items-center">
                          <span className={`font-bold ${investor.matchScore >= 90 ? "text-green-600" : investor.matchScore >= 80 ? "text-teal" : "text-amber-600"}`}>
                            {investor.matchScore}%
                          </span>
                          <div className="w-32 h-2 bg-gray-200 rounded-full ml-2">
                            <div 
                              className={`h-2 rounded-full ${
                                investor.matchScore >= 90 ? "bg-green-600" : 
                                investor.matchScore >= 80 ? "bg-teal" : 
                                "bg-amber-600"
                              }`}
                              style={{ width: `${investor.matchScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <span className="font-medium w-32">Stage:</span>
                        <span>{investor.stage}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <span className="font-medium w-32">Check Size:</span>
                        <span>{investor.minCheck} - {investor.maxCheck}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <span className="font-medium w-32">Location:</span>
                        <span>{investor.location}</span>
                      </div>
                      
                      <div className="flex items-start text-sm">
                        <span className="font-medium w-32">Focus:</span>
                        <div className="flex flex-wrap gap-1">
                          {investor.focus.map((item, index) => (
                            <Badge key={index} variant="secondary" className="bg-gray-100">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-start text-sm">
                        <span className="font-medium w-32">Portfolio:</span>
                        <div className="flex flex-wrap gap-1">
                          {investor.portfolio.map((company, index) => (
                            <Badge key={index} variant="outline" className="border-navy text-navy">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 md:w-60 flex flex-row md:flex-col justify-between md:justify-start gap-2 border-t md:border-t-0 md:border-l">
                    <Button className="flex-1 md:w-full bg-teal hover:bg-teal-dark">
                      <Mail size={16} className="mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" className="flex-1 md:w-full">
                      <Calendar size={16} className="mr-2" />
                      Schedule
                    </Button>
                    <Button variant="outline" className="flex-1 md:w-full">
                      <Linkedin size={16} className="mr-2" />
                      LinkedIn
                    </Button>
                    <div className="hidden md:block mt-auto pt-4">
                      <Button variant="link" className="w-full justify-between p-0">
                        View Full Profile <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button variant="outline">Load More Investors</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Investors;
