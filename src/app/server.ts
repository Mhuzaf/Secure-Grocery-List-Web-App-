import { homeController } from "../controllers/homeController.ts";
import { notFoundController } from "../controllers/notFoundController.ts";
import { aboutController } from "../controllers/aboutController.ts";
import { staticController } from "../controllers/staticController.ts";
import { loginController, loginPostController }from "../controllers/login/loginController.ts";
import { productsController, productsPostController } from "../controllers/productsController.ts";
import { registerPostController, registerController } from "../controllers/login/registerController.ts";
import { profileController } from "../controllers/profileController.ts";
import { imageController } from "../controllers/imageController.ts";
import { logoutPostController } from "../controllers/login/logoutController.ts";
import { ApplicationRouter } from "./router.ts";
import { withLogs } from "../middleware/logging.ts";
import { excludesSession, isAdmin, requiresSession, withSession } from "../middleware/auth.ts";
import { withHeaders } from "../middleware/headers.ts";
import { checkoutController, checkoutPostController, couponController } from "../controllers/checkoutController.ts";
import { cartController, cartSubmitController } from "../controllers/cartController.ts";
import { validate } from "../middleware/validate.ts";
import { userLoginSchema, userRegisterSchema } from "../schema/userSchema.ts";
import { addToCartSchema } from "../schema/cartSchema.ts";
import { manageAddCategory, manageCategoryController, manageDeleteCategory, manageEditCategory } from "../controllers/manage/manageCategoryController.ts";
import { manageProductsAdd, manageProductsController, manageProductsDelete, manageProductsEdit } from "../controllers/manage/manageProductsController.ts";
import { manageDiscountsController } from "../controllers/manage/manageDiscountsController.ts";
import { manageLocationsController } from "../controllers/manage/manageLocationsController.ts";
import { manageOrdersController } from "../controllers/manage/manageOrdersController.ts";
import { addCategorySchema, deleteCategorySchema, editCategorySchema } from "../schema/categorySchema.ts";
import { addProductSchema, deleteProductSchema, editProductSchema } from "../schema/productSchema.ts";
import { checkoutSchema, couponSchema } from "../schema/checkoutSchema.ts";

const app = new ApplicationRouter();

// Common middleware
app.use(withLogs);
app.use(withSession);
app.use(withHeaders);

// GET
app.get("/src/assets/*", staticController);
app.get("/images/:imageId", imageController);
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/products", productsController);
app.get("/cart", cartController, requiresSession);
app.get("/checkout", checkoutController, requiresSession);
app.get("/profile", profileController);

app.get("/login", loginController, excludesSession);
app.get("/register", registerController, excludesSession);

app.get("/manage/discounts", manageDiscountsController, isAdmin);
app.get("/manage/category", manageCategoryController, isAdmin);
app.get("/manage/products", manageProductsController, isAdmin);
app.get("/manage/locations", manageLocationsController, isAdmin);
app.get("/manage/orders", manageOrdersController, isAdmin);

// POST
app.post("/register", registerController, excludesSession, validate("registerForm", userRegisterSchema), registerPostController);
app.post("/login", loginController, excludesSession, validate("loginForm", userLoginSchema), loginPostController);
app.post("/logout", logoutPostController, requiresSession);
app.post("/products", productsController, requiresSession, validate("addProduct", addToCartSchema), productsPostController);

app.post("/manage/category/add", manageCategoryController, isAdmin, validate("addCategory", addCategorySchema), manageAddCategory);
app.post("/manage/category/edit", manageCategoryController, isAdmin, validate("editCategory", editCategorySchema), manageEditCategory)
app.post("/manage/category/delete", manageCategoryController, isAdmin, validate("deleteCategory", deleteCategorySchema), manageDeleteCategory);

app.post("/manage/products/add", manageProductsController, isAdmin, validate("addProduct", addProductSchema), manageProductsAdd);
app.post("/manage/products/edit", manageProductsController, isAdmin, validate("editProduct", editProductSchema), manageProductsEdit);
app.post("/manage/products/delete", manageProductsController, isAdmin, validate("deleteProduct", deleteProductSchema), manageProductsDelete);

// ??
app.post("/cart", cartSubmitController, requiresSession);

app.post("/checkout", checkoutController, requiresSession, validate("checkoutForm", checkoutSchema), checkoutPostController);
app.post("/checkout/coupon", checkoutController, requiresSession, validate("couponForm", couponSchema), couponController);

// 404
app.get("*", notFoundController);
app.post("*", notFoundController);

export const server = (request: Request) => {
    return app.handle({ request });
}