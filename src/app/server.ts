import { homeController } from "../controllers/homeController.ts";
import { notFoundController } from "../controllers/notFoundController.ts";
import { aboutController } from "../controllers/aboutController.ts";
import { staticController } from "../controllers/staticController.ts";
import { loginController, loginPostController }from "../controllers/login/loginController.ts";
import { productsController, productsPostController } from "../controllers/productsController.ts";
import { managePostController, manageController } from "../controllers/manageController.ts";
import { registerPostController, registerController } from "../controllers/login/registerController.ts";
import { profileController } from "../controllers/profileController.ts";
import { imageController } from "../controllers/imageController.ts";
import { logoutController } from "../controllers/login/logoutController.ts";
import { ApplicationRouter } from "./router.ts";

const app = new ApplicationRouter();

app.get("/src/assets/*", staticController);
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/products", productsController);
app.post("/products", productsPostController);
app.get("/images/:imageId", imageController);
app.get("/profile", profileController);
app.get("/login", loginController);
app.post("/login", loginPostController);
app.get("/register", registerController);
app.post("/register", registerPostController);
app.post("/logout", logoutController);
app.get("/manage", manageController);
app.post("/manage", managePostController);

app.get("*", notFoundController);
app.post("*", notFoundController);

export const server = (request: Request) => {
    const url = new URL(request.url);
    console.log(`${request.method} ${url.pathname}${url.search}`);

    return app.handle(request);
}