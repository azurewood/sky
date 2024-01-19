import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

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
