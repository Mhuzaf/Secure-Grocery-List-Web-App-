import { requiredString } from "../app/validation.ts";

export const addToCartSchema = {
    "addToCart": {
        displayName: "Cart Item",
        validators: [requiredString]
    },
    "addToCartId": {
        displayName: "Cart Id",
        validators: [requiredString]
    }
}