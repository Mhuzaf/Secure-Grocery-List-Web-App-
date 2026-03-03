import { minLength, requiredString } from "../app/validation.ts";

export const categorySchema =  {
    "addCategory": {
        displayName: "Category",
        validators: [requiredString, minLength(3)],
    }
}