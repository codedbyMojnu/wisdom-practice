import { createContext, useContext, useState } from "react";

const WisdomsContext = createContext(null);

export default function WisdomsProvider({ children }) {
  const [wisdomsData, setWisdomsData] = useState([]);
  return (
    <WisdomsContext.Provider value={{ wisdomsData, setWisdomsData }}>
      {children}
    </WisdomsContext.Provider>
  );
}

export function useWisdomsData() {
  const context = useContext(WisdomsContext);
  if (!context) {
    throw new Error("useWisdomsData must be used within a WisdomsProvider");
  }
  return context;
}
