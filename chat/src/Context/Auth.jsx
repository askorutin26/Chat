import React, { useState, createContext } from 'react';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const isLogged = () => !!localStorage.getItem('token');
  const [loggedIn, setLogged] = useState(isLogged());

  const logIn = () => setLogged(true);
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLogged(false);
  };
  const props = { loggedIn, logIn, logOut };
  return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}
export { AuthProvider };
export { AuthContext };
