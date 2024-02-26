import { createSignal, type JSX } from "solid-js";


const CustomerTalk = ({ from, token }: { from: string, token:string }) => {
  const [open, setOpen] = createSignal(false);
const [response, setResponse] = createSignal("");

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
  const content=formData.get("content");
  if(content===undefined||content?.toString()===undefined||content?.toString().length<5)
  {
    setResponse("Message is too short!");
    return;
  }
  const response = await fetch("/api/message.json", {
    method: "POST",
    body: JSON.stringify({ from, content, token}), //formData,
  });
  // console.log(response)
  const data = await response.json();
  if (data.error) {
    setResponse(data.error);
  }
}

  return (
    <div class="flex justify-between text-blue-200 shadow-inner rounded px-0 py-3 bg-blue-600">
      <div class="flex flex-col px-3 gap-y-1">
        <p class="self-center mb-1"><a href="#" onClick={handleOpen}><strong>Talk to Sky</strong></a></p>

        {open() ? <form onSubmit={onSubmit}>
          <div class="w-96 flex flex-col">
            <div class="relative w-full min-w-[200px]">
              <textarea placeholder="" name="content"
                class="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"></textarea>
              <label
                class="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Message
              </label>
              {/* <input type="text" style="display:none"
                name="from"
                value={from}></input> */}
            </div>
            <button>OK</button>
            {response() && <p class="text-red-700">{response()}</p>}
          </div>
        </form> : <></>}

      </div>

      {open() ?
        <div>
          <button class="px-3" onClick={handleClose}><strong class="text-xl align-center cursor-pointer alert-del">&times;</strong></button>
          <div></div>
        </div>
        :
        <div>
          <button class="px-3" onClick={handleOpen}><strong class="text-xl align-center cursor-pointer alert-del">&boxbox;</strong></button>
          <div></div>
        </div>}


    </div>
  )
}

export default CustomerTalk


