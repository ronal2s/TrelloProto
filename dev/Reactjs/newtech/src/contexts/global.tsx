import { createContext } from "react";

interface IData {
    movementReleased: number,
    loading: boolean,
    items: { 'To Do': any[], 'In Progress': any[], 'Done': any[] } | null;
}

export interface IGlobal {
    data: IData,
    setContext: React.Dispatch<React.SetStateAction<IGlobal>>
}

export const GlobalContext = createContext<IGlobal>({ data: { movementReleased: -1, loading: false, items: null }, setContext: () => console.log() });
