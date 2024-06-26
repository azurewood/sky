import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async ({ request }) => {

    const uid = new URL(request.url).searchParams.get("uid");
    // console.log(uid)
    if (!uid || uid == undefined || uid != import.meta.env.ADMIN_UID) {
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
        const { data, error } = await supabase
            .from("message_user")
            .select("*").order('created_at', { ascending: false, nullsFirst: false })
            .range(0, 10);

        // console.log(data)
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

/**
 * This method is deprecated
 * @param param0 
 * @returns 
 */
export const POST: APIRoute = async ({ request }) => {
    const { uid, token } = await request.json();
    // console.log(type)
    if (token === undefined ||
        token !== import.meta.env.SKY_API_TOKEN ||
        uid === undefined) {
        return new Response(
            JSON.stringify({
                error: "Not supported!",
            }),
            { status: 500 },
        );
    }

    const { data, error } = await supabase
        .from("skyuser")
        .select("type, name, phone, memo")
        .eq("UID", uid);

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
