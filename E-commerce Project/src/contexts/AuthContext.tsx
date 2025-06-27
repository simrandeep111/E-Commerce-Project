import React, { createContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock login - in a real app, this would be an API call
    const newUser = { id: '1', email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const signup = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock signup - in a real app, this would be an API call
    const newUser = { id: '1', email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock registration - in a real app, this would be an API call
    const newUser = { id: '1', name, email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};