import { createSignal, onCleanup, For } from "solid-js";
import { type Message } from "./MessageItem";
import MessageItem from "./MessageItem";

const MessageBox = ({ uid }: { uid: string }) => {
    // const [count, setCount] = createSignal(0);
    const [messages, setMessages] = createSignal<Message[]>([]);
    const [backup, setBackup] = createSignal<Message[]>([]);
    const [loading, setLoading] = createSignal(false);
    const [selection, setSelection] = createSignal("");

    const getMessages = async () => {
        setLoading(true);
        setBackup(messages());
        const res = await fetch(`/api/message.json?uid=${uid}`);
        const data = await res.json();

        if (!data.error) {
            setMessages(data);
            setLoading(false);
        }

    }

    const timer = setInterval(getMessages, 15000);

    onCleanup(() => { clearInterval(timer) });

    const found = (message: Message) => {
        return backup().findIndex(a => message.id === a.id);
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
                            <MessageItem fresh={found(message) < 0 ? true : false} message={message} setSelection={setSelection} selection={selection}></MessageItem>

                        </li>
                    )
                }
            </For>
            {loading() ?
                <div class='h-1 w-full bg-pink-100 overflow-hidden'>
                    <div class='animate-pulse w-full h-full bg-pink-500 origin-left-right'></div>
                </div> : <div class='h-1 w-full bg-opacity-5 overflow-hidden'></div>}
        </ul>
    )
}

export default MessageBox