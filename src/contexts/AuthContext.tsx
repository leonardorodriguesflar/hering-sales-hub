import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'vendedor' | 'planejamento';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  region?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users para demonstração
const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Vendedor',
    email: 'vendedor@hering.com',
    role: 'vendedor',
    region: 'Sul'
  },
  {
    id: '2',
    name: 'Maria Planejamento',
    email: 'planejamento@hering.com',
    role: 'planejamento'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('hering_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthContext login called with:', { email, password });
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - aceita qualquer senha para demonstração
    const foundUser = mockUsers.find(u => u.email === email);
    console.log('Found user:', foundUser);
    
    if (foundUser && password.length > 0) {
      console.log('Login successful, setting user:', foundUser);
      setUser(foundUser);
      localStorage.setItem('hering_user', JSON.stringify(foundUser));
      return true;
    }
    
    console.log('Login failed');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hering_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}