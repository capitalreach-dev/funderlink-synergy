
import { useState, useRef } from "react";
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
import { useProfile, ProfileData } from "@/hooks/useProfile";
import { 
  User as UserIcon, 
  Building, 
  Mail, 
  Link as LinkIcon, 
  Settings, 
  Bell, 
  Shield, 
  Trash2, 
  Save as SaveIcon,
  Linkedin,
  Twitter,
  Calendar,
  Upload,
  CheckCircle2 as CheckCircleIcon,
  AlertCircle as AlertCircleIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Profile = () => {
  const { profile, isLoading, updateProfile, uploadProfilePicture, deleteAccount } = useProfile();
  const [formData, setFormData] = useState<Partial<ProfileData>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Update formData when profile data is loaded
  useState(() => {
    if (profile) {
      setFormData(profile);
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is changed
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is changed
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Validate website URL
    if (formData.website && !isValidUrl(formData.website)) {
      errors.website = "Please enter a valid URL (e.g., https://example.com)";
    }
    
    // Validate fund_size_goal is a number
    if (formData.fund_size_goal && isNaN(Number(formData.fund_size_goal))) {
      errors.fund_size_goal = "Fund size goal must be a number";
    }
    
    // Validate funding_goal is a number
    if (formData.funding_goal && isNaN(Number(formData.funding_goal))) {
      errors.funding_goal = "Funding goal must be a number";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSaveProfile = () => {
    if (validateForm()) {
      updateProfile(formData);
    } else {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form",
        variant: "destructive",
      });
    }
  };
  
  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }
    
    // Create image object for dimension validation
    const img = new Image();
    img.onload = async () => {
      URL.revokeObjectURL(img.src);
      
      // Validate image dimensions
      if (img.width < 400 || img.height < 400) {
        toast({
          title: "Image Too Small",
          description: "Please select an image at least 400x400 pixels",
          variant: "destructive",
        });
        return;
      }
      
      // Upload image
      setIsUploading(true);
      const imageUrl = await uploadProfilePicture(file);
      setIsUploading(false);
      
      if (imageUrl) {
        setFormData(prev => ({ ...prev, profile_picture: imageUrl }));
        updateProfile({ ...formData, profile_picture: imageUrl });
      }
    };
    
    img.src = URL.createObjectURL(file);
  };
  
  const handleDeleteAccount = () => {
    deleteAccount();
    setDeleteConfirmOpen(false);
  };

  if (isLoading) {
    return (
      <Layout showSidebar>
        <div className="container p-4 md:p-6 lg:p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-[200px] bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout showSidebar userType={(profile?.role || "founder") as "founder" | "fundraisingPro"}>
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
                    {profile?.role === 'founder' ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="startup_name">Startup Name</Label>
                          <Input 
                            id="startup_name" 
                            name="startup_name" 
                            value={formData.startup_name || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="startup_description">Startup Description</Label>
                          <Textarea 
                            id="startup_description" 
                            name="startup_description" 
                            value={formData.startup_description || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="stage">Stage</Label>
                            <Select 
                              value={formData.stage || ''}
                              onValueChange={(value) => handleSelectChange("stage", value)}
                            >
                              <SelectTrigger id="stage">
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
                          
                          <div className="space-y-2">
                            <Label htmlFor="funding_goal">Funding Goal</Label>
                            <Input 
                              id="funding_goal" 
                              name="funding_goal" 
                              type="number"
                              value={formData.funding_goal || ''}
                              onChange={handleInputChange}
                            />
                            {formErrors.funding_goal && (
                              <p className="text-sm text-red-500">{formErrors.funding_goal}</p>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="organization_name">Organization Name</Label>
                          <Input 
                            id="organization_name" 
                            name="organization_name" 
                            value={formData.organization_name || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="focus">Investment Focus</Label>
                          <Input 
                            id="focus" 
                            name="focus" 
                            value={formData.focus || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fund_size_goal">Fund Size Goal</Label>
                          <Input 
                            id="fund_size_goal" 
                            name="fund_size_goal" 
                            type="number"
                            value={formData.fund_size_goal || ''}
                            onChange={handleInputChange}
                          />
                          {formErrors.fund_size_goal && (
                            <p className="text-sm text-red-500">{formErrors.fund_size_goal}</p>
                          )}
                        </div>
                      </>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        name="website" 
                        value={formData.website || ''}
                        onChange={handleInputChange}
                      />
                      {formErrors.website && (
                        <p className="text-sm text-red-500">{formErrors.website}</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </CardFooter>
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
                        {formData.profile_picture ? (
                          <img 
                            src={formData.profile_picture} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserIcon className="h-16 w-16 text-gray-400" />
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="absolute bottom-0 right-0 rounded-full"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <span className="animate-spin">↻</span>
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Upload a square image, at least 400x400px</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'Upload'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, profile_picture: undefined }));
                          updateProfile({ ...formData, profile_picture: null });
                        }}
                        disabled={!formData.profile_picture || isUploading}
                      >
                        Remove
                      </Button>
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
                        <span className="text-sm">Apr 15, 2025</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-gray-500" />
                          <span>Account Type</span>
                        </div>
                        <span className="text-sm capitalize">{formData.role || ''}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Danger Zone</h3>
                      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove your data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                              Cancel
                            </Button>
                            <Button 
                              variant="destructive" 
                              onClick={handleDeleteAccount}
                            >
                              Yes, delete my account
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
                      value={formData.organization_name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input 
                      id="companyWebsite" 
                      name="companyWebsite" 
                      value={formData.website || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Company Description</Label>
                  <Textarea 
                    id="companyDescription" 
                    name="companyDescription" 
                    value={formData.startup_description || ''}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                      value={formData.industry && formData.industry.length > 0 ? formData.industry[0] : ''}
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
                      value={formData.stage || ''}
                      onValueChange={(value) => handleSelectChange("stage", value)}
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
                      value={formData.startup_name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input 
                      id="teamSize" 
                      name="teamSize" 
                      value={formData.startup_name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fundingAmount">Funding Target</Label>
                  <Input 
                    id="fundingAmount" 
                    name="fundingAmount" 
                    value={formData.funding_goal || ''}
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
                      value={formData.email_provider || ''}
                      onValueChange={(value) => handleSelectChange("email_provider", value)}
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
                  
                  {formData.email_provider === 'gmail' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gmailAddress">Gmail Address</Label>
                        <Input 
                          id="gmailAddress" 
                          value={formData.startup_name || ''}
                          readOnly
                        />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
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
                  
                  {formData.email_provider === 'outlook' && (
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
                  
                  {formData.email_provider === 'smtp' && (
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
                      <AlertCircleIcon className="h-5 w-5 text-red-600" />
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
                    checked={!!formData.email_connected}
                    onCheckedChange={(checked) => handleSwitchChange("email_connected", checked)}
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
                    checked={true}
                    onCheckedChange={(checked) => handleSwitchChange("weeklyDigest", checked)}
                    disabled={!formData.email_connected}
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
                    checked={true}
                    onCheckedChange={(checked) => handleSwitchChange("investorAlerts", checked)}
                    disabled={!formData.email_connected}
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
                    disabled={!formData.email_connected}
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

export default Profile;
