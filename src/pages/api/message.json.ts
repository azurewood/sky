import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";


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
    const { data, error } = await supabase
        .from("skyuser")
        .select("*")
        .eq("UID", uid);

    // console.log(cookie, token)
    if (!error && data.length > 0) {
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
    //const token = request.headers.get("Cookie");
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
    const { data, error } = await supabase
        .from("skyuser")
        .select("*")
        .eq("UID", uid);

    // console.log(data)
    if (!error && data.length > 0) {
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
    const { data, error } = await supabase
        .from("skyuser")
        .select("*")
        .eq("UID", uid);

    // console.log(data)
    if (!error && data.length > 0) {
        // console.log(cookie);
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
