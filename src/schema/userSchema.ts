import { maxLength, minLength, requiredString } from "../app/validation.ts";

const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 25;
const MIN_PASSWORD_LENGTH = 5;
const MAX_PASSWORD_LENGTH = 20;

// TODO: polish these
export const userRegisterSchema = {
    username: {
        validators: [requiredString, minLength(MIN_USERNAME_LENGTH), maxLength(MAX_USERNAME_LENGTH)]
    },
    password: {
        validators: [requiredString, minLength(MIN_PASSWORD_LENGTH), maxLength(MAX_PASSWORD_LENGTH)]
    },
    confirm_password: {
        validators: [requiredString, minLength(MIN_PASSWORD_LENGTH), maxLength(MAX_PASSWORD_LENGTH)]
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
        validators: [requiredString, minLength(MIN_USERNAME_LENGTH), maxLength(MAX_USERNAME_LENGTH)]
    },
    password: {
        validators: [requiredString, minLength(MIN_PASSWORD_LENGTH), maxLength(MAX_PASSWORD_LENGTH)]
    },
}