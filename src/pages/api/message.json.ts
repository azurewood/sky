import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async ({ request }) => {
    const token = request.headers.get("Cookie");
    const uid = new URL(request.url).searchParams.get("uid");
    // console.log(token)
    if (!token || !uid) {
        return new Response(
            JSON.stringify({
                error: "Not supported!",
            }),
            { status: 500 },
        );
    }
    let cookie: string = "";
    await supabase.auth.getSession().then(data => {
        cookie = "sb-access-token=" + data.data.session?.access_token + "; sb-refresh-token=" + data.data.session?.refresh_token;
        // console.log(data.data.session?.refresh_token, data.data.session?.access_token)
    });

    // console.log(cookie.length,token.length)
    if (cookie === token) {
        // console.log(cookie);
        const { data, error } = await supabase
            .from("message")
            .select("*")
            .eq("read", false)
            .eq("owner", uid)
            .order("created_at", { ascending: true });

        if (error) {
            return new Response(
                JSON.stringify({
                    error: error.message,
                }),
                { status: 500 },
            );
        }

        return new Response(JSON.stringify(data));
    }
    else {
        return new Response(
            JSON.stringify({
                error: "Not supported!",
            }),
            { status: 500 },
        );
    }

};

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
