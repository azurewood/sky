import { createContext, createSignal } from "solid-js";

export interface BusyStatus {
    id: string,
    state?: boolean;
};

export const updateState = (arr: BusyStatus[], id: string, updatedData: Partial<BusyStatus>): BusyStatus[] => {
    if (arr.findIndex(item => item.id === id) < 0)
        return [...arr, { id: id, ...updatedData }];
    else
        return arr.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
}

export const useBusyValue = (initialValue = []) => {
    const [busy, setBusy] = createSignal<BusyStatus[]>(initialValue ?? []);
    // return [busy,setBusy] as const;
    return { busy, setBusy };
}
type BusyContextType = ReturnType<typeof useBusyValue>;
//const BusyContext: Context<{ busy: Accessor<boolean>, setBusy: Setter<boolean> }> = createContext<BusyContextType>({ busy: () => false, setBusy: () => false });
const BusyContext = createContext<BusyContextType>({ busy: () => [], setBusy: () => [] });

export default BusyContext;