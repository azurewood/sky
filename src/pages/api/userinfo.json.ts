import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";
import { type SkyUser } from "../../data";

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
    if (!error && uid === data.user?.id) {
        const { data, error } = await supabase
            .from("skyuser_view")
            .select("id,UID,email,type,name,phone,memo,created_at")
            .eq("UID", uid) as { data: SkyUser[], error: any };

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

export const POST: APIRoute = async ({ request }) => {

    const uid = new URL(request.url).searchParams.get("uid");
    const { name, phone, UID, id } = await request.json();
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
    if (!error && uid === data.user?.id) {
        // console.log(id)

        const { data, error } = (id ? await supabase
            .from("skyuser")
            .upsert({ id, UID: uid, name, phone }, { onConflict: 'id, UID' })
            .select() : await supabase
                .from("skyuser")
                .insert({ UID: uid, name, phone })
                .select())

        // console.log(data)
        if (error || data[0].UID !== UID) {
            return new Response(
                JSON.stringify({
                    error: error?.message,
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