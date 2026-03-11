import { currentSession, logout } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";

export const logoutController = (request: Request) => {
    const session = currentSession(request.headers);
    const headers = new Headers();
    if (session) {
        logout(headers, session);
        return redirect(headers, "/", `Logged out!`);
    }
    return redirect(headers, "/", `Failed to log out.`);
}