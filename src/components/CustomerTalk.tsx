import { createSignal, createEffect, type JSX, type Setter, type Accessor, useContext } from "solid-js";
import DataContext, { updateState, type User } from ".";

const CustomerTalk = ({ from, owner, sending, setSending, open, setOpen }: { open: Accessor<boolean>, setOpen: Setter<boolean>, from: string, owner: string, sending: Accessor<boolean>, setSending: Setter<boolean> }) => {
  // const [open, setOpen] = createSignal(false);
  const [response, setResponse] = createSignal("");
  const [content, setContent] = createSignal("");
  // const [sending, setSending] = createSignal(false);
  const { busy, setBusy, user } = useContext(DataContext);
  const [userInfo, setUserInfo] = createSignal<User>();

  createEffect(() => {
    setUserInfo(user().find(a => a.user === owner));
    // console.log(userInfo());
  })

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
    setResponse("");

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    // const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get("content");
    // const owner = import.meta.env.ADMIN_UID;
    if (content === undefined || content?.toString() === undefined || content?.toString().length < 5) {
      setResponse("Message is too short!");
      return;
    }
    setSending(true);
    //setBusy([...busy(), { name: "CustomerTalk", state: true }]);
    setBusy(updateState(busy(), "CustomerTalk", { state: true }));
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
    setSending(false);
    setBusy(updateState(busy(), "CustomerTalk", { state: false }));
  }

  const inputHandler: JSX.InputEventHandler<HTMLTextAreaElement, InputEvent> = (e,) => {
    // console.log(e.currentTarget.value);
    setContent(e.currentTarget.value);
  }

  return (
    <>
      <div class="md:w-96 flex flex-col justify-between text-blue-200 shadow-inner rounded px-0 pt-3 pb-2 bg-blue-600">
        {/* <div class="px-3 gap-y-1"> */}
        <div class="w-full self-center mb-1 text-lg flex flex-row px-5 gap-y-1"><a href="#" onClick={handleOpen} class="text-center flex-grow">Talk to Sky</a>
          {open() ?
            <div>
              <button class="px-0" onClick={handleClose}><strong class="text-2xl cursor-pointer select-none">&times;</strong></button>
              <div></div>
            </div>
            :
            <div>
              <button class="px-0" onClick={handleOpen}><strong class="text-2xl cursor-pointer select-none">&boxbox;</strong></button>
              <div></div>
            </div>}
        </div>

        {open() ?
          <div class="flex flex-col px-5 gap-y-1">
            <form onSubmit={onSubmit}>
              <div class="relative w-full min-w-[200px]">
                <textarea placeholder="" name="content" id="content" onInput={inputHandler} value={content()}
                  class="peer h-full min-h-[120px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 rounded-none outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"></textarea>
                <label for="content"
                  class="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Dear {userInfo()?.name},
                </label>
                {/* <input type="text" style="display:none"
                name="from"
                value={from}></input> */}
              </div>
              <div class="flex flex-row justify-center">
                <button class="w-32 mb-2 self-center select-none border shadow active:translate-y-px active:translate-x-px dark:bg-zinc-100 bg-zinc-900 border-zinc-900 py-1.5 dark:border-zinc-100 rounded-full mt-2 dark:text-zinc-900 text-zinc-100 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed">Send</button>
              </div>
              {response() && <p class="text-red-700">{response()}</p>}
            </form>
          </div>
          : <></>}

        {/* </div> */}

      </div>
      {sending() ?
        <div class='h-1 w-full bg-slate-100 overflow-hidden'>
          {/* <div class='animate-pulse w-full h-full bg-slate-500 origin-left-right'></div> */}
          <div class='animate-progress w-full h-full bg-slate-500 origin-left-right'></div>
        </div> : <div class='h-1 w-full bg-opacity-0 overflow-hidden'></div>}
    </>
  )
}

export default CustomerTalk


