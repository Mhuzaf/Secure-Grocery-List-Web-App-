import { maxLength, minLength, requiredString } from "../app/validation.ts";

const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 25;
const MIN_PASSWORD_LENGTH = 5;
const MAX_PASSWORD_LENGTH = 20;

// TODO: polish these
export const userRegisterSchema = {
    username: {
        displayName: "Username",
        validators: [requiredString, minLength(MIN_USERNAME_LENGTH), maxLength(MAX_USERNAME_LENGTH)]
    },
    password: {
        displayName: "Password",
        validators: [requiredString, minLength(MIN_PASSWORD_LENGTH), maxLength(MAX_PASSWORD_LENGTH)]
    },
    confirmPassword: {
        displayName: "Password",
        validators: [requiredString, minLength(MIN_PASSWORD_LENGTH), maxLength(MAX_PASSWORD_LENGTH)]
    },
    email: {
        displayName: "Email",
        validators: [requiredString]
    },
    phone: {
        displayName: "Phone number",
        validators: [requiredString]
    },
    citydistrict: {
        displayName: "City/District",
        validators: [requiredString]
    },
    street: {
        displayName: "Street",
        validators: [minLength(5)]
    },
    room: {
        displayName: "Room no.",
        validators: [requiredString]
    },
}

export const userLoginSchema = {
    username: {
        displayName: "Username",
        validators: [requiredString, minLength(MIN_USERNAME_LENGTH), maxLength(MAX_USERNAME_LENGTH)]
    },
    password: {
        displayName: "Password",
        validators: [requiredString, minLength(MIN_PASSWORD_LENGTH), maxLength(MAX_PASSWORD_LENGTH)]
    },
}