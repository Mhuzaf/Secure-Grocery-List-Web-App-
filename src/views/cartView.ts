import { CartItem } from "../models/cartModel.ts";
import { Product } from "../models/productsModel.ts";

export const cartView = (cartItems: CartItem[], products: Product[]) => {

    console.log(cartItems, products);

    const cartItemMap = products.map(p => {
        const qty = cartItems.find(c => c.productId == p.id).quantity;
        return `
            <article class="cartItem">
                <div class="itemDetails">
                    <img
                        src="/images/${p.id}"
                        alt="${p.name}"
                    >
                    <div class="details">
                        <span class="itemName">${p.name}</span>
                        <div class="priceQty">
                            <span class="price plain priceFont">${p.averageWeight != 0 ? `
                                    Dhs. ${p.price} (${p.averageWeight}g)
                                ` : `Dhs. ${p.price}`
                            }</span>
                            <span class="qty plain">Quantity: ${qty}</span>
                        </div>
                        <span class="subtotal styled priceFont">Subtotal: Dhs. ${
                            p.averageWeight != 0 ? (
                                ((qty * p.averageWeight) / 1000 * p.price).toFixed(2)
                            ) : p.price * qty
                        }</span>
                    </div>
                </div>

                <div class="itemOptions">
                    <button class="editCartProductQuantity plain icon">Edit Quantity</button>
                    <button class="removeCartItem plain icon">Remove Item</button>
                </div>
            </article>
        `;
    }).join("");

    const subTotal = products.reduce((n, p) => {
        const qty = cartItems.find(c => c.productId == p.id).quantity;
        if (p.averageWeight != 0) {
            return n + (p.price * ((p.averageWeight * qty) / 1000))
        } else return n + p.price;
    }, 0);

    return `
        <section id="cartRoot">
            <aside>
                <h2>Cart Total: <span class="priceFont">Dhs. ${subTotal.toFixed(2)}</span></h2>
                <a href="/checkout">
                    <button>Checkout</button>
                </a>
            </aside>
            <article id="itemsSection">
                <section id="itemsList">
                    ${cartItemMap}
                </section>
            </article>
        </section>
    `;
}