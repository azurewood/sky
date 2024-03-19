import {
  createSignal,
  createResource,
  ErrorBoundary,
  type ResourceFetcher,
  type JSX,
  createMemo,
} from "solid-js";

import { type SkyUser } from "../data";
// import { update } from ".";

const fetcher: ResourceFetcher<string, SkyUser[], SkyUser> = async (
  uid,
  { refetching },
) => {
  // console.log(refetching, value)
  const res = await fetch(`/api/userinfo.json?uid=${uid}`, {
    method: refetching ? "POST" : "GET",
    body: refetching ? JSON.stringify(refetching) : null,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  // const prev = value ?? [];
  // console.log(refetching, value)
  // console.log({ ...data, ...prev })
  // console.log(prev)
  return data;
  // return [...data, ...prev];
};



const UserInfo = ({ skyUser, uid }: { skyUser: SkyUser[], uid: string }) => {
  const [sending, setSending] = createSignal<boolean>(false);

  const [data, { refetch }] = createResource(uid, fetcher, {
    initialValue: skyUser,
    ssrLoadFrom: "initial",
  });

  const changeSending = (_: SkyUser[]) => {
    // console.log("xxx");
    setSending(false);
  }
  createMemo(() => changeSending(data()));


  const onSubmitHandler: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (
    e,
  ) => {
    e.preventDefault();
    setSending(true);
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const name = formData.get("name")?.toString();
    const phone = formData.get("phone")?.toString();

    // console.log(name, phone, uid)

    if (!name || !phone) return;
    refetch({ name, phone, UID: uid, id: skyUser[0]?.id });
    // formElement.reset();
    // mutate((value) => {
    //   // console.log(value)
    //   console.log(update(value, skyUser[0]?.id || "", { id: skyUser[0]?.id, name, phone }));
    //   return update(value, skyUser[0]?.id, { id: skyUser[0]?.id, name, phone });
    // });
  };

  return (
    <div class="max-w-3xl w-full">
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <form
          onsubmit={onSubmitHandler}
          class="block border bg-blue-100 border-blue-300 rounded-md p-6 dark:bg-blue-950 dark:border-blue-800"
        >
          <div>
            <label
              class="block mb-1 font-medium dark:text-zinc-300 text-zinc-900 text-sm"
              for="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder={skyUser[0]?.name || ""}
              value={data()[0]?.name || ""}
              required
              name="name"
              autocomplete="username"
              class="w-full block rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
            />
          </div>
          <div class="mt-3">
            <label
              class="block mb-1 font-medium dark:text-zinc-300 text-zinc-900 text-sm"
              for="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              class="w-full block rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
              placeholder={skyUser[0]?.phone || ""}
              value={data()[0]?.phone || ""}
              name="phone"
              autocomplete="tel"
            />
          </div>
          <button
            class="w-full dark:bg-zinc-100 bg-zinc-900 border-zinc-900 py-1.5 border dark:border-zinc-100 rounded-md mt-4 dark:text-zinc-900 text-zinc-100 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={data.loading}
          >
            Save
          </button>
          {<p class="text-red-700">{data.error}</p>}
        </form>
        {sending() ?
          <div class='h-1 w-full bg-slate-100 overflow-hidden'>
            {/* <div class='animate-pulse w-full h-full bg-slate-500 origin-left-right'></div> */}
            <div class='animate-progress w-full h-full bg-slate-500 origin-left-right'></div>
          </div> : <div class='h-1 w-full bg-opacity-0 overflow-hidden'></div>}
      </ErrorBoundary>
    </div>
  )
}

export default UserInfo;