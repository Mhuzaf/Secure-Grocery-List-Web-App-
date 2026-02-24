import homeController from "../controllers/homeController.js";
import notFoundController from "../controllers/notFoundController.js";
import aboutController from "../controllers/aboutController.js";
import staticController from "../controllers/staticController.js";
import loginController from "../controllers/loginController.js";
import productsController from "../controllers/productsController.js";
import cartController from "../controllers/cartController.js";

// Enums for each route
export const Routes = Object.freeze({
    HOME:       { name: "Home",     route: "/" },
    ABOUT:      { name: "About Us", route: "/about" },
    PRODUCTS:   { name: "Products", route: "/products" },
    LOGIN:      { name: "Login",    route: "/login" },
    CART:      { name: "Cart",    route: "/cart" },
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
        case Routes.CART.route:
            return cartController({ request });
        default:
            return notFoundController({ request });
    }    
}

export default server;