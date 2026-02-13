import homeController from "../controller/homeController.js";
import notFoundController from "../controller/notFoundController.js";
import aboutController from "../controller/aboutController.js";
import staticController from "../controller/staticController.js";

export const server = (request) => {
    const url = new URL(request.url);
    console.log(`${request.method} ${url.pathname}${url.search}`);
    
    if (url.pathname.startsWith("/src/assets")) 
        return staticController({ request });

    if (url.pathname == "/") {
        return homeController({ request });
    } else if (url.pathname == "/about") {
        return aboutController({ request });
    }

    return notFoundController({ request });
}

export default server;