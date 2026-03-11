import { SessionProps } from "../models/sessionsModel.ts";

export const withHeaders = (ctx: { request: Request, session: SessionProps, headers: Headers }, next) => {
    ctx.headers = new Headers();
    return next(ctx);
}