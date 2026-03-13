import { db } from "../app/db.ts";

export interface CartProps {
    userId: number,
    productId: number,
}

export const getCart = (userId: number) => {
    return db.prepare(`
        SELECT * FROM cart WHERE userId = ?    
    `).get(userId);
}

export const addToCart = (productId: number, userId: number) => {
    db.prepare(`
        INSERT INTO cart (userId, productPd) VALUES
            (?, ?)
    `).run(userId, productId);
}