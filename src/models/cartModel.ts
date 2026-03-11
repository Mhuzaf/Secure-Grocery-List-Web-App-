import { db } from "../app/db.ts";
import { getUser } from "./userModel.ts";

export interface CartProps {
    userId: number,
    productId: number,
}

export const getCart = (userId: number) => {
    return db.prepare(`
        SELECT * FROM cart WHERE user_id = ?    
    `).get(userId);
}

export const addToCart = (productId: number, userId: number) => {
    db.prepare(`
        INSERT INTO cart (user_id, product_id) VALUES
            (?, ?)
    `).run(userId, productId);
}