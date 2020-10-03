import { createContext } from "react";

export interface IGlobal {
    loading: boolean,
    setContext: React.Dispatch<React.SetStateAction<IGlobal>>
}

export const GlobalContext = createContext<IGlobal>({ loading: true , setContext: () => console.log() });
