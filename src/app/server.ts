import { homeController } from "../controllers/homeController.ts";
import { notFoundController } from "../controllers/notFoundController.ts";
import { aboutController } from "../controllers/aboutController.ts";
import { staticController } from "../controllers/staticController.ts";
import { loginController }from "../controllers/login/loginController.ts";
import { productsController } from "../controllers/productsController.ts";
import { managePostController, manageController } from "../controllers/manageController.ts";
import { Routes }from "./routes.ts";

export const server = (request: Request) => {
    const url = new URL(request.url);
    console.log(`${request.method} ${url.pathname}${url.search}`);
    
    // Serve static assets like stylesheet and favicon
    if (url.pathname.startsWith("/src/assets")) 
        return staticController({ request });

    // Routing
    switch (url.pathname){
        case Routes.HOME.route:
            return homeController({ request });
        case Routes.ABOUT.route:
            return aboutController({ request });
        case Routes.PRODUCTS.route:
            return productsController({ request });
        case Routes.LOGIN.route:
            return loginController({ request });
        case Routes.MANAGE.route:
            if (request.method == "POST") 
                return managePostController({ request });
            return manageController({ request });
        default:
            return notFoundController({ request });
    }    
}