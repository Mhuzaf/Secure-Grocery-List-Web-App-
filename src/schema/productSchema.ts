import { isImageFile, minLength, requiredString } from "../app/validation.ts";

export const addProductSchema = {
    "productName": {
        displayName: "Product Name",
        validators: [requiredString, minLength(3)]
    },
    "productPrice": {
        displayName: "Product Price",
        validators: [requiredString]
    },
    "productCategory": {
        displayName: "Product Category",
        validators: [requiredString]
    },
    "productImage": {
        displayName: "Product Image",
        validators: [requiredString, isImageFile]
    }
}