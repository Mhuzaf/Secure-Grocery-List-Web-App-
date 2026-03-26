import { isEmail, maxLength, minLength, requiredString } from "../app/validation.ts";

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;

export const checkoutSchema = {
    "firstName": {
        displayName: "First Name",
        validators: [requiredString, minLength(MIN_NAME_LENGTH), maxLength(MAX_NAME_LENGTH)]
    },
    "lastName": {
        displayName: "Last Name",
        validators: [requiredString, minLength(MIN_NAME_LENGTH), maxLength(MAX_NAME_LENGTH)]
    },
    "email": {
        displayName: "Email",
        validators: [requiredString, isEmail, minLength(3), maxLength(30)]
    },
    "phoneNo": {
        displayName: "Phone No.",
        validators: [requiredString, minLength(2), maxLength(14)]
    },

    "citydistrict": {
        displayName: "City/District",
        validators: [requiredString, minLength(1), maxLength(20)]
    },
    "street": {
        displayName: "Street",
        validators: [requiredString, minLength(5), maxLength(30)]
    },
    "roomNo": {
        displayName: "Room No.",
        validators: [requiredString, minLength(3), maxLength(20)]
    },

    "card16": {
        displayName: "16-digit Card Number",
        validators: [requiredString, minLength(16), maxLength(16)]
    },
    "card3": {
        displayName: "3-digit Passcode",
        validators: [requiredString, minLength(3), maxLength(3)]
    },
}

export const couponSchema = {
    "coupon": {
        displayName: "Coupon",
        validators: [requiredString, minLength(1), maxLength(20)]
    }
}