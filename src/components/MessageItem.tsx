import { createSignal, type Setter, type Accessor } from "solid-js";

export interface Message {
    id: string;
    created_at: string;
    content: string;
    from: string;
    owner: string;
    read: boolean;
}

const MessageItem = ({ message, setSelection, selection }: { message: Message, setSelection: Setter<string>, selection: Accessor<string> }) => {
    const [visible, setVisible] = createSignal(true);
    const handleClose = async (_: any) => {
        setVisible(false);
        // console.log("xxx");
        const response = await fetch("/api/message.json", {
            method: "PUT", //"DELETE",
            body: JSON.stringify({ id: message.id }), //formData,
        });
        // console.log(response)
        const data = await response.json();
        if (data && data.error) {
        }
        //   console.log(data)
    }
    const handleClick = (_: any) => {
        // console.log(message.id)
        setSelection(message.id);
    }


    return (
        <div onClick={handleClick} class={"flex justify-between text-blue-200 shadow-inner rounded px-0 py-3 " + (selection() === message.id ? 'bg-blue-400' : 'bg-blue-600 bg-opacity-30') + " " + (visible() ? 'block' : 'hidden')}>
            <p class="self-center px-3"><strong>Info</strong>{message.content}</p>
            <button class="px-3" onClick={handleClose}><strong class="text-2xl cursor-pointer select-none">&times;</strong></button>
        </div>
    )
}

export default MessageItem