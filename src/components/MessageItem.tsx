import { createSignal, type Setter, type Accessor } from "solid-js";

export interface Message {
    id: string;
    created_at: string;
    content: string;
    from: string;
    owner: string;
    read: boolean;
}

const MessageItem = ({ fresh, message, setSelection, selection }: { fresh: boolean, message: Message, setSelection: Setter<{ id: string, uid: string } | undefined>, selection: Accessor<{ id: string, uid: string } | undefined> }) => {
    const [visible, setVisible] = createSignal(true);
    const [ready, setReady] = createSignal(false);
    const [sending, setSending] = createSignal<boolean>(false);

    setTimeout(() => setReady(true), 100);
    const handleClose = async (_: any) => {
        // setVisible(false);
        // console.log("xxx");
        setSending(true);
        const response = await fetch(`/api/message.json?uid=${message.owner}`, {
            method: "PUT", //"DELETE",
            body: JSON.stringify({ id: message.id }), //formData,
        });
        // console.log(response)
        const data = await response.json();
        if (data) {
            setSending(false);
            if (data.error)
                setVisible(true);
            else {
                setVisible(false);
                if (selection()?.id === message.id)
                    setSelection(undefined);
            }
        }
        //   console.log(data)
    }
    const handleClick = (_: any) => {
        // console.log(message.id)
        setSelection({ id: message.id, uid: message.from });
    }


    return (
        <div onClick={handleClick} class={"relative flex flex-row justify-between text-blue-100 shadow-inner rounded px-0 py-2 transform duration-1000 transition-transform " +
            (selection()?.id === message.id ? 'bg-blue-600' : 'bg-blue-400 bg-opacity-75') + " " +
            (ready() ? "scale-y-100" : (fresh ? "scale-y-75" : "scale-y-100")) + " " +
            (fresh ? "bg-opacity-95" : "") + " " + (visible() ? 'block' : 'hidden')}>
            <p class="flex-grow self-center pl-5 overflow-clip"><strong></strong>{message.content}</p>
            <button class={"px-5" + (sending() ? " hidden" : "")} onClick={handleClose}><strong class="text-2xl cursor-pointer select-none">&times;</strong></button>
            {sending() ? <div class='absolute top-0 left-0 h-full w-full opacity-70 bg-slate-100 overflow-hidden'>
                <div class='animate-pulse w-full h-full bg-slate-500 origin-left-right'></div>
            </div> : <></>}
        </div>
    )
}

export default MessageItem