
export type UserRole = 'founder' | 'fundraisingPro' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  createdAt: Date;
}

export interface Founder extends User {
  role: 'founder';
  companyName: string;
  industry: string;
  fundingStage: string;
  pitchDeck?: string;
  fundingGoal?: number;
  companyDescription?: string;
}

export interface FundraisingPro extends User {
  role: 'fundraisingPro';
  specialties: string[];
  experience: string;
  successfulRaises?: number;
  averageRaiseAmount?: number;
  bio?: string;
}

export interface Investor {
  id: string;
  name: string;
  firm?: string;
  email?: string;
  linkedInUrl?: string;
  investmentFocus: string[];
  fundingStagePreference: string[];
  location: string;
  minimumCheckSize?: number;
  maximumCheckSize?: number;
  portfolioCompanies?: string[];
  notes?: string;
  tags?: string[];
  lastContactDate?: Date;
  status?: 'researched' | 'contacted' | 'meeting' | 'following-up' | 'passed' | 'interested';
  contactHistory?: ContactRecord[];
}

export interface ContactRecord {
  id: string;
  date: Date;
  type: 'email' | 'linkedin' | 'call' | 'meeting' | 'other';
  notes?: string;
  followUpDate?: Date;
}

export interface InvestorUpdate {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  sentTo?: string[];
  metrics?: Record<string, any>;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  location?: string;
  attendees?: string[];
  type: 'pitch' | 'conference' | 'meetup' | 'demo-day' | 'other';
}
