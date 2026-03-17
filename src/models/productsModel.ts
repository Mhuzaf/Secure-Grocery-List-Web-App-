import { db } from "../app/db.ts";
import { decrementAmount, incrementAmount } from "./categoryModel.ts";

export interface Product {
    id?: number,
    name: string,
    price: number,
    category: string,
    isWeighedPerKg: number, // 0 = false, 1 = true
    imageData?: Uint8Array<ArrayBuffer>
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
        INSERT INTO products (name, price, isWeighedPerKg, category, imageData) VALUES
            (?, ?, ?, ?, ?)
    `).run(data.name, data.price, data.isWeighedPerKg, data.category, data.imageData);
    incrementAmount(data.category);
}

export const updateProduct = (oldCategory: string, data: Product) => {
    if (data.imageData) {
        db.prepare(`
            UPDATE products 
            SET name = ?,
                price = ?,
                isWeighedPerKg = ?,
                category = ?,
                imageData = ?
            WHERE id = ?
        `).run(data.name, data.price, data.isWeighedPerKg, data.category, data.imageData, data.id);
    } else {
        db.prepare(`
            UPDATE products 
            SET name = ?,
                price = ?,
                isWeighedPerKg = ?,
                category = ?
            WHERE id = ?
        `).run(data.name, data.price, data.isWeighedPerKg, data.category, data.id);
    }

    // TODO: prepare when it requires ids
    if (oldCategory != data.category) {
        decrementAmount(oldCategory);
        incrementAmount(data.category);
    } 
}

export const deleteProduct = (id: number, category: string) => {
    db.prepare(`
        DELETE FROM products WHERE id = ? 
    `).run(id);
    decrementAmount(category);
}

export const getProductImage = (id: string) => {
    const { name, imageData } = db.prepare(
        `SELECT name, imageData FROM products WHERE id = ?`
    ).get(id);

    return new File([imageData], name);
}