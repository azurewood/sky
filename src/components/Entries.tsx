import {
  For,
  Show,
  createResource,
  // createSignal,
  ErrorBoundary,
} from "solid-js";


export interface SkyUser {
  type: number;
  name: string;
  phone: string;
  memo?: string;
}

export interface SkyEntry {
  type: number;
  content: string;
  owner: string;
  created_at?:string;
}

// async function getUser(uid: string) {
//   if (uid.trim() === "") return [];
//   const response = await fetch(import.meta.env.DEV ? "http://localhost:4321/api/skyuser" : "https://sky-azurewood.vercel.app/api/skyuser",
//     {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ uid, token: import.meta.env.SKY_API_TOKEN })
//     }
//   );
//   return await response.json();

// }

export function Entries(){//({ data, uid }: { data: SkyEntry[],uid:string }) {
  // const [users] = createResource(uid,getUser);

  // console.log(data,uid)
  // const {data}=(await supabase.from("skyuser").select("type,name,phone").eq("UID",uid)) as {data:SkyUser[]};

  return (
  //   <div class="max-w-3xl w-full">
  //     <ErrorBoundary fallback={<div>Something went wrong</div>}>
  //     {/* <Show when={!users.loading} fallback={<>Loading...</>}> */}
       
  //       <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
 
  //           {/* {data.map((entry) => (
  //             <li class="p-4 border rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700">
  //               <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
  //                 {entry.type}
  //               </p>
  //               <p class="mt-1">{entry.content}</p>
  //             </li>
  //           ))} */}
      
  //       </ul>
  //       {/* </Show> */}
  //     </ErrorBoundary>
  //   </div>
  <div></div>
  );
}