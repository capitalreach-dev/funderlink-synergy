
import { User, Founder, FundraisingPro, Investor, InvestorUpdate, Event } from '../types';

// Mock data for development purposes
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@startup.com',
    role: 'founder',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@fundraiser.com',
    role: 'fundraisingPro',
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
    createdAt: new Date('2023-02-10')
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@funderlink.com',
    role: 'admin',
    createdAt: new Date('2023-01-01')
  }
];

export const mockFounders: Founder[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@startup.com',
    role: 'founder',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2023-01-15'),
    companyName: 'TechNova',
    industry: 'SaaS',
    fundingStage: 'Seed',
    fundingGoal: 1500000,
    companyDescription: 'AI-powered customer service platform'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@ecotech.com',
    role: 'founder',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: new Date('2023-03-20'),
    companyName: 'EcoTech Solutions',
    industry: 'CleanTech',
    fundingStage: 'Series A',
    fundingGoal: 5000000,
    companyDescription: 'Sustainable energy solutions for residential buildings'
  }
];

export const mockFundraisingPros: FundraisingPro[] = [
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@fundraiser.com',
    role: 'fundraisingPro',
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
    createdAt: new Date('2023-02-10'),
    specialties: ['SaaS', 'FinTech', 'Early Stage'],
    experience: '10+ years',
    successfulRaises: 15,
    averageRaiseAmount: 2500000,
    bio: 'Specialized in helping early-stage startups secure seed and Series A funding'
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@capitaladvisors.com',
    role: 'fundraisingPro',
    profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg',
    createdAt: new Date('2023-01-25'),
    specialties: ['BioTech', 'HealthTech', 'Growth Stage'],
    experience: '8 years',
    successfulRaises: 12,
    averageRaiseAmount: 7500000,
    bio: 'Former VC with deep connections in the healthcare and biotech spaces'
  }
];

export const mockInvestors: Investor[] = [
  {
    id: '101',
    name: 'Alex Chen',
    firm: 'Horizon Ventures',
    email: 'alex@horizonvc.com',
    linkedInUrl: 'https://linkedin.com/in/alexchen',
    investmentFocus: ['SaaS', 'AI', 'FinTech'],
    fundingStagePreference: ['Seed', 'Series A'],
    location: 'San Francisco, CA',
    minimumCheckSize: 250000,
    maximumCheckSize: 2000000,
    portfolioCompanies: ['Stripe', 'Notion', 'Figma'],
    tags: ['quick-response', 'technical-background'],
    status: 'researched'
  },
  {
    id: '102',
    name: 'Priya Sharma',
    firm: 'BlueSky Capital',
    email: 'priya@blueskycap.com',
    linkedInUrl: 'https://linkedin.com/in/priyasharma',
    investmentFocus: ['HealthTech', 'BioTech'],
    fundingStagePreference: ['Series A', 'Series B'],
    location: 'Boston, MA',
    minimumCheckSize: 1000000,
    maximumCheckSize: 5000000,
    portfolioCompanies: ['ModernHealth', 'GenomicDx'],
    tags: ['healthcare-specialist'],
    status: 'contacted'
  },
  {
    id: '103',
    name: 'Marcus Johnson',
    firm: 'Redwood Partners',
    email: 'marcus@redwoodpartners.com',
    linkedInUrl: 'https://linkedin.com/in/marcusjohnson',
    investmentFocus: ['CleanTech', 'Sustainability'],
    fundingStagePreference: ['Seed', 'Series A', 'Series B'],
    location: 'New York, NY',
    minimumCheckSize: 500000,
    maximumCheckSize: 7000000,
    status: 'meeting'
  },
  {
    id: '104',
    name: 'Emma Wilson',
    firm: 'Foundation Capital',
    email: 'emma@foundationcap.com',
    linkedInUrl: 'https://linkedin.com/in/emmawilson',
    investmentFocus: ['E-commerce', 'Consumer Tech', 'Marketplaces'],
    fundingStagePreference: ['Seed'],
    location: 'Los Angeles, CA',
    minimumCheckSize: 100000,
    maximumCheckSize: 1500000,
    status: 'following-up'
  },
  {
    id: '105',
    name: 'David Kim',
    firm: 'Ascend Ventures',
    email: 'david@ascendvc.com',
    linkedInUrl: 'https://linkedin.com/in/davidkim',
    investmentFocus: ['EdTech', 'Future of Work', 'SaaS'],
    fundingStagePreference: ['Series A'],
    location: 'Chicago, IL',
    minimumCheckSize: 750000,
    maximumCheckSize: 3000000,
    status: 'interested'
  },
  {
    id: '106',
    name: 'Sarah Martinez',
    firm: 'Innovative Fund',
    email: 'sarah@innovative.vc',
    linkedInUrl: 'https://linkedin.com/in/sarahmartinez',
    investmentFocus: ['AI', 'ML', 'Data Analytics'],
    fundingStagePreference: ['Seed', 'Series A'],
    location: 'Austin, TX',
    minimumCheckSize: 200000,
    maximumCheckSize: 2500000,
    status: 'passed'
  }
];

export const mockInvestorUpdates: InvestorUpdate[] = [
  {
    id: '201',
    title: 'Q2 2023 Investor Update',
    content: 'We are pleased to announce that we have reached 10,000 users this quarter, representing a 25% growth from the previous quarter...',
    createdAt: new Date('2023-07-01'),
    sentTo: ['101', '103', '105'],
    metrics: {
      revenue: '$250,000',
      users: 10000,
      growth: '25%'
    }
  },
  {
    id: '202',
    title: 'Product Launch Announcement',
    content: 'We are excited to share that our new feature XYZ will be launching next month...',
    createdAt: new Date('2023-08-15'),
    sentTo: ['101', '102', '104', '105']
  }
];

export const mockEvents: Event[] = [
  {
    id: '301',
    title: 'Y Combinator Demo Day',
    description: 'Presenting our startup at the prestigious YC Demo Day',
    date: new Date('2023-08-30'),
    location: 'Mountain View, CA',
    type: 'demo-day'
  },
  {
    id: '302',
    title: 'Meeting with Horizon Ventures',
    description: 'Pitch meeting with Alex Chen from Horizon Ventures',
    date: new Date('2023-08-10'),
    location: 'Zoom',
    attendees: ['101'],
    type: 'pitch'
  },
  {
    id: '303',
    title: 'TechCrunch Disrupt',
    description: 'Annual technology conference',
    date: new Date('2023-09-20'),
    location: 'San Francisco, CA',
    type: 'conference'
  }
];
