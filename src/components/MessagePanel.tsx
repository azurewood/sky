import CustomerTalk from "../components/CustomerTalk";
import AdminTalk from "../components/AdminTalk";
import MessageBox from "../components/MessageBox";
import { createSignal, createEffect } from "solid-js";
import DataContext from "../components";
import { type BusyStatus, type User } from "../components";
import { type Message } from "./MessageItem";

const [selection, setSelection] = createSignal<{ id: string; uid: string } | undefined>();
const [sending, setSending] = createSignal<boolean>(false);
const [busy, setBusy] = createSignal<BusyStatus[]>([]);
const [user, setUser] = createSignal<User[]>([]);
const [open, setOpen] = createSignal(false);
const [showSide, setShowSide] = createSignal(false);
const [history, setHistory] = createSignal<Message[]>([]);

const MessagePanel = ({ from, to, admin }: { from: string, to: string, admin: boolean }) => {

  createEffect(async () => {
    const res = await fetch(`/api/skyuser.json?uid=${from}`);
    const data = await res.json();

    if (!data.error) {
      // console.log(data)
      setUser(data);
    }

  });

  return (
    <DataContext.Provider value={{ busy, setBusy, user, setUser }}>
      <div class="sticky md:fixed bottom-0 right-0 py-10 flex flex-col">
        <MessageBox
          //   client:visible
          uid={from}
          setSelection={setSelection}
          selection={selection}
          setOpen={setOpen}
          setShowSide={setShowSide}
          setHistory={setHistory}
        />
        {
          admin ? (
            <AdminTalk
              //   client:idle
              from={from}
              selection={selection}
              sending={sending}
              setSending={setSending}
              open={open}
              setOpen={setOpen}
              showSide={showSide}
              setShowSide={setShowSide}
            />
          ) : (
            <CustomerTalk
              //   client:idle
              from={from}
              owner={to}
              sending={sending}
              setSending={setSending}
              open={open}
              setOpen={setOpen}
              history={history}
              showSide={showSide}
              setShowSide={setShowSide}
            />
          )
        }
      </div>
    </DataContext.Provider>
  )
}

export default MessagePanel