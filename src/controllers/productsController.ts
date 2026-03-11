import { redirect } from "../app/redirect.ts";
import { render } from "../app/render.ts";
import { validateSchema } from "../app/validation.ts";
import { addToCart } from "../models/cartModel.ts";
import { getCategories } from "../models/categoryModel.ts";
import { getProducts } from "../models/productsModel.ts";
import { SessionProps } from "../models/sessionsModel.ts";
import { getUser } from "../models/userModel.ts";
import { addToCartSchema } from "../schema/cartSchema.ts";
import { productsView } from "../views/productsView.ts";

export const productsController = (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    const { request } = ctx;
    const url = new URL(request.url);
    console.log(url.searchParams);

    const categories = getCategories();
    const products = getProducts();
    return render(productsView(categories, products), ctx);
}

export const productsPostController = async (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    const { request, session, headers } = ctx;
    if (!session) {
        return redirect(headers, "/products", `Login to order products.`);
    }

    const formData = await request.formData();

    if (formData.has("addToCart")) {
        const { isValid, errors } = validateSchema(formData, addToCartSchema); 
        
        if (!isValid) {
            const categories = getCategories();
            const products = getProducts();
            
            return render(productsView(categories, products, errors), ctx);
        }

        const item = formData.get("addToCart");

        const user = getUser(session.username);
        addToCart(Number.parseInt(item.toString()), user.user_id);

        return redirect(headers, "/products", `Added ${item} to cart`);
    }
}