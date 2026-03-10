import { db } from "../app/db.ts";

export interface ProductsProps {
    id?: number,
    name: string,
    price: number,
    category: string,
    mime_type: string,
    image_data: Uint8Array<ArrayBuffer>
}

export const getProduct = (id: number) => {
    return db.prepare(`
        SELECT * FROM products WHERE id = ?
    `).get(id);
}

export const getProducts = () : ProductsProps[] => { 
    return db.prepare("SELECT * FROM products ORDER BY name").all();
}

export const addProduct = (data: ProductsProps) => {
    db.prepare(`
        INSERT INTO products (category, name, price, mime_type, image_data) VALUES
            (?, ?, ?, ?, ?)
    `).run(data.category, data.name, data.price, data.mime_type, data.image_data);
}

export const getProductImage = (id: string) => {
    const { name, image_data, mime_type } = db.prepare(
        `SELECT name, image_data, mime_type FROM products WHERE id=:id`
    ).get(id);

    return new File([image_data], name, { type: mime_type });
}