import { db } from "../app/db.ts";

export interface CartItem {
    userId: number,
    productId: number,
}

export const createCartTable = () => {
    db.prepare(`
        CREATE TABLE cart (
            userId INTEGER,
            productId INTEGER,
            FOREIGN KEY (userId) REFERENCES users(userId),
            FOREIGN KEY (productId) REFERENCES products(id)
        );
    `).run();
}

export const getCartItems = (userId: number): CartItem[] => {
    return db.prepare(`
        SELECT * FROM cart WHERE userId = ?    
    `).all(userId);
}

export const addToCart = (productId: number, userId: number) => {
    db.prepare(`
        INSERT INTO cart (userId, productId) VALUES
            (?, ?)
    `).run(userId, productId);
}

export const deleteCartTable = () => {
    db.prepare("DROP TABLE IF EXISTS cart").run();
}