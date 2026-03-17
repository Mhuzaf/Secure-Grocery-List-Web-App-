import { db } from "../app/db.ts";

export interface CartProps {
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

export const deleteCartTable = () => {
    db.prepare("DROP TABLE IF EXISTS cart").run();
}