import { currentSession } from "../app/auth.ts";
import { redirect } from "../app/redirect.ts";
import { render } from "../app/render.ts";
import { validateSchema } from "../app/validation.ts";
import { addToCart } from "../models/cartModel.ts";
import { getCategories } from "../models/categoryModel.ts";
import { getProducts } from "../models/productsModel.ts";
import { getUser } from "../models/userModel.ts";
import { addToCartSchema } from "../schema/cartSchema.ts";
import { productsView } from "../views/productsView.ts";

export const productsController = (request: Request) => {
    const url = new URL(request.url);
    console.log(url.searchParams);

    const categories = getCategories();
    const products = getProducts();
    return render(productsView(categories, products), request);
}

export const productsPostController = async (request: Request) => {
    const session = currentSession(request.headers);
    if (!session) {
        const headers = new Headers();
        return redirect(headers, "/products", `Login to order products.`);
    }

    const formData = await request.formData();

    if (formData.has("addToCart")) {
        const { isValid, errors } = validateSchema(formData, addToCartSchema); 
        
        if (!isValid) {
            const categories = getCategories();
            const products = getProducts();
            
            return render(productsView(categories, products, errors), request);
        }

        const item = formData.get("addToCart");

        const user = getUser(session.username);
        addToCart(Number.parseInt(item.toString()), user.user_id);

        const headers = new Headers();
        return redirect(headers, "/products", `Added ${item} to cart`);
    }
}