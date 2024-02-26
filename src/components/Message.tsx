import { createSignal, onCleanup } from "solid-js";

const Message = ({ content }: { content: string }) => {
    const [count, setCount] = createSignal(0);
    // let timer:any;
   
    // onMount(()=>{
        console.log("aaibbc");
       const timer = setInterval(() => setCount(count()+1), 1000);
        
// });
onCleanup(() => {clearInterval(timer);console.log("clean up",timer)});



    return (
        <div>{content}{count()}</div>
    )
}

export default Message