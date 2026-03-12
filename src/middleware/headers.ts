import { Context } from "../app/router.ts";

export const withHeaders = (ctx: Context, next) => {
    ctx.headers = new Headers();
    return next(ctx);
}