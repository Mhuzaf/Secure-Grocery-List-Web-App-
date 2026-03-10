import { homeController } from "../controllers/homeController.ts";
import { notFoundController } from "../controllers/notFoundController.ts";
import { aboutController } from "../controllers/aboutController.ts";
import { staticController } from "../controllers/staticController.ts";
import { loginController, loginPostController }from "../controllers/login/loginController.ts";
import { productsController, productsPostController } from "../controllers/productsController.ts";
import { managePostController, manageController } from "../controllers/manageController.ts";
import { Routes } from "./routes.ts";
import { registerPostController, registerController } from "../controllers/login/registerController.ts";
import { profileController } from "../controllers/profileController.ts";
import { imageController } from "../controllers/imageController.ts";
import { logoutController } from "../controllers/login/logoutController.ts";

const imagePattern = new URLPattern({ pathname: "/images/:imageId" });

export const server = (request: Request) => {
    const url = new URL(request.url);
    console.log(`${request.method} ${url.pathname}${url.search}`);
    
    // Serve static assets like stylesheet and favicon
    if (url.pathname.startsWith("/src/assets")) 
        return staticController(request);

    // Serve images
    if (imagePattern.test(url) && request.method == "GET") {
        const { imageId } = imagePattern.exec(url).pathname.groups;
        return imageController(imageId);
    }

    // Routing
    switch (url.pathname){
        case Routes.HOME.route:
            return homeController(request);
        case Routes.ABOUT.route:
            return aboutController(request);
        case Routes.PRODUCTS.route:
            if (request.method == "POST") return productsPostController(request);
            return productsController(request);
        case Routes.PROFILE.route:
            return profileController(request);
        case Routes.LOGIN.route:
            if (request.method == "POST")
                return loginPostController(request);
            return loginController(request);
        case Routes.LOGOUT.route:
            if (request.method == "POST") return logoutController(request);
            break;
        case Routes.REGISTER.route:
            if (request.method == "POST") 
                return registerPostController(request);
            return registerController(request);
        case Routes.MANAGE.route:
            if (request.method == "POST") 
                return managePostController(request);
            return manageController(request);
        default:
            return notFoundController(request);
    }    
}