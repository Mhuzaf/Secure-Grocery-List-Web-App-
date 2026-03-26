import { isEmail, maxLength, minLength, requiredString } from "../app/validation.ts";

const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 25;
const MIN_PASSWORD_LENGTH = 5;
const MAX_PASSWORD_LENGTH = 20;

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
    firstName: {
        displayName: "First Name",
        validators: [requiredString, minLength(2), maxLength(20)]
    },
    lastName: {
        displayName: "Last Name",
        validators: [requiredString, minLength(2), maxLength(20)]
    },
    email: {
        displayName: "Email",
        validators: [requiredString, isEmail, minLength(3), maxLength(30)]
    },
    phone: {
        displayName: "Phone number",
        validators: [requiredString, minLength(2), maxLength(14)]
    },
    citydistrict: {
        displayName: "City/District",
        validators: [requiredString, minLength(1), maxLength(20)]
    },
    street: {
        displayName: "Street",
        validators: [requiredString, minLength(5), maxLength(30)]
    },
    room: {
        displayName: "Room no.",
        validators: [requiredString, minLength(3), maxLength(20)]
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