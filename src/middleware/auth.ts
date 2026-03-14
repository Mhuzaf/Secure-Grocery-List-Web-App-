import { currentSession } from "../app/auth.ts";
import { Context } from "../app/router.ts";

export const withSession = (ctx: Context, next) => {
    const { request } = ctx;
    ctx.session = currentSession(request.headers);
    return next(ctx);
}