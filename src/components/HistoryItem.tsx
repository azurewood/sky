import { type Message } from "./MessageItem";
// import { type Setter } from "solid-js";

const HistoryItem = ({ message }: { message: Message }) => {
    return (
        <div class="text-slate-100 shadow-inner px-5 py-3 bg-slate-500 bg-opacity-75">
            {message.content}
        </div>
    )
}

export default HistoryItem