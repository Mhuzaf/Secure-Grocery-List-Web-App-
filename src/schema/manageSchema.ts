import { minLength, requiredString } from "../app/validation.ts";

export const addCategorySchema =  {
    "addCategory": {
        displayName: "Category",
        validators: [requiredString, minLength(3)],
    }
}

export const deleteCategorySchema = {
    "deleteCategory": {
        displayName: "Category",
        validators: [requiredString, minLength(3)],
    }
}