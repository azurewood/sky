import { createContext, createSignal, type Accessor, type Setter, type Context } from "solid-js";

export const useBusyValue = (initialValue = false) => {
    const [busy, setBusy] = createSignal(initialValue ?? false);
    // return [busy,setBusy] as const;
    return { busy, setBusy };
}
type BusyContextType = ReturnType<typeof useBusyValue>;
const BusyContext: Context<{ busy: Accessor<boolean>, setBusy: Setter<boolean> }> = createContext<BusyContextType>(undefined);

export default BusyContext;