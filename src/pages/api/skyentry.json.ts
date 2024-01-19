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
    const { type, content, owner, token } = await request.json();
    // console.log(type)
    if (token === undefined ||
        token !== import.meta.env.SKY_API_TOKEN ||
        type === undefined ||
        content === undefined ||
        owner === undefined) {
        return new Response(
            JSON.stringify({
                error: "Not supported!",
            }),
            { status: 500 },
        );
    }

    const { data, error } = await supabase
        .from("skyentry")
        .insert({ type, content, owner })
        .select();

    if (error) {
        return new Response(
            JSON.stringify({
                error: error.message,
            }),
            { status: 500 },
        );
    }

    return new Response(JSON.stringify(data));
};
