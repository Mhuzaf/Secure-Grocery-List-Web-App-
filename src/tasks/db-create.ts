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

db.exec(`
    INSERT INTO category (id, name) VALUES
    ${categoryMap}
`);

Object.values(defaultProducts).forEach((d: { category: string, items: { name: string, price: number }[] }) => { 
    d.items.forEach(i => {
        const imageFile = Deno.readFileSync(`src/defaultAssets/${d.category.toLowerCase().replace(RegExp("\\s+"), "_")}/${i.name.toLowerCase()}.png`);
        if (imageFile) {
            console.log(`Populating ${i.name}`);
            db.prepare(`INSERT INTO products (category_id, name, price, mime_type, image_data) VALUES
                (?, ?, ?, ?, ?)`
            ).run(d.category.toLowerCase().replace(RegExp("\\s+"), "_"), i.name, i.price, "png", imageFile);
        } else {
            db.prepare(`INSERT INTO products (category_id, name, price, mime_type, image_data) VALUES
                (?, ?, ?, ?, ?)`
            ).run(d.category.toLowerCase().replace(RegExp("\\s+"), "_"), i.name, i.price, null, null);
        }
    });
});