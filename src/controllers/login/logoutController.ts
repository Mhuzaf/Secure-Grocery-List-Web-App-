import { logout } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";
import { SessionProps } from "../../models/sessionsModel.ts";

export const logoutController = (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    const { session, headers } = ctx;
    if (session) {
        logout(headers, session);
        return redirect(headers, "/", `Logged out!`);
    }
    return redirect(headers, "/", `Failed to log out.`);
}