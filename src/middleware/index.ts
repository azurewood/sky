import { defineMiddleware } from "astro:middleware";
import { supabase } from "../lib/supabase";
import micromatch from "micromatch";

const protectedRoutes = ["/dashboard(|/)", "/profile(|/)"];
const redirectRoutes = ["/signin(|/)", "/register(|/)"];

export const onRequest = defineMiddleware(
  async ({ locals, url, cookies, redirect }, next) => {
    if (micromatch.isMatch(url.pathname, protectedRoutes)) {
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");

      if (!accessToken || !refreshToken) {
        return redirect("/signin");
      }

      const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
      });

      if (error) {
        cookies.delete("sb-access-token", {
          path: "/",
        });
        cookies.delete("sb-refresh-token", {
          path: "/",
        });
        return redirect("/signin");
      }

      locals.email = data.user?.email!;
      locals.uid = data.user?.id!;
      // locals.type = -1;

      // console.log(locals.uid, locals.type)
      if (locals.uid && locals.uid.length > 0 && locals.type === undefined) {
        const { data } = await supabase
          .from("skyuser")
          .select("type, name, phone, memo")
          .eq("UID", locals.uid);

        // console.log(data);

        if (data && data.length > 0) {
          locals.type = data[0]?.type;
          locals.name = data[0]?.name;
          locals.phone = data[0]?.phone;
          locals.admin = (locals.email === import.meta.env.ADMIN_ACCOUNT || locals.uid === import.meta.env.ADMIN_UID);
          //locals.memo = data[0]?.memo;
        }
      }

      // const res = await fetch(import.meta.env.DEV ? "http://localhost:4321/api/skyuser" : "https://sky.azurewood.com/api/skyuser",
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json, text/plain, */*',
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ uid: locals.uid, token: import.meta.env.SKY_API_TOKEN })
      //   }
      // );
      // const user = await res.json();
      // if (user.length > 0) {
      //   locals.type = user[0].type;
      //   locals.name = user[0].name;
      //   locals.phone = user[0].phone;
      //   locals.memo = user[0].memo;
      //   console.log(user,locals.name)
      // }

      cookies.set("sb-access-token", data?.session?.access_token!, {
        sameSite: "strict",
        path: "/",
        secure: true,
      });
      cookies.set("sb-refresh-token", data?.session?.refresh_token!, {
        sameSite: "strict",
        path: "/",
        secure: true,
      });
    }

    if (micromatch.isMatch(url.pathname, redirectRoutes)) {
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");

      if (accessToken && refreshToken) {
        return redirect("/dashboard");
      }
    }
    return next();
  },
);
