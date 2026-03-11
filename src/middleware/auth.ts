import { currentSession } from "../app/auth.ts";
import { SessionProps } from "../models/sessionsModel.ts";

export const withSession = (ctx: { request: Request, session: SessionProps, headers: Headers }, next) => {
    const { request } = ctx;
    ctx.session = currentSession(request.headers);
    return next(ctx);
}