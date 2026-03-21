import { Product } from "../models/productsModel.ts";

export const cartView = (products: Product[]) => {

    console.log(products);

    return `
        <p>cart view, work in progress!</p>
        <a href="/checkout">
            <button>Checkout</button>
        </a>
    `;
}