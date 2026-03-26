import { logout } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";
import { Context } from "../../app/router.ts";

export const logoutPostController = (ctx: Context) => {
    const { session, headers } = ctx;
    if (session) {
        logout(headers, session);
        return redirect(headers, "/", `Logged out!`);
    }
    return redirect(headers, "/", `Failed to log out.`);
}