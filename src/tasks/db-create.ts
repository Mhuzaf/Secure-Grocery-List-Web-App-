import { db } from "../app/db.ts"
import { defaultProducts } from "../app/defaults.ts";

// Create/Reset

db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS category;
    DROP TABLE IF EXISTS user;

    CREATE TABLE category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        category TEXT NOT NULL,
        mime_type TEXT,
        image_data BLOB
    );
 
    CREATE TABLE cart (
        cart_id INTEGER PRIMARY KEY,
        product_id INTEGER,
        FOREIGN KEY (product_id) REFERENCES products(id)
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
`);

// Populate

defaultProducts.forEach((d: { category: string }) => {
    db.prepare(`INSERT INTO category (name) VALUES
        (?)`).run(d.category);
});

defaultProducts.forEach((d: { category: string, items: { name: string, price: number }[] }) => {
    d.items.forEach(i => {
        const imageFile = Deno.readFileSync(`src/defaultAssets/${d.category.toLowerCase().replace(RegExp("\\s+"), "_")}/${i.name.toLowerCase()}.png`);
        if (imageFile) {
            console.log(`Populating ${i.name}`);
            db.prepare(`INSERT INTO products (category, name, price, mime_type, image_data) VALUES
                (?, ?, ?, ?, ?)`
            ).run(d.category, i.name, i.price, "png", imageFile);
        } else {
            db.prepare(`INSERT INTO products (category, name, price, mime_type, image_data) VALUES
                (?, ?, ?, ?, ?)`
            ).run(d.category, i.name, i.price, null, null);
        }
    });
});