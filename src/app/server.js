import homeController from "../controller/homeController.js";
import notFoundController from "../controller/notFoundController.js";
import aboutController from "../controller/aboutController.js";
import staticController from "../controller/staticController.js";
import loginController from "../controller/loginController.js";
import productsController from "../controller/productsController.js";

// Enums for each route
export const Routes = Object.freeze({
    HOME:       { name: "Home",     route: "/" },
    ABOUT:      { name: "About Us", route: "/about" },
    PRODUCTS:   { name: "Products", route: "/products" },
    LOGIN:      { name: "Login",    route: "/login" },
});

export const server = (request) => {
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
        default:
            return notFoundController({ request });
    }    
}

export default server;