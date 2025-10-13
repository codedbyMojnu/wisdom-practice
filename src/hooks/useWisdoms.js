import { useContext } from "react";
import { WisdomsContext } from "../contexts/WisdomsContext";

export const useWisdoms = () => {
    return useContext(WisdomsContext);
};
