import { escape } from "@std/html/entities";

export const getErrFragments = (errors: { value: string, message: string, error: boolean, isRequired: boolean }) => {
    return Object.fromEntries(Object.keys(errors).map((key) => {
        const { error, value, message, isRequired } = errors[key]
        return [key, {
            value: value ? `value=${escape(value)}` : "",
            message: error ? `<p class="error">${escape(message)}</p>` : "",
            isRequired: isRequired
        }]
    }));
}