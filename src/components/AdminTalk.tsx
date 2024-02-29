import { createSignal, type JSX, type Accessor } from "solid-js";


const AdminTalk = ({ from, selection }: { from: string, selection: Accessor<{ id: string, uid: string } | undefined> }) => {
  const [open, setOpen] = createSignal(false);
  const [response, setResponse] = createSignal("");
  const [content, setContent] = createSignal("");

  const handleClose = (_: any) => {
    setOpen(false);
    // console.log(open(),"xxx");
  }

  const handleOpen = (_: any) => {
    setOpen(true);
    // console.log(open(),"yyy");
  }

  // async function submit(e: SubmitEvent) {
  const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e,
  ) => {
    e.preventDefault();
    if (selection()?.uid === undefined) {
      setResponse("No user is selected!");
      return;
    }
    setResponse("");
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    // const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get("content");
    const owner = selection()?.uid;
    if (content === undefined || content?.toString() === undefined || content?.toString().length < 5) {
      setResponse("Message is too short!");
      return;
    }
    const response = await fetch(`/api/message.json?uid=${from}`, {
      method: "POST",
      body: JSON.stringify({ from, content, owner }), //formData,
    });
    // console.log(response)
    const data = await response.json();
    if (data.error) {
      setResponse(data.error);
    }
    setContent("");
  }

  const keyUpHandler: JSX.EventHandlerUnion<HTMLTextAreaElement, KeyboardEvent> = (e,) => {
    // console.log(e.currentTarget.value);
    setContent(e.currentTarget.value);
  }

  return (
    <div class="md:w-96 flex flex-col justify-between text-blue-200 shadow-inner rounded px-0 py-3 bg-blue-600">

      <div class="w-full self-center mb-1 text-lg flex flex-row px-3 gap-y-1"><a href="#" onClick={handleOpen} class="text-center flex-grow">Sky Talk</a>
        {open() ?
          <div>
            <button class="px-3" onClick={handleClose}><strong class="text-2xl cursor-pointer select-none">&times;</strong></button>
            <div></div>
          </div>
          :
          <div>
            <button class="px-3" onClick={handleOpen}><strong class="text-2xl cursor-pointer select-none">&boxbox;</strong></button>
            <div></div>
          </div>}
      </div>

      {/* <p>{selection()?.uid}</p> */}
      {open() ? <form onSubmit={onSubmit}>
        <div class="flex flex-col px-3 gap-y-1">
          <div class="relative w-full min-w-[200px]">
            <textarea placeholder="" name="content" id="content" onKeyUp={keyUpHandler} value={content()}
              class="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 rounded-none outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"></textarea>
            <label for="content"
              class="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Message
            </label>
            {/* <input type="text" style="display:none"
                name="from"
                value={from}></input> */}
          </div>
          <button class={"w-32 mb-2 self-center select-none border shadow active:translate-y-px active:translate-x-px dark:bg-zinc-100 bg-zinc-900 border-zinc-900 py-1.5 dark:border-zinc-100 rounded-md mt-2 dark:text-zinc-900 text-zinc-100 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed" + (selection()?.uid === undefined ? " disabled" : "")}>Send</button>
          {response() && <p class="text-red-700">{response()}</p>}
        </div>
      </form> : <></>}


    </div>
  )
}

export default AdminTalk


