import { db } from "../app/db.ts";

export interface Product {
    id?: number,
    name: string,
    price: number,
    category: string,
    imageData: Uint8Array<ArrayBuffer>
}

export const getProduct = (id: number): Product => {
    return db.prepare(`
        SELECT * FROM products WHERE id = ?
    `).get(id);
}

export const getProducts = () : Product[] => { 
    return db.prepare("SELECT * FROM products ORDER BY name").all();
}

export const addProduct = (data: Product) => {
    db.prepare(`
        INSERT INTO products (category, name, price, imageData) VALUES
            (?, ?, ?, ?)
    `).run(data.category, data.name, data.price, data.imageData);
}

export const getProductImage = (id: string) => {
    const { name, imageData } = db.prepare(
        `SELECT name, imageData FROM products WHERE id = ?`
    ).get(id);

    return new File([imageData], name);
}