import { escape } from "@std/html/entities";

export interface FormError {
    formName: string,
    errors: {
        [elementName: string]: {
            value: string,
            message: string,
            error: boolean
        }
    }
}

export interface ErrorFragment {
    [fragment: string]: {
        value: string,
        message: string
    }
}

export const getErrFragments = (errors: FormError): ErrorFragment => {
    return Object.fromEntries(Object.keys(errors.errors).map((key) => {
        const { error, value, message } = errors.errors[key]
        return [key, {
            value: value ? `value=${typeof value === 'string' ? escape(value) : value}` : "",
            message: error ? `<p class="error">${escape(message)}</p>` : "",
        }]
    }));
}