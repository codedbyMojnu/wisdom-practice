import { useContext } from "react";
import { WisdomLogsContext } from "../contexts/WisdomLogsContext";

export const useWisdomLogs = () => {
    return useContext(WisdomLogsContext);
};
