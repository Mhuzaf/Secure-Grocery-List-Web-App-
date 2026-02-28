import homeController from "../controllers/homeController.ts";
import notFoundController from "../controllers/notFoundController.ts";
import aboutController from "../controllers/aboutController.ts";
import staticController from "../controllers/staticController.ts";
import loginController from "../controllers/loginController.ts";
import productsController from "../controllers/productsController.ts";
import cartController from "../controllers/manageController.ts";
import Routes from "./routes.ts";

export const server = (request: Request) => {
    const url = new URL(request.url);
    console.log(`${request.method} ${url.pathname}${url.search}`);
    
    // Serve static assets like stylesheet and favicon
    if (url.pathname.startsWith("/src/assets")) 
        return staticController({ request });

    // Routing
    switch (url.pathname){
        case Routes.HOME.route:
            return homeController();
        case Routes.ABOUT.route:
            return aboutController();
        case Routes.PRODUCTS.route:
            return productsController({ request });
        case Routes.LOGIN.route:
            return loginController();
        case Routes.MANAGE.route:
            return cartController();
        default:
            return notFoundController();
    }    
}

export default server;