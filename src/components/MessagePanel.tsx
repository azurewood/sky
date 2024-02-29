import CustomerTalk from "../components/CustomerTalk";
import AdminTalk from "../components/AdminTalk";
import MessageBox from "../components/MessageBox";
import { createSignal } from "solid-js";

const [selection, setSelection] = createSignal<
  { id: string; uid: string } | undefined
>();

const MessagePanel = ({from, to, admin}:{from:string,to:string,admin:boolean}) => {
  return (
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
        />
      ) : (
        <CustomerTalk
        //   client:idle
          from={from}
          owner={to}
        />
      )
    }
  </div>
  )
}

export default MessagePanel