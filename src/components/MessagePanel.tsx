import CustomerTalk from "../components/CustomerTalk";
import AdminTalk from "../components/AdminTalk";
import MessageBox from "../components/MessageBox";
import { createSignal } from "solid-js";
import BusyContext from "../components";
import { type BusyStatus } from "../components";

const [selection, setSelection] = createSignal<{ id: string; uid: string } | undefined>();
const [sending, setSending] = createSignal<boolean>(false);
const [busy, setBusy] = createSignal<BusyStatus[]>([]);

const MessagePanel = ({ from, to, admin }: { from: string, to: string, admin: boolean }) => {
  return (
    <BusyContext.Provider value={{busy, setBusy}}>
      <div class="sticky md:fixed bottom-0 right-0 py-10 flex flex-col">
        <MessageBox
          //   client:visible
          uid={from}
          setSelection={setSelection}
          selection={selection}
        />
        {
          admin ? (
            <AdminTalk
              //   client:idle
              from={from}
              selection={selection}
              sending={sending}
              setSending={setSending}
            />
          ) : (
            <CustomerTalk
              //   client:idle
              from={from}
              owner={to}
              sending={sending}
              setSending={setSending}
            />
          )
        }
      </div>
    </BusyContext.Provider>
  )
}

export default MessagePanel