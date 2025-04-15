
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Building, 
  Mail, 
  Link, 
  Settings, 
  Bell, 
  Shield, 
  Trash2, 
  SaveIcon,
  Linkedin,
  Twitter,
  Calendar,
  Upload
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [userType] = useState<'founder' | 'fundraisingPro'>('founder');
  
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "CEO & Founder",
    companyName: "TechStartup Inc.",
    companyWebsite: "https://techstartup.example.com",
    companyDescription: "We're building an innovative SaaS platform that helps businesses streamline their operations and increase productivity.",
    foundedYear: "2023",
    teamSize: "5",
    linkedIn: "linkedin.com/in/alexjohnson",
    twitter: "twitter.com/alexjohnson",
    location: "San Francisco, CA",
    industry: "SaaS",
    fundingStage: "seed",
    fundingAmount: "$1,500,000",
    emailProvider: "gmail",
    emailNotifications: true,
    weeklyDigest: true,
    investorAlerts: true
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setProfile(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSaveProfile = () => {
    // Here you would save the profile data to your backend
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully.",
    });
  };
  
  return (
    <Layout showSidebar userType={userType}>
      <div className="container p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-navy">Profile Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={handleSaveProfile} className="bg-navy hover:bg-navy-light">
              <SaveIcon className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-flex mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={profile.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={profile.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        value={profile.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={profile.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input 
                          id="jobTitle" 
                          name="jobTitle" 
                          value={profile.jobTitle}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          value={profile.location}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Social Profiles</CardTitle>
                    <CardDescription>Connect your social media accounts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Linkedin className="text-[#0077B5]" />
                        <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                      </div>
                      <Input 
                        id="linkedIn" 
                        name="linkedIn" 
                        value={profile.linkedIn}
                        onChange={handleInputChange}
                        placeholder="linkedin.com/in/yourprofile"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Twitter className="text-[#1DA1F2]" />
                        <Label htmlFor="twitter">Twitter Profile</Label>
                      </div>
                      <Input 
                        id="twitter" 
                        name="twitter" 
                        value={profile.twitter}
                        onChange={handleInputChange}
                        placeholder="twitter.com/yourusername"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Password & Security</CardTitle>
                    <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <User className="h-16 w-16 text-gray-400" />
                      </div>
                      <Button size="sm" variant="outline" className="absolute bottom-0 right-0 rounded-full">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Upload a square image, at least 400x400px</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Upload</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <span>Account Created</span>
                        </div>
                        <span className="text-sm">Apr 1, 2025</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-gray-500" />
                          <span>Account Type</span>
                        </div>
                        <span className="text-sm capitalize">{userType}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Danger Zone</h3>
                      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details for investor matching</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      name="companyName" 
                      value={profile.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input 
                      id="companyWebsite" 
                      name="companyWebsite" 
                      value={profile.companyWebsite}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Company Description</Label>
                  <Textarea 
                    id="companyDescription" 
                    name="companyDescription" 
                    value={profile.companyDescription}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                      value={profile.industry}
                      onValueChange={(value) => handleSelectChange("industry", value)}
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai">Artificial Intelligence</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="fintech">Fintech</SelectItem>
                        <SelectItem value="healthtech">Healthtech</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="enterprise">Enterprise Software</SelectItem>
                        <SelectItem value="consumer">Consumer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fundingStage">Funding Stage</Label>
                    <Select 
                      value={profile.fundingStage}
                      onValueChange={(value) => handleSelectChange("fundingStage", value)}
                    >
                      <SelectTrigger id="fundingStage">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-seed">Pre-seed</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="series-a">Series A</SelectItem>
                        <SelectItem value="series-b">Series B+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="foundedYear">Founded Year</Label>
                    <Input 
                      id="foundedYear" 
                      name="foundedYear" 
                      value={profile.foundedYear}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input 
                      id="teamSize" 
                      name="teamSize" 
                      value={profile.teamSize}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fundingAmount">Funding Target</Label>
                  <Input 
                    id="fundingAmount" 
                    name="fundingAmount" 
                    value={profile.fundingAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile}>Save Company Information</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Integration</CardTitle>
                  <CardDescription>Connect your email account for sending outreach messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailProvider">Email Provider</Label>
                    <Select 
                      value={profile.emailProvider}
                      onValueChange={(value) => handleSelectChange("emailProvider", value)}
                    >
                      <SelectTrigger id="emailProvider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gmail">Gmail</SelectItem>
                        <SelectItem value="outlook">Outlook</SelectItem>
                        <SelectItem value="smtp">Custom SMTP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {profile.emailProvider === 'gmail' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gmailAddress">Gmail Address</Label>
                        <Input 
                          id="gmailAddress" 
                          value={profile.email}
                          readOnly
                        />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Gmail Connected</p>
                          <p className="text-xs text-gray-500">Last synced: Apr 15, 2025, 10:30 AM</p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">
                          Reconnect
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {profile.emailProvider === 'outlook' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="outlookAddress">Outlook Address</Label>
                        <Input 
                          id="outlookAddress" 
                          placeholder="you@outlook.com"
                        />
                      </div>
                      <Button>Connect Outlook</Button>
                    </div>
                  )}
                  
                  {profile.emailProvider === 'smtp' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtpServer">SMTP Server</Label>
                        <Input 
                          id="smtpServer" 
                          placeholder="smtp.company.com"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="smtpPort">SMTP Port</Label>
                          <Input 
                            id="smtpPort" 
                            placeholder="587"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpSecurity">Security</Label>
                          <Select defaultValue="tls">
                            <SelectTrigger id="smtpSecurity">
                              <SelectValue placeholder="Select security" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tls">TLS</SelectItem>
                              <SelectItem value="ssl">SSL</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtpUsername">Username</Label>
                        <Input 
                          id="smtpUsername" 
                          placeholder="your.email@company.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtpPassword">Password</Label>
                        <Input 
                          id="smtpPassword" 
                          type="password"
                          placeholder="Your password"
                        />
                      </div>
                      
                      <Button>Verify & Save SMTP Settings</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Calendar Integration</CardTitle>
                  <CardDescription>Connect your calendar for meeting scheduling</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="calendarProvider">Calendar Provider</Label>
                    <Select defaultValue="google">
                      <SelectTrigger id="calendarProvider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Calendar</SelectItem>
                        <SelectItem value="outlook">Outlook Calendar</SelectItem>
                        <SelectItem value="ical">iCal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md flex items-center">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Calendar Not Connected</p>
                      <p className="text-xs text-gray-500">Connect your calendar to schedule meetings with investors</p>
                    </div>
                    <Button size="sm" className="ml-auto bg-navy hover:bg-navy-light">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>LinkedIn Integration</CardTitle>
                  <CardDescription>Connect LinkedIn for enhanced outreach options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Linkedin className="h-5 w-5 text-[#0077B5]" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn Not Connected</p>
                      <p className="text-xs text-gray-500">Link your LinkedIn account to enhance investor matching</p>
                    </div>
                    <Button size="sm" className="ml-auto bg-[#0077B5] hover:bg-[#006097] text-white">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-dashed rounded-md">
                    <h4 className="font-medium mb-2">LinkedIn Integration Benefits:</h4>
                    <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
                      <li>Import your LinkedIn connections as potential contacts</li>
                      <li>Discover shared connections with investors</li>
                      <li>Display LinkedIn profile insights in investor profiles</li>
                      <li>Send connection requests directly from the platform</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>CRM Integration</CardTitle>
                  <CardDescription>Connect your CRM for synchronized contact management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="crmProvider">CRM Provider</Label>
                    <Select defaultValue="none">
                      <SelectTrigger id="crmProvider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="salesforce">Salesforce</SelectItem>
                        <SelectItem value="hubspot">HubSpot</SelectItem>
                        <SelectItem value="pipedrive">Pipedrive</SelectItem>
                        <SelectItem value="close">Close</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-md">
                    <p className="text-sm text-amber-800">
                      CRM integrations allow you to synchronize contacts, activities, and communication history between Capital Reach AI and your existing CRM system.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure which email notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications about account activity</p>
                  </div>
                  <Switch 
                    id="emailNotifications" 
                    checked={profile.emailNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weeklyDigest" className="text-base">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive a weekly summary of your outreach performance</p>
                  </div>
                  <Switch 
                    id="weeklyDigest" 
                    checked={profile.weeklyDigest}
                    onCheckedChange={(checked) => handleSwitchChange("weeklyDigest", checked)}
                    disabled={!profile.emailNotifications}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="investorAlerts" className="text-base">Investor Match Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when we find new investors that match your criteria</p>
                  </div>
                  <Switch 
                    id="investorAlerts" 
                    checked={profile.investorAlerts}
                    onCheckedChange={(checked) => handleSwitchChange("investorAlerts", checked)}
                    disabled={!profile.emailNotifications}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="responseAlerts" className="text-base">Investor Response Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when investors respond to your outreach</p>
                  </div>
                  <Switch 
                    id="responseAlerts" 
                    checked={true}
                    disabled={!profile.emailNotifications}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingEmails" className="text-base">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about new features and best practices</p>
                  </div>
                  <Switch id="marketingEmails" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile}>Save Notification Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Add missing CheckCircle and AlertCircle components
const CheckCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default Profile;
