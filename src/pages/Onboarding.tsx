
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, ChevronsRight, Mail, Building, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    industry: "",
    description: "",
    foundedYear: "",
    teamSize: "",
    fundingAmount: "",
    fundingStage: "pre-seed",
    emailProvider: "gmail",
    emailAddress: "",
    emailPassword: "",
    smtpServer: "",
    smtpPort: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the data to your backend or state management
    console.log("Form submitted:", formData);
    
    toast({
      title: "Onboarding complete!",
      description: "Your account has been set up successfully.",
    });
    
    // Redirect to dashboard after successful onboarding
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-3xl py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to Capital Reach AI</h1>
          <p className="text-muted-foreground">Let's set up your account to connect with the right investors</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between relative">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-navy text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <Check className="h-5 w-5" /> : "1"}
              </div>
              <span className="text-sm">Company Info</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-navy text-white' : 'bg-gray-200'}`}>
                {step > 2 ? <Check className="h-5 w-5" /> : "2"}
              </div>
              <span className="text-sm">Funding Details</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-navy text-white' : 'bg-gray-200'}`}>
                {step > 3 ? <Check className="h-5 w-5" /> : "3"}
              </div>
              <span className="text-sm">Email Integration</span>
            </div>
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            <div className={`absolute top-5 left-0 h-1 bg-navy -z-10 transition-all duration-300`} style={{ width: `${(step - 1) * 50}%` }}></div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Tell us about your company"}
              {step === 2 && "What are your funding goals?"}
              {step === 3 && "Connect your email"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "This information helps us match you with the right investors"}
              {step === 2 && "Set your funding target and stage to find relevant investors"}
              {step === 3 && "We'll use this to send outreach emails on your behalf"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Your Company Inc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => handleSelectChange("industry", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai">Artificial Intelligence</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="fintech">Fintech</SelectItem>
                        <SelectItem value="healthtech">Healthtech</SelectItem>
                        <SelectItem value="biotech">Biotech</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="enterprise">Enterprise Software</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Tell us about your product, mission, and what makes your company unique"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="foundedYear">Founded Year</Label>
                      <Input
                        id="foundedYear"
                        name="foundedYear"
                        value={formData.foundedYear}
                        onChange={handleChange}
                        placeholder="2023"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Input
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        placeholder="5"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fundingAmount">How much are you raising?</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                      <Input
                        id="fundingAmount"
                        name="fundingAmount"
                        value={formData.fundingAmount}
                        onChange={handleChange}
                        placeholder="1,000,000"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fundingStage">Funding Stage</Label>
                    <RadioGroup
                      value={formData.fundingStage}
                      onValueChange={(value) => handleSelectChange("fundingStage", value)}
                      className="grid grid-cols-2 gap-4 pt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pre-seed" id="pre-seed" />
                        <Label htmlFor="pre-seed" className="font-normal">Pre-seed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="seed" id="seed" />
                        <Label htmlFor="seed" className="font-normal">Seed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="series-a" id="series-a" />
                        <Label htmlFor="series-a" className="font-normal">Series A</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="series-b" id="series-b" />
                        <Label htmlFor="series-b" className="font-normal">Series B+</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg mt-6">
                    <h3 className="font-medium mb-2">Based on your selected funding stage:</h3>
                    {formData.fundingStage === 'pre-seed' && (
                      <p className="text-sm text-gray-600">We'll connect you with angel investors and early-stage funds who typically invest $50K-$500K in companies with promising ideas.</p>
                    )}
                    {formData.fundingStage === 'seed' && (
                      <p className="text-sm text-gray-600">We'll match you with seed funds and micro VCs who typically invest $500K-$2M in companies with early traction.</p>
                    )}
                    {formData.fundingStage === 'series-a' && (
                      <p className="text-sm text-gray-600">We'll introduce you to Series A venture firms looking for product-market fit and significant growth, typically investing $2M-$15M.</p>
                    )}
                    {formData.fundingStage === 'series-b' && (
                      <p className="text-sm text-gray-600">We'll connect you with growth-stage investors looking for scaling companies, typically investing $15M+ with proven business models.</p>
                    )}
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  <Tabs defaultValue="gmail" onValueChange={(value) => handleSelectChange("emailProvider", value)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="gmail">Gmail</TabsTrigger>
                      <TabsTrigger value="outlook">Outlook</TabsTrigger>
                      <TabsTrigger value="smtp">Custom SMTP</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="gmail" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="emailAddress">Gmail Address</Label>
                        <Input
                          id="emailAddress"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleChange}
                          placeholder="you@gmail.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailPassword">App Password</Label>
                        <Input
                          id="emailPassword"
                          name="emailPassword"
                          type="password"
                          value={formData.emailPassword}
                          onChange={handleChange}
                          placeholder="Your app password"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          You'll need to create an app password in your Google account settings.
                          <a href="https://support.google.com/accounts/answer/185833" target="_blank" rel="noopener noreferrer" className="text-navy ml-1">
                            Learn how
                          </a>
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="outlook" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="emailAddress">Outlook Address</Label>
                        <Input
                          id="emailAddress"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleChange}
                          placeholder="you@outlook.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailPassword">Password</Label>
                        <Input
                          id="emailPassword"
                          name="emailPassword"
                          type="password"
                          value={formData.emailPassword}
                          onChange={handleChange}
                          placeholder="Your password"
                          required
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="smtp" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="emailAddress">Email Address</Label>
                        <Input
                          id="emailAddress"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="smtpServer">SMTP Server</Label>
                          <Input
                            id="smtpServer"
                            name="smtpServer"
                            value={formData.smtpServer}
                            onChange={handleChange}
                            placeholder="smtp.company.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPort">SMTP Port</Label>
                          <Input
                            id="smtpPort"
                            name="smtpPort"
                            value={formData.smtpPort}
                            onChange={handleChange}
                            placeholder="587"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailPassword">Password</Label>
                        <Input
                          id="emailPassword"
                          name="emailPassword"
                          type="password"
                          value={formData.emailPassword}
                          onChange={handleChange}
                          placeholder="Your password"
                          required
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
            >
              Back
            </Button>
            {step < 3 ? (
              <Button onClick={handleNext} className="bg-navy hover:bg-navy-light">
                Continue <ChevronsRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-navy hover:bg-navy-light">
                Complete Setup
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Onboarding;
