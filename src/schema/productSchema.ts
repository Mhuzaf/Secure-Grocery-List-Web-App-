import { isImageFile, maxLength, maxValue, minLength, minValue, requiredString } from "../app/validation.ts";

export const addProductSchema = {
    "addProductName": {
        displayName: "Product Name",
        validators: [requiredString, minLength(3), maxLength(50)]
    },
    "addProductPrice": {
        displayName: "Product Price",
        validators: [requiredString, minValue(1), maxValue(100)]
    },
    "addProductPerKg": {
        displayName: "Is Weighed Per Kg",
        validators: []
    },
    "addProductCategory": {
        displayName: "Product Category",
        validators: [requiredString]
    },
    "addProductImage": {
        displayName: "Product Image",
        validators: [requiredString, isImageFile]
    }
}

export const editProductSchema = {
    "editProductId": {
        validators: [requiredString]
    },
    "editProductOldCategory": {
        validators: [requiredString]
    },
    "editProductName": {
        displayName: "Product Name",
        validators: [requiredString, minLength(3), maxLength(50)]
    },
    "editProductPrice": {
        displayName: "Product Price",
        validators: [requiredString, minValue(1), maxValue(100)]
    },
    "editProductPerKg": {
        displayName: "Is Weighed Per Kg",
        validators: []
    },
    "editProductCategory": {
        displayName: "Product Category",
        validators: [requiredString]
    },
    "editProductImage": {
        displayName: "Product Image",
        isNotRequired: true,
        validators: [isImageFile]
    }
}

export const deleteProductSchema = {
    "deleteProductName": {
        displayName: "Product Name",
        validators: [requiredString, minLength(3), maxLength(50)]
    },
    "deleteProductCategory": {
        validators: [requiredString]
    },
    "deleteProduct": {
        validators: [requiredString]
    }
}