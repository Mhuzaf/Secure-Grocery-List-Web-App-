import { serveDir } from "@std/http/file-server";

const staticController = ({ request }) => {
    return serveDir(request);
}

export default staticController;