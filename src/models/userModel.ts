import { db } from "../app/db.ts"

export interface UserProps {
    userId?:  number,
    username: string,
    password?: string,
    access?: string,
    email?: string,
    phoneNo?: string,
    city?: string,
    street?: string,
    roomNo?: string
}

const salt = "supersecretstring";

const options = {
    name: "PBKDF2",
    hash: "SHA-256",
    iterations: 5000,
    salt: new Uint8Array(Array.from(new TextEncoder().encode(salt)))
}

const hashedPassword = async (password: string) => {
    const inputBytes = new TextEncoder().encode(password);
    const key = await crypto.subtle.importKey("raw", inputBytes, "PBKDF2", false, ['deriveBits']);
    const buffer = await crypto.subtle.deriveBits(options, key, 256);
    return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}


export const addUser = async (data: UserProps) => {
    const pw = await hashedPassword(data.password);
    db.prepare(`
        INSERT INTO users (username, password, access, email, phoneNo, city, street, roomNo) VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)  
    `).run(data.username, pw, data.access, data.email, data.phoneNo, data.city, data.street, data.roomNo);
}

export const getUser = (username: string): UserProps => {
    return db.prepare(`
        SELECT * FROM users WHERE username = ?    
    `).get(username);
}

export const checkCredentials = async (username: string, password: string) => {
    const user = getUser(username);
    if (!user) return false;

    const hashed = await hashedPassword(password);
    return hashed == user.password;
}