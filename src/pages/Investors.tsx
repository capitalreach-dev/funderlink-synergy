
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpDown, ChevronDown, Filter, Mail, MoreHorizontal, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockInvestors } from "@/utils/mockData";
import { Investor } from "@/types";

export default function Investors() {
  const [investors, setInvestors] = useState<Investor[]>(mockInvestors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  
  // Filter investors based on search term and filters
  const filteredInvestors = investors.filter((investor) => {
    const matchesSearch =
      searchTerm === "" ||
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (investor.firm && investor.firm.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry =
      selectedIndustries.length === 0 ||
      investor.investmentFocus.some((focus) =>
        selectedIndustries.includes(focus)
      );
    
    const matchesStage =
      selectedStages.length === 0 ||
      investor.fundingStagePreference.some((stage) =>
        selectedStages.includes(stage)
      );
    
    return matchesSearch && matchesIndustry && matchesStage;
  });
  
  // Get unique industries and stages from investors
  const uniqueIndustries = Array.from(
    new Set(investors.flatMap((investor) => investor.investmentFocus))
  ).sort();
  
  const uniqueStages = Array.from(
    new Set(investors.flatMap((investor) => investor.fundingStagePreference))
  ).sort();
  
  const handleIndustryChange = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries((prev) =>
        prev.filter((item) => item !== industry)
      );
    } else {
      setSelectedIndustries((prev) => [...prev, industry]);
    }
  };
  
  const handleStageChange = (stage: string) => {
    if (selectedStages.includes(stage)) {
      setSelectedStages((prev) => prev.filter((item) => item !== stage));
    } else {
      setSelectedStages((prev) => [...prev, stage]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investors</h1>
          <p className="text-muted-foreground">
            Browse and manage your investor database
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Investor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="font-medium">Industry Focus</div>
                {uniqueIndustries.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={`industry-${industry}`}
                      checked={selectedIndustries.includes(industry)}
                      onCheckedChange={() => handleIndustryChange(industry)}
                    />
                    <label
                      htmlFor={`industry-${industry}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {industry}
                    </label>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="font-medium">Funding Stage</div>
                {uniqueStages.map((stage) => (
                  <div key={stage} className="flex items-center space-x-2">
                    <Checkbox
                      id={`stage-${stage}`}
                      checked={selectedStages.includes(stage)}
                      onCheckedChange={() => handleStageChange(stage)}
                    />
                    <label
                      htmlFor={`stage-${stage}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {stage}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search investors..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] ml-2">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="researched">Researched</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="following-up">Following Up</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      <div className="flex items-center gap-1">
                        Investor
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Focus</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvestors.length > 0 ? (
                    filteredInvestors.map((investor) => (
                      <TableRow key={investor.id}>
                        <TableCell className="font-medium">
                          <div>
                            {investor.name}
                            {investor.firm && (
                              <div className="text-sm text-muted-foreground">
                                {investor.firm}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {investor.investmentFocus.slice(0, 2).map((focus) => (
                              <Badge key={focus} variant="outline">
                                {focus}
                              </Badge>
                            ))}
                            {investor.investmentFocus.length > 2 && (
                              <Badge variant="outline">
                                +{investor.investmentFocus.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {investor.fundingStagePreference.slice(0, 2).map((stage) => (
                              <Badge key={stage} variant="outline">
                                {stage}
                              </Badge>
                            ))}
                            {investor.fundingStagePreference.length > 2 && (
                              <Badge variant="outline">
                                +{investor.fundingStagePreference.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{investor.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              investor.status === "interested"
                                ? "default"
                                : investor.status === "passed"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {investor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                <DropdownMenuItem>Add Note</DropdownMenuItem>
                                <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <Search className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No investors found</p>
                          <p className="text-sm text-muted-foreground">
                            Try adjusting your search or filters
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
