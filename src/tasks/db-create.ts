import { db } from "../app/db.ts"
import { defaultProducts } from "../app/defaults.ts";

// Create/Reset

db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS category;
    DROP TABLE IF EXISTS user;

    CREATE TABLE category (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
    );

    CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        category_id TEXT NOT NULL,
        mime_type TEXT,
        image_data BLOB,
        FOREIGN KEY (category_id) REFERENCES category(id)
    );
 
    CREATE TABLE user (
        username TEXT PRIMARY KEY NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        phone_no TEXT,
        city TEXT,
        street TEXT,
        room_no TEXT,
        cart_id INTEGER,
        FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
    );

    CREATE TABLE cart (
        cart_id INTEGER PRIMARY KEY,
        product_id INTEGER,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );
`);

// Populate

const categoryMap = defaultProducts.map(d => {
    return `('${d.category.toLowerCase().replace(RegExp("\\s+"), "_")}', '${d.category}')`
}).join(", ").concat(";");

const productsMap = Object.values(defaultProducts).map((d: { category: string, items: { name: string, price: number }[] }) => { 
    return d.items.map(i => {
        return`('${d.category.toLowerCase().replace(RegExp("\\s+"), "_")}', '${i.name}', ${i.price})`;
    }).join(", ");
}).join("").concat(";");

console.log(categoryMap, productsMap)

db.exec(`
    INSERT INTO category (id, name) VALUES
        ${categoryMap}

    INSERT INTO products (category_id, name, price) VALUES
        ${productsMap}
`);