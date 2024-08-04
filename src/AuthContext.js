import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const fakeAuth = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'password') {
          resolve({ token: 'fake-token' });
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000);
    });
  };
  const login = async ({ username, password }) => {
    try {
      const result = await fakeAuth({ username, password });
      setToken(result.token);
      localStorage.setItem('token', result.token);
    } catch (error) {
      throw error;
    }
  };


  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};