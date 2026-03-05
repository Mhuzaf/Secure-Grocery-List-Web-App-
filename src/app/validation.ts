export const requiredString = (name: string, value: string) => {
    if (!value) return `${name} is required.`;
}

export const minLength = (min: number) => {
    return (name: string, value: string) => {
        if (value.length < min) return `${name} must have at least ${min} characters.`;
    }
}

// deno-lint-ignore no-explicit-any
export const validateField = (name: string, value: any, validators: any) : string => {
    console.log(validators);
    for (const validator of validators) {
        const error = validator(name, value);
        if (error) return error;
    }
}

// deno-lint-ignore no-explicit-any
export const validateSchema = (formData: FormData, schema: any): { isValid: boolean, errors: any } => {
    const entries: [string, { displayName?: string, validators?: string }][] = Object.entries(schema);
    let isValid = true;
    
    const errorEntries = entries.map(([key, { displayName, validators }]) => {
        const value = formData.get(key);
        const message = validateField(displayName || key, value, validators) || "";
        if (message) isValid = false;
        return [key, { value, message, error: !!message }];
    })
    
    const errors = Object.fromEntries(errorEntries);
    return { isValid, errors };
}
