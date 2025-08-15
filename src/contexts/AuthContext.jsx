import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null);
  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthData() {
  return useContext(AuthContext);
}
