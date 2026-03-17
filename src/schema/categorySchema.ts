import { maxLength, minLength, requiredString } from "../app/validation.ts";

export const addCategorySchema =  {
    "addCategory": {
        displayName: "Category",
        validators: [requiredString, minLength(3), maxLength(20)],
    }
}

export const editCategorySchema = {
    "editCategoryId": {
        validators: [requiredString]
    },
    "editCategoryNewName": {
        displayName: "Category",
        validators: [requiredString, minLength(3), maxLength(20)],
    }
}

export const deleteCategorySchema = {
    "deleteCategory": {
        validators: [requiredString]
    },
    "deleteCategoryName": {
        displayName: "Category",
        validators: [requiredString, minLength(3), maxLength(20)],
    }
}