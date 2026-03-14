import { FormError } from "./errorFragments.ts";

export interface Validation {
    formName: string,
    isValid: boolean,
    errors: FormError,
    validated: {
        [key: string]: string
    }
}

export const requiredString = (name: string, value: string) => {
    if (!value) return `${name} is required.`;
}

export const minLength = (min: number) => {
    return (name: string, value: string) => {
        if (value.length < min) return `${name} must have at least ${min} characters.`;
    }
}

export const isImageFile = (name: string, value) => {
    if (!(value instanceof File)) return `${name} must be a file.`
    if (!value.type.startsWith("image/")) return `${name} must be an image file.`
}

export const validateField = (name: string, value, validators) : string => {
    for (const validator of validators) {
        const error = validator(name, value);
        if (error) return error;
    }
}

export const validateSchema = (formName: string, formData: FormData, schema): Validation => {
    // Schema .js entries
    const entries: [string, { displayName?: string, validators?: string }][] = Object.entries(schema);
    const validated = {};
    let isValid = true;
    
    const errorEntries = entries.map(([key, { displayName, validators }]) => {
        const value = formData.get(key);
        const message = validateField(displayName || key, value, validators) || "";
        if (message) isValid = false;
        else validated[key] = value;
        return [key, { value, message, error: !!message }];
    })
    
    const errors = Object.fromEntries(errorEntries);
    return { formName, isValid, errors: { formName: formName, errors: errors }, validated };
}
