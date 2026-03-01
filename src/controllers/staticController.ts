import { serveDir } from "@std/http/file-server";

export const staticController = ({ request } : { request: Request }) => {
    return serveDir(request);
}