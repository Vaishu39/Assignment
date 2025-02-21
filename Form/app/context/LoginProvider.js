import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext(); // Create a context for login state

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn}}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext); // Custom hook to access login state

export default LoginProvider; // Export LoginProvider for use in the app