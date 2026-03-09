import { minLength, requiredString } from "../app/validation.ts";

const USERNAME_LENGTH = 4;
const PASSWORD_LENGTH = 5;

export const userRegisterSchema = {
    username: {
        validators: [requiredString, minLength(USERNAME_LENGTH)]
    },
    password: {
        validators: [requiredString, minLength(PASSWORD_LENGTH)]
    },
    confirm_password: {
        validators: [requiredString, minLength(PASSWORD_LENGTH)]
    },
    email: {
        validators: [requiredString]
    },
    phone: {
        validators: [requiredString]
    },
    citydistrict: {
        validators: [requiredString]
    },
    street: {
        validators: [minLength(5)]
    },
    room: {
        validators: [requiredString]
    },
}

export const userLoginSchema = {
    username: {
        validators: [requiredString, minLength(USERNAME_LENGTH)]
    },
    password: {
        validators: [requiredString, minLength(PASSWORD_LENGTH)]
    },
}