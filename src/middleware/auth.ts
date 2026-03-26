import { currentSession } from "../app/auth.ts";
import { redirect } from "../app/redirect.ts";
import { Context } from "../app/router.ts";

export const withSession = (ctx: Context, next) => {
    const { request } = ctx;
    ctx.session = currentSession(request.headers);
    return next(ctx);
}

export const requiresSession = (ctx: Context, next) => {
    const { session, headers } = ctx;
    if (!session) {
        console.log("Access denied.")
        return redirect(headers, "/login", "Log in to gain access.")
    }

    console.log("Access granted.");
    return next(ctx);
}

export const excludesSession = (ctx: Context, next) => {
    const { session, headers } = ctx;
    if (session) {
        console.log("Access denied to logged in user.")
        return redirect(headers, "/", "Log out to gain access.")
    }

    return next(ctx);
}

export const isAdmin = (ctx: Context, next) => {
    const { session, headers } = ctx;
    if (!session || session.access != "admin") {
        console.log("Access denied to non-adminstrator.")
        return redirect(headers, "/", "Page access is not authorized.");
    }
    
    console.log("Access granted.");
    return next(ctx);
}