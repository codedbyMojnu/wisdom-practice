import { createContext, useContext, useState } from "react";

export const WisdomLogsContext = createContext();

export default function WisdomLogsProvider({ children }) {
  const [wisdomLogs, setWisdomLogs] = useState(null);
  return (
    <WisdomLogsContext.Provider value={{ wisdomLogs, setWisdomLogs }}>
      {children}
    </WisdomLogsContext.Provider>
  );
}

export function useWisdomLogs() {
  return useContext(WisdomLogsContext);
}
