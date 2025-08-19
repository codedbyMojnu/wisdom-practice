import { createContext, useContext, useState } from "react";

const WisdomsLogsContext = createContext();

export default function WisdomLogsProvider({ children }) {
  const [wisdomLogs, setWisdomLogs] = useState(null);
  return (
    <WisdomsLogsContext.Provider value={{ wisdomLogs, setWisdomLogs }}>
      {children}
    </WisdomsLogsContext.Provider>
  );
}

export function useWisdomLogs() {
  return useContext(WisdomsLogsContext);
}
