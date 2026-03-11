import { serveDir } from "@std/http/file-server";

export const staticController = (request: Request) => {
    return serveDir(request);
}