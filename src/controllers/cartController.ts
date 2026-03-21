import { redirect } from "../app/redirect.ts";
import { render } from "../app/render.ts";
import { Context } from "../app/router.ts";
import { getCartItems } from "../models/cartModel.ts";
import { getProducts } from "../models/productsModel.ts";
import { getUser } from "../models/userModel.ts";
import { cartView } from "../views/cartView.ts";

export const cartController = (ctx: Context) => {
    const { session, headers } = ctx;
    
    if (!session) {
        return redirect(headers, "/login", `Login to view your cart.`);
    }

    const user = getUser(session.username);
    // It's better to map here with one query 
    // than to make multiple queries
    // O(n)
    const products = getCartItems(user.userId).map(i => {
        return getProducts().find(p => {
            return p.id == i.productId;
        });
    });
    
    return render(cartView(products), ctx);
}

// TODO: post controller