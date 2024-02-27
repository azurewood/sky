import { createSignal, onCleanup, For } from "solid-js";

interface Message {
    id: string;
    created_at: string;
    content: string;
    from: string;
    owner: string;
    read: boolean;
}

const MessageBox = ({ uid }: { uid: string }) => {
    // const [count, setCount] = createSignal(0);
    const [messages, setMessages] = createSignal<Message[]>([]);
    const [loading, setLoading] = createSignal(false);

    const getMessages = async () => {
        setLoading(true)
        const res = await fetch(`/api/message.json?uid=${uid}`);
        const data = await res.json();

        if (!data.error)
            setMessages(data);
        setLoading(false);
    }

    const timer = setInterval(getMessages, 15000);

    onCleanup(() => { clearInterval(timer) });

    const handleClose = (_: any) => {
        console.log("xxx");
    }

    return (
        <ul>
            <For each={messages()}>
                {
                    (message) => (
                        <li>
                            <div class="flex justify-between text-blue-200 shadow-inner rounded px-0 py-3 bg-blue-600">
                                <p class="self-center px-3"><strong>Info</strong>{message.content}</p>
                                <button class="px-3" onClick={handleClose}><strong class="text-2xl cursor-pointer select-none">&times;</strong></button>
                            </div>

                        </li>
                    )
                }
            </For>
        </ul>
    )
}

export default MessageBox