import { serveDir } from "@std/http/file-server";

const staticController = ({ request } : { request: Request }) => {
    return serveDir(request);
}

export default staticController;