import { serveDir } from "@std/http/file-server";
import { Context } from "../app/router.ts";

export const staticController = (ctx: Context) => {
    const { request } = ctx;
    return serveDir(request);
}