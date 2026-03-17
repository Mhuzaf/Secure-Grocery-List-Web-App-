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

export const maxLength = (max: number) => {
    return (name: string, value: string) => {
        if (value.length > max) return `${name} cannot exceed ${max} characters.`
    }
}

export const minValue = (min: number) => {
    return (name: string, value: number) => {
        if (value < min) return `${name} must be greater than ${min}`
    }
}

export const maxValue = (max: number) => {
    return (name: string, value: number) => {
        if (value > max) return `${name} must be less than ${max}`
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
    const entries: [string, { displayName?: string, isNotRequired?: boolean, validators?: string }][] = Object.entries(schema);
    const validated = {};
    let isValid = true;
    
    const errorEntries = entries.map(([key, { displayName, isNotRequired, validators }]) => {
        const value = formData.get(key);
        const message = validateField(displayName || key, value, validators) || "";
        if (message) {
            if (!isNotRequired) isValid = false; 
        }
        else validated[key] = value;
        return [key, { value, message, error: !!message }];
    });
    
    const errors = Object.fromEntries(errorEntries);
    return { formName, isValid, errors: { formName: formName, errors: errors }, validated };
}
