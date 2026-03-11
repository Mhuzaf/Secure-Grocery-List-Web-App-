import { serveDir } from "@std/http/file-server";
import { SessionProps } from "../models/sessionsModel.ts";

export const staticController = (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    const { request } = ctx;
    return serveDir(request);
}