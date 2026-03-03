import { minLength, requiredString } from "../app/validation.ts";

export const userRegisterSchema = {
    username: {
        validators: [requiredString, minLength(4)]
    },
    password: {
        validators: [requiredString, minLength(5)]
    },
    email: {
        validators: [requiredString]
    },
    phone: {},
    city: {},
    street: {
        validators: [minLength(5)]
    },
    room: {},
}

export const userLoginSchema = {
    username: {
        validators: [requiredString, minLength(4)]
    },
    password: {
        validators: [requiredString, minLength(5)]
    },
}