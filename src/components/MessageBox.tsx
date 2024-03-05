import { createSignal, onCleanup, For, type Setter, type Accessor, useContext } from "solid-js";
import { type Message } from "./MessageItem";
import MessageItem from "./MessageItem";
import DataContext from ".";

const MessageBox = ({ uid, setSelection, selection, setOpen }: { setOpen: Setter<boolean>, uid: string, setSelection: Setter<{ id: string, uid: string } | undefined>, selection: Accessor<{ id: string, uid: string } | undefined> }) => {
    // const [count, setCount] = createSignal(0);
    const [messages, setMessages] = createSignal<Message[]>([]);
    const [backup, setBackup] = createSignal<Message[]>([]);
    const [loading, setLoading] = createSignal(false);
    // const [selection, setSelection] = createSignal<{ id: string, uid: string } | undefined>();
    const { busy, setBusy } = useContext(DataContext);
    const [error, setError] = createSignal(false);

    const getMessages = async () => {
        if (findBusy() >= 0)
            return;
        setLoading(true);
        setBackup(messages());
        const res = await fetch(`/api/message.json?uid=${uid}`);
        const data = await res.json();

        if (!data.error) {
            setError(false);
            if (findBusy() < 0) {
                setBusy([]);
                setMessages(data);
            }
            setLoading(false);
        }
        else
            setError(true);


    }

    const timer = setInterval(getMessages, 10000);

    onCleanup(() => { clearInterval(timer) });

    const found = (message: Message) => {
        return backup().findIndex(a => message.id === a.id);
    }

    const findBusy = () => {
        return busy().findIndex(a => {
            // console.log(a.id, a.state)
            return a.state === true;
        });
    }


    return (
        <ul class="md:w-96">
            <For each={messages()}>
                {
                    (message) => (
                        <li>
                            {/* <div class="flex justify-between text-blue-200 shadow-inner rounded px-0 py-3 bg-blue-600">
                                <p class="self-center px-3"><strong>Info</strong>{message.content}</p>
                                <button class="px-3" onClick={handleClose}><strong class="text-2xl cursor-pointer select-none">&times;</strong></button>
                            </div> */}
                            <MessageItem fresh={found(message) < 0 ? true : false} message={message} setOpen={setOpen} setSelection={setSelection} selection={selection}></MessageItem>

                        </li>
                    )
                }
            </For>
            {loading() ?
                <div class='h-1 w-full bg-pink-100 overflow-hidden'>
                    {/* <div class='animate-pulse w-full h-full bg-pink-500 origin-left-right'></div> */}
                    <div class={'w-full h-full bg-pink-500 origin-right-left' + (error() ? " animate-pulse" : " animate-backprog")} ></div>
                </div> : <div class='h-1 w-full bg-opacity-5 overflow-hidden'></div>}
        </ul>
    )
}

export default MessageBox