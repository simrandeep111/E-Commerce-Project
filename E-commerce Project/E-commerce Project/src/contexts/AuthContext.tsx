import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



interface User {
  id: string;
  name?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
   token: string | null; 
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
  login: async () => { },
  signup: async () => { },
  register: async () => { },
  logout: () => { },
  token: null
});

// ...imports remain the same
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token'); 
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken); //Set token too
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    setUser(data.user);
    setToken(data.token); // Save token in state
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');

    setUser(data.user);
    setToken(data.token); // Save token in state
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  };

  const signup = async (email: string) => {
    const res = await fetch('http://localhost:5000/api/auth/email-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Email signup failed');

    console.log('Signed up with email:', data.message || email);
  };

  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
    setToken(null); //Clear token from state
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token, // Include token in context
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
