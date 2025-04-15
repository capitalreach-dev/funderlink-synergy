
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Mail, 
  Calendar, 
  Users, 
  Zap, 
  MessageSquare, 
  BarChart, 
  Settings, 
  CheckCircle2, 
  Send, 
  Edit, 
  Trash2, 
  Copy, 
  Filter, 
  PlayCircle, 
  PauseCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const MOCK_INVESTORS = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    firm: "Acme Ventures", 
    role: "Partner",
    location: "San Francisco, CA",
    focus: ["SaaS", "Fintech", "AI"],
    match: 92,
    status: "Not contacted",
    email: "sarah@acmeventures.com"
  },
  { 
    id: 2, 
    name: "Michael Wong", 
    firm: "BlueSky Capital", 
    role: "Managing Partner",
    location: "New York, NY",
    focus: ["Healthcare", "AI", "Enterprise"],
    match: 87,
    status: "Not contacted",
    email: "michael@blueskycap.com"
  },
  { 
    id: 3, 
    name: "Julia Garcia", 
    firm: "Horizon Fund", 
    role: "Principal",
    location: "Boston, MA",
    focus: ["Fintech", "Marketplace", "SaaS"],
    match: 85,
    status: "Not contacted",
    email: "jgarcia@horizonfund.com"
  },
  { 
    id: 4, 
    name: "Thomas Lee", 
    firm: "Maven Ventures", 
    role: "Associate",
    location: "Austin, TX",
    focus: ["E-commerce", "Enterprise", "AI"],
    match: 81,
    status: "Not contacted",
    email: "thomas@mavenvc.com"
  },
  { 
    id: 5, 
    name: "Rebecca Clark", 
    firm: "Foundry Partners", 
    role: "Partner",
    location: "Chicago, IL",
    focus: ["SaaS", "Developer Tools", "Infrastructure"],
    match: 78,
    status: "Not contacted",
    email: "rebecca@foundrypartners.com"
  },
];

const EMAIL_TEMPLATES = [
  {
    id: 1,
    name: "Cold Introduction",
    subject: "Intro: [Company] - AI-powered investor outreach platform",
    body: "Dear [Investor Name],\n\nI hope this email finds you well. I'm [Your Name], the [Your Title] of [Company Name], and I'm reaching out because of your investment focus in [Industry].\n\nWe're building [Brief company description with value prop]. Our platform helps founders connect with the right investors through AI-powered matching and outreach tools.\n\nWe've [Traction point 1] and [Traction point 2], and we're now raising [Amount] to [Growth plan].\n\nWould you be open to a 20-minute call to discuss how we're revolutionizing the fundraising process?\n\nBest regards,\n[Your Name]"
  },
  {
    id: 2,
    name: "Warm Introduction",
    subject: "[Mutual Contact] suggested we connect",
    body: "Dear [Investor Name],\n\n[Mutual Contact] suggested I reach out to you regarding our company, [Company Name].\n\nWe're building [Brief company description with value prop] and have already [Key traction points].\n\nGiven your experience with [Similar company or industry], I believe you would provide valuable insights on our approach to [Specific strategy or challenge].\n\nWould you be available for a brief call next week?\n\nBest regards,\n[Your Name]"
  },
  {
    id: 3,
    name: "Follow-up After Event",
    subject: "Following up from [Event Name]",
    body: "Dear [Investor Name],\n\nIt was great meeting you at [Event Name] last week where we briefly discussed [Company Name].\n\nAs mentioned, we're [Brief company description] with [Traction highlights].\n\nI'd love to continue our conversation and share more about our vision and how we're [Unique value proposition].\n\nWould you have time for a 30-minute call this week?\n\nBest regards,\n[Your Name]"
  }
];

