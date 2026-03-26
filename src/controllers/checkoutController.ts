import { redirect } from "../app/redirect.ts";
import { render } from "../app/render.ts";
import { Context } from "../app/router.ts";
import { getCartItems } from "../models/cartModel.ts";
import { getCities, getDistricts } from "../models/locationsModel.ts";
import { getProducts } from "../models/productsModel.ts";
import { getUser } from "../models/userModel.ts";
import { checkoutView } from "../views/checkoutView.ts";

const view = (ctx: Context) => {
    const { session, errors } = ctx;

    const user = getUser(session.username);
    // Similar from cartController.ts
    const cart = getCartItems(user.userId);
    const products = cart.map(i => {
        return getProducts().find(p => {
            return p.id == i.productId;
        });
    });

    const subTotal = products.reduce((n, p) => {
        const qty = cart.find(c => c.productId == p.id).quantity;
        if (p.averageWeight != 0) {
            return n + (p.price * ((p.averageWeight * qty) / 1000))
        } else return n + p.price;
    }, 0);
    console.log(subTotal);

    // PLACEHOLDER?
    const shippingAmt = 10.00;

    return render(checkoutView(user, cart, products, getCities(), getDistricts(), { subTotal: subTotal, shipping: shippingAmt }, errors), ctx);
}

export const checkoutController = (ctx: Context) => {
    const { session, headers } = ctx;
        
    const user = getUser(session.username);
    const cart = getCartItems(user.userId);
    if (!cart) return redirect(headers, "/cart", "Your cart is empty!"); 

    return view(ctx);
}

export const checkoutPostController = (ctx: Context, next) => {
    const { headers, isValid, validated } = ctx;

    if (!isValid) return next(ctx);

    console.log(validated);

    // here, after checkout redirect them to 
    // their profile and somehow 
    // scroll to section to see their orders?

    // get the payment creds, final total and cart items
    // put it in the orders table (linked to user id)
    // set 48h or 72h if they chose to pay for shipping or free
    // and clear the cart. 
    // after 48h of simulated "running", clear the order (its sent?)

    return redirect(headers, "/profile", `finalize checkout stub!`);
}

export const couponController = (ctx: Context, next) => {
    const { headers, isValid, validated } = ctx;

    if (!isValid) return next(ctx);

    const coupon = validated.coupon;

    // stub
    return redirect(headers, "/checkout", `Applied coupon \"${coupon}\" STUB STUB STUB.`)
}