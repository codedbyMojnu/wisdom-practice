import { createContext, useState } from "react";

export const WisdomsContext = createContext(null);

export default function WisdomsProvider({ children }) {
  const [wisdomsData, setWisdomsData] = useState([]);
  return (
    <WisdomsContext.Provider value={{ wisdomsData, setWisdomsData }}>
      {children}
    </WisdomsContext.Provider>
  );
}
