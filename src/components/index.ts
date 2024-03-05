import { createContext, createSignal } from "solid-js";

export interface BusyStatus {
    id: string,
    state?: boolean;
};

export interface User {
    user: string,
    email: string,
    name?: string | undefined;
}

export const updateState = (arr: BusyStatus[], id: string, updatedData: Partial<BusyStatus>): BusyStatus[] => {
    if (arr.findIndex(item => item.id === id) < 0)
        return [...arr, { id: id, ...updatedData }];
    else
        return arr.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
}

export const useDataValue = (initialValue = []) => {
    const [busy, setBusy] = createSignal<BusyStatus[]>(initialValue ?? []);
    const [user, setUser] = createSignal<User[]>([]);
    // return [busy,setBusy] as const;
    return { busy, setBusy, user, setUser };
}
type DataContextType = ReturnType<typeof useDataValue>;
//const BusyContext: Context<{ busy: Accessor<boolean>, setBusy: Setter<boolean> }> = createContext<BusyContextType>({ busy: () => false, setBusy: () => false });
const DataContext = createContext<DataContextType>({ busy: () => [], setBusy: () => [], user: () => [], setUser: () => [] });

export default DataContext;