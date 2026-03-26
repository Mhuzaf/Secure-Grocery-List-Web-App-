import { db } from "../app/db.ts";

export interface CartItem {
    userId: number,
    productId: number,
    quantity: number
}

export const createCartTable = () => {
    db.prepare(`
        CREATE TABLE cart (
            userId INTEGER,
            productId INTEGER UNIQUE,
            quantity INTEGER NOT NULL DEFAULT '1',
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

export const addToCart = (productId: number, userId: number, quantity: number) => {
    const cart = getCartItems(userId);
    if (cart.find(c => c.productId == productId)) {
        db.prepare(`
            UPDATE cart SET quantity = quantity + 1 WHERE productId = ? AND userId = ?    
        `).run(productId, userId);
    } else {
        db.prepare(`
            INSERT INTO cart (userId, productId, quantity) VALUES
                (?, ?, ?)
        `).run(userId, productId, quantity);
    }
}

export const updateQuantity = (productId: number, userId: number, quantity: number) => {
    db.prepare(`
        UPDATE cart SET quantity = ? WHERE productId = ? AND userId = ?
    `).run(quantity, productId, userId);
}

export const removeFromCart = (productId: number, userId: number) => {
    db.prepare(`
        DELETE FROM cart WHERE productId = ? AND userId = ?
    `).run(productId, userId);
}

export const deleteCartTable = () => {
    db.prepare("DROP TABLE IF EXISTS cart").run();
}