import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

// export const GET: APIRoute = async () => {
//     supabase.auth.getSession().then(data=>console.log(data.data.session?.user.id))
//   const { data, error } = await supabase
//     .from("guestbook")
//     .select("*")
//     .order("created_at", { ascending: true });

//   if (error) {
//     return new Response(
//       JSON.stringify({
//         error: error.message,
//       }),
//       { status: 500 },
//     );
//   }

//   return new Response(JSON.stringify(data));
// };

export const POST: APIRoute = async ({ request }) => {
    // const formData=await request.formData();

    // const from  = formData.get("from");
    // const content  = formData.get("content");
    // const token  = request.headers.get("Cookie");
    // console.log(from,content,token)
    const { from, content } = await request.json();

    if (//token === undefined ||
        //token !== import.meta.env.SKY_API_TOKEN ||
        content === undefined || from === undefined) {
        return new Response(
            JSON.stringify({
                error: "Not supported!",
            }),
            { status: 500 },
        );
    }

    const { data, error } = await supabase
        .from("message")
        .insert({ from, content, owner: import.meta.env.ADMIN_UID })
        .select();

    if (error) {
        return new Response(
            JSON.stringify({
                error: error.message,
            }),
            { status: 500 },
        );
    }

    // console.log(data);
    return new Response(JSON.stringify({ data }));
};
