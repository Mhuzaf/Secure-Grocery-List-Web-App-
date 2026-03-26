import { redirect } from "../app/redirect.ts";
import { render } from "../app/render.ts";
import { Context } from "../app/router.ts";
import { getCartItems } from "../models/cartModel.ts";
import { getProducts } from "../models/productsModel.ts";
import { getUser } from "../models/userModel.ts";
import { cartView } from "../views/cartView.ts";

export const cartController = (ctx: Context) => {
    const { session } = ctx;
    
    const user = getUser(session.username);
    const cart = getCartItems(user.userId);
    // It's better to map here with one query 
    // than to make multiple queries
    // O(n)
    const products = cart.map(i => {
        return getProducts().find(p => {
            return p.id == i.productId;
        });
    });
    
    return render(cartView(getCartItems(user.userId), products), ctx);
}

export const cartSubmitController = (ctx: Context) => {
    const { headers } = ctx;
    
    return redirect(headers, "/checkout", null);
}