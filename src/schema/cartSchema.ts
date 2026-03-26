import { maxValue, minValue, requiredString } from "../app/validation.ts";

export const addToCartSchema = {
    "addToCart": {
        displayName: "Cart Item",
        validators: [requiredString]
    },
    "addToCartId": {
        displayName: "Cart Id",
        validators: [requiredString]
    },
    "productQuantity": {
        displayName: "Quantity",
        validators: [requiredString, minValue(1), maxValue(20)]
    }
}