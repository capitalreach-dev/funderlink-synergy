
import { User, Founder, FundraisingPro } from "../types";
import { mockFounders, mockFundraisingPros } from "../utils/mockData";

// Since we're making a frontend-only demo, this simulates authentication
// In a real app, this would use proper authentication methods
export const authStore = {
  currentUser: null as (Founder | FundraisingPro | null),
  isAuthenticated: false,

  login(email: string, password: string): Promise<Founder | FundraisingPro> {
    return new Promise((resolve, reject) => {
      // In a real app, this would validate against a backend
      setTimeout(() => {
        // For demo, we'll accept any matching email from our mock data
        const founder = mockFounders.find(f => f.email === email);
        if (founder) {
          this.currentUser = founder;
          this.isAuthenticated = true;
          localStorage.setItem('currentUser', JSON.stringify(founder));
          localStorage.setItem('isAuthenticated', 'true');
          return resolve(founder);
        }

        const pro = mockFundraisingPros.find(p => p.email === email);
        if (pro) {
          this.currentUser = pro;
          this.isAuthenticated = true;
          localStorage.setItem('currentUser', JSON.stringify(pro));
          localStorage.setItem('isAuthenticated', 'true');
          return resolve(pro);
        }

        reject(new Error("Invalid credentials"));
      }, 500);
    });
  },

  signup(userData: Partial<User>, password: string): Promise<Founder | FundraisingPro> {
    return new Promise((resolve, reject) => {
      // In a real app, this would create a new user in the backend
      setTimeout(() => {
        if (!userData.email || !password || !userData.name || !userData.role) {
          return reject(new Error("Missing required fields"));
        }

        // Create a new user based on role
        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          name: userData.name,
          email: userData.email,
          role: userData.role,
          createdAt: new Date(),
          ...(userData.role === 'founder' ? {
            companyName: (userData as Partial<Founder>).companyName || '',
            industry: (userData as Partial<Founder>).industry || '',
            fundingStage: (userData as Partial<Founder>).fundingStage || ''
          } : {
            specialties: (userData as Partial<FundraisingPro>).specialties || [],
            experience: (userData as Partial<FundraisingPro>).experience || ''
          })
        } as Founder | FundraisingPro;

        // In a real app, we would save this to a database
        this.currentUser = newUser;
        this.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('isAuthenticated', 'true');
        resolve(newUser);
      }, 500);
    });
  },

  logout(): void {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  },

  checkAuth(): void {
    const userStr = localStorage.getItem('currentUser');
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    
    if (userStr && isAuth) {
      this.currentUser = JSON.parse(userStr);
      this.isAuthenticated = true;
    }
  },

  getCurrentUser(): Founder | FundraisingPro | null {
    return this.currentUser;
  }
};

// Initialize auth state from localStorage on app load
authStore.checkAuth();
