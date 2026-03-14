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
import { withLogs } from "../middleware/logging.ts";
import { withSession } from "../middleware/auth.ts";
import { withHeaders } from "../middleware/headers.ts";

const app = new ApplicationRouter();
// Middleware
app.use(withLogs);
app.use(withSession);
app.use(withHeaders);

// GET
app.get("/src/assets/*", staticController);
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/products", productsController);
app.get("/profile", profileController);
app.get("/login", loginController);
app.get("/register", registerController);
app.get("/manage", manageController);
app.get("/images/:imageId", imageController);

// POST
app.post("/login", loginPostController);
app.post("/products", productsPostController);
app.post("/register", registerPostController);
app.post("/logout", logoutController);
app.post("/manage", managePostController);

// 404
app.get("*", notFoundController);
app.post("*", notFoundController);

export const server = (request: Request) => {
    return app.handle({ request });
}