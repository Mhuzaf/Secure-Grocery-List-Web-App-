import { currentSession, logout } from "../../app/auth.ts";
import { redirect } from "../../app/redirect.ts";
import Routes from "../../app/routes.ts";

export const logoutController = (request: Request) => {
    const session = currentSession(request.headers);
    const headers = new Headers();
    if (session) {
        logout(headers, session);
        return redirect(headers, Routes.HOME.route, `Logged out!`);
    }
    return redirect(headers, Routes.HOME.route, `Failed to log out.`);
}