const SmartOutreach = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState(EMAIL_TEMPLATES[0]);
  const [selectedInvestors, setSelectedInvestors] = useState<number[]>([]);
  const [campaignName, setCampaignName] = useState("");
  const [emailSubject, setEmailSubject] = useState(EMAIL_TEMPLATES[0].subject);
  const [emailBody, setEmailBody] = useState(EMAIL_TEMPLATES[0].body);
  const [matchThreshold, setMatchThreshold] = useState([80]);
  const [campaignScheduled, setCampaignScheduled] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  
  const handleTemplateChange = (templateId: string) => {
    const template = EMAIL_TEMPLATES.find(t => t.id === parseInt(templateId));
    if (template) {
      setSelectedTemplate(template);
      setEmailSubject(template.subject);
      setEmailBody(template.body);
    }
  };
  
  const toggleInvestor = (investorId: number) => {
    setSelectedInvestors(prev => 
      prev.includes(investorId) 
        ? prev.filter(id => id !== investorId)
        : [...prev, investorId]
    );
  };
  
  const selectAllInvestors = () => {
    const investorsAboveThreshold = MOCK_INVESTORS
      .filter(investor => investor.match >= matchThreshold[0])
      .map(investor => investor.id);
    setSelectedInvestors(investorsAboveThreshold);
  };
  
  const clearSelectedInvestors = () => {
    setSelectedInvestors([]);
  };
  
  const launchCampaign = () => {
    if (selectedInvestors.length === 0) {
      toast({
        title: "No investors selected",
        description: "Please select at least one investor for your campaign.",
        variant: "destructive"
      });
      return;
    }
    
    if (!campaignName) {
      toast({
        title: "Campaign name required",
        description: "Please enter a name for your campaign.",
        variant: "destructive"
      });
      return;
    }
    
    // Here would be the logic to actually launch the campaign
    toast({
      title: "Campaign scheduled successfully!",
      description: `Emails will be sent to ${selectedInvestors.length} investors.`,
    });
    
    setCampaignScheduled(true);
  };

  // Helper function to switch tabs programmatically
  const switchTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };
  
  return (
    <Layout showSidebar userType="founder">
      <div className="container p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-navy">Smart Outreach</h1>
            <p className="text-gray-600">Create targeted outreach campaigns with AI-powered personalization</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="create">Create Campaign</TabsTrigger>
                <TabsTrigger value="active">Active Campaigns</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create" className="space-y-6">
                {!campaignScheduled ? (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Campaign Details</CardTitle>
                        <CardDescription>Name your campaign and set basic parameters</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="campaign-name">Campaign Name</Label>
                          <Input 
                            id="campaign-name" 
                            value={campaignName} 
                            onChange={(e) => setCampaignName(e.target.value)}
                            placeholder="April 2025 Seed Round Outreach" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Investor Match Threshold</Label>
                            <span className="text-sm text-gray-600">{matchThreshold[0]}%+</span>
                          </div>
                          <Slider 
                            value={matchThreshold} 
                            onValueChange={setMatchThreshold} 
                            max={100} 
                            step={5}
                          />
                          <p className="text-sm text-gray-500">Only show investors with at least this match percentage</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Email Sending Schedule</Label>
                          <Select defaultValue="staggered">
                            <SelectTrigger>
                              <SelectValue placeholder="Select schedule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="staggered">Staggered (3-5 per day)</SelectItem>
                              <SelectItem value="gradual">Gradual (1-2 per day)</SelectItem>
                              <SelectItem value="burst">Burst (All at once)</SelectItem>
                              <SelectItem value="custom">Custom Schedule</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="auto-followup" />
                          <Label htmlFor="auto-followup">Enable automatic follow-up if no response within 7 days</Label>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Select Investors</CardTitle>
                        <CardDescription>
                          {selectedInvestors.length} investors selected for this campaign
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={selectAllInvestors}
                            >
                              Select All Matching
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={clearSelectedInvestors}
                            >
                              Clear Selection
                            </Button>
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter Options
                          </Button>
                        </div>
                        
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Investor</TableHead>
                                <TableHead>Focus</TableHead>
                                <TableHead className="text-center">Match</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {MOCK_INVESTORS
                                .filter(investor => investor.match >= matchThreshold[0])
                                .map(investor => (
                                <TableRow key={investor.id}>
                                  <TableCell>
                                    <input 
                                      type="checkbox"
                                      checked={selectedInvestors.includes(investor.id)}
                                      onChange={() => toggleInvestor(investor.id)}
                                      className="h-5 w-5 rounded-md"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <div className="font-medium">{investor.name}</div>
                                      <div className="text-sm text-gray-500">{investor.firm} • {investor.role}</div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                      {investor.focus.map(tag => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge className={
                                      investor.match >= 90 ? "bg-green-600" :
                                      investor.match >= 80 ? "bg-teal" :
                                      "bg-amber-500"
                                    }>
                                      {investor.match}%
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Email Content</CardTitle>
                        <CardDescription>Craft your message or select a template</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Email Template</Label>
                          <Select 
                            value={selectedTemplate.id.toString()} 
                            onValueChange={handleTemplateChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent>
                              {EMAIL_TEMPLATES.map(template => (
                                <SelectItem key={template.id} value={template.id.toString()}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject Line</Label>
                          <Input 
                            id="subject" 
                            value={emailSubject} 
                            onChange={(e) => setEmailSubject(e.target.value)} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="body">Email Body</Label>
                            <span className="text-xs text-gray-500">
                              Use [brackets] for personalization variables
                            </span>
                          </div>
                          <Textarea 
                            id="body" 
                            value={emailBody} 
                            onChange={(e) => setEmailBody(e.target.value)} 
                            rows={12} 
                          />
                        </div>
                        
                        <div className="pt-2">
                          <Button variant="outline" className="mr-2">
                            <Zap className="h-4 w-4 mr-2" />
                            AI Enhance
                          </Button>
                          <Button variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Save as Draft</Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-navy hover:bg-navy-light">
                              <Send className="h-4 w-4 mr-2" />
                              Schedule Campaign
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Campaign Launch</DialogTitle>
                              <DialogDescription>
                                You're about to schedule emails to {selectedInvestors.length} investors. This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <h4 className="font-medium mb-2">Campaign Summary:</h4>
                              <ul className="space-y-2 text-sm">
                                <li className="flex justify-between">
                                  <span className="text-gray-600">Campaign Name:</span>
                                  <span>{campaignName || "Unnamed Campaign"}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-gray-600">Investors:</span>
                                  <span>{selectedInvestors.length} selected</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-gray-600">Template:</span>
                                  <span>{selectedTemplate.name}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-gray-600">Schedule:</span>
                                  <span>Staggered (3-5 per day)</span>
                                </li>
                              </ul>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" className="mr-2">Cancel</Button>
                              <Button onClick={launchCampaign}>
                                Confirm & Launch
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle2 className="h-6 w-6 text-green-600 mr-2" />
                        Campaign Scheduled!
                      </CardTitle>
                      <CardDescription>Your outreach emails will be sent according to the schedule</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-6 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-lg mb-4">{campaignName}</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <Badge>Scheduled</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Investors:</span>
                            <span>{selectedInvestors.length} selected</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Emails Sent:</span>
                            <span>0 / {selectedInvestors.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">First Email:</span>
                            <span>Scheduled for Apr 16, 2025, 10:00 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Campaign Completion:</span>
                            <span>Estimated Apr 22, 2025</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Email Sending Progress</h3>
                        <Progress value={0} className="h-2" />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">0 sent</span>
                          <span className="text-xs text-gray-500">{selectedInvestors.length} total</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCampaignScheduled(false)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Campaign
                        </Button>
                        <Button variant="outline" className="text-red-600 hover:text-red-700">
                          <PauseCircle className="h-4 w-4 mr-2" />
                          Pause Campaign
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="active">
                {campaignScheduled ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Campaigns</CardTitle>
                      <CardDescription>Manage your ongoing outreach campaigns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{campaignName}</h3>
                              <p className="text-sm text-gray-500">Started Apr 15, 2025</p>
                            </div>
                            <Badge>In Progress</Badge>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress:</span>
                              <span>0 / {selectedInvestors.length} emails sent</span>
                            </div>
                            <Progress value={0} className="h-2" />
                            
                            <div className="grid grid-cols-3 gap-4 mt-4">
                              <div className="border rounded p-2 text-center">
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-xs text-gray-500">Opened</p>
                              </div>
                              <div className="border rounded p-2 text-center">
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-xs text-gray-500">Replied</p>
                              </div>
                              <div className="border rounded p-2 text-center">
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-xs text-gray-500">Meetings</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <BarChart className="h-4 w-4 mr-2" />
                              Analytics
                            </Button>
                            <Button variant="outline" size="sm">
                              <PauseCircle className="h-4 w-4 mr-2" />
                              Pause
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-12">
                      <div className="rounded-full bg-gray-100 p-4 mb-4">
                        <Mail className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Active Campaigns</h3>
                      <p className="text-gray-500 text-center mb-4">
                        You don't have any outreach campaigns running at the moment.
                      </p>
                      <Button onClick={() => switchTab("create")}>
                        Create Your First Campaign
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="completed">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-12">
                    <div className="rounded-full bg-gray-100 p-4 mb-4">
                      <CheckCircle2 className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Completed Campaigns</h3>
                    <p className="text-gray-500 text-center mb-4">
                      Completed campaigns will appear here once they finish running.
                    </p>
                    <Button variant="outline">
                      View Documentation
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {campaignScheduled ? (
                  <div className="space-y-4">
                    <div className="text-center p-4">
                      <h3 className="text-3xl font-bold text-navy">0%</h3>
                      <p className="text-sm text-gray-500">Response Rate</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Delivered:</span>
                        <span>0 / {selectedInvestors.length}</span>
                      </div>
                      <Progress value={0} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Opened:</span>
                        <span>0 / {selectedInvestors.length}</span>
                      </div>
                      <Progress value={0} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Replied:</span>
                        <span>0 / {selectedInvestors.length}</span>
                      </div>
                      <Progress value={0} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Meetings:</span>
                        <span>0 / {selectedInvestors.length}</span>
                      </div>
                      <Progress value={0} className="h-1.5" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <BarChart className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-gray-500 text-center">
                      Campaign performance metrics will appear here after launch
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tips & Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      <Zap className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Personalize Each Email</h4>
                      <p className="text-sm text-gray-600">Use [brackets] to add personalization tokens to your templates.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      <Calendar className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <h4 className="font-medium">Optimal Timing</h4>
                      <p className="text-sm text-gray-600">Emails sent on Tuesday and Wednesday mornings see higher open rates.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Avoid Spam Triggers</h4>
                      <p className="text-sm text-gray-600">Limit exclamation marks and ALL CAPS in your subject lines.</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-2">
                    View All Tips
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="h-5 w-5 mr-2 text-amber-500" />
                    Optimize Subject Line
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="h-5 w-5 mr-2 text-amber-500" />
                    Personalize Email Body
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="h-5 w-5 mr-2 text-amber-500" />
                    Suggest Follow-up Strategy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SmartOutreach;
