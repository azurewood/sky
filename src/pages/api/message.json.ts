import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";
import { type Message } from "../../components/MessageItem";


export const PUT: APIRoute = async ({ request }) => {
    // const formData=await request.formData();

    // const from  = formData.get("from");
    // const content  = formData.get("content");
    // const token  = request.headers.get("Cookie");
    // console.log(from,content,token)
    const { id } = await request.json();

    //const token = request.headers.get("Cookie");
    const uid = new URL(request.url).searchParams.get("uid");
    // console.log(uid)
    if (!uid || uid === undefined || !uid || uid === undefined) {
        return new Response(
            JSON.stringify({
                error: "Not supported!",
            }),
            { status: 500 },
        );
    }
    const cookie: string | undefined = request.headers.get("Cookie") || undefined;
    // console.log(cookie)
    const { data, error } = await supabase.auth.getUser(
        cookie?.slice(cookie?.indexOf("sb-access-token=") + 16, cookie?.indexOf("sb-refresh-token=") - 2)
    )

    // console.log(data.user?.id, uid)
    //  console.log(data)
    if (!error && uid === data.user?.id) {
        // console.log(id)

        const { data, error } = await supabase
            .from("message")
            //.delete()//
            .update({ read: true })
            .eq("id", id)
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

export const GET: APIRoute = async ({ request }) => {

    const uid = new URL(request.url).searchParams.get("uid");
    // console.log(uid)
    if (!uid || uid == undefined) {
        return new Response(
            JSON.stringify({
                error: "Not supported!",
            }),
            { status: 500 },
        );
    }

    const cookie: string | undefined = request.headers.get("Cookie") || undefined;
    // console.log(cookie)
    const { data, error } = await supabase.auth.getUser(
        cookie?.slice(cookie?.indexOf("sb-access-token=") + 16, cookie?.indexOf("sb-refresh-token=") - 2)
    )

    // console.log(data.user?.id, uid)
    //  console.log(data)
    let result = { received: <Message[]>[], sent: <Message[]>[] };
    if (!error && uid === data.user?.id) {
        const { data, error } = await supabase
            .from("message_name")
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
        result.received = data;
        {
            const { data, error } = await supabase
                .from("message")
                .select("*")
                .eq("user", uid)
                .order("created_at", { ascending: false })
                .range(0, 19);

            if (error) {
                return new Response(
                    JSON.stringify({
                        error: error.message,
                    }),
                    { status: 500 },
                );
            }
            result.sent = data;
        }

        return new Response(JSON.stringify(result));
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
    const { from, content, owner } = await request.json();

    //const token = request.headers.get("Cookie");
    const uid = new URL(request.url).searchParams.get("uid");
    // console.log(uid)
    if (!uid || uid === undefined) {
        return new Response(
            JSON.stringify({
                error: "Not supported!",
            }),
            { status: 500 },
        );
    }
    const cookie: string | undefined = request.headers.get("Cookie") || undefined;
    // console.log(cookie)
    const { data, error } = await supabase.auth.getUser(
        cookie?.slice(cookie?.indexOf("sb-access-token=") + 16, cookie?.indexOf("sb-refresh-token=") - 2)
    )

    // console.log(data.user?.id, uid)
    //  console.log(data)
    if (!error && uid === data.user?.id) {
        // console.log(cookie);
        const { data, error } = await supabase
            .from("message")
            .insert({ user: from, content, owner })
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
    }
    else {
        return new Response(
            JSON.stringify({
                error: "Not supported!",
            }),
            { status: 500 },
        );
    }

    /*if (//token === undefined ||
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
    return new Response(JSON.stringify({ data }));*/
};
