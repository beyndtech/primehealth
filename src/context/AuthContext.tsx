import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  // Function to fetch user data with token
  const fetchUser = async (token: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      setFetching(true);
      const res = await fetch(`${url}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal,
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      clearTimeout(timeoutId);
      setFetching(false);
    }
  };

  // Login function
  const login = async (userData: any) => {
    const { token } = userData;
    localStorage.setItem('token', token);
    await fetchUser(token);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // Fetch user data from local storage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      fetchUser(token);
    } else {
      setFetching(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, fetching, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);
export const contextData = useAuthContext;
