import { db } from "../app/db.ts"
import { defaultProducts } from "../app/defaults.ts";
import { addCategory } from "../models/categoryModel.ts";
import { addProduct } from "../models/productsModel.ts";
import { addUser } from "../models/userModel.ts";

// Create/Reset

db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS category;
    DROP TABLE IF EXISTS sessions;
    DROP TABLE IF EXISTS users;

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
        user_id INTEGER,
        product_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES user(user_id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        access TEXT DEFAULT 'normal',
        email TEXT NOT NULL,
        phone_no TEXT,
        city TEXT,
        street TEXT,
        room_no TEXT
    );

    CREATE TABLE sessions (
        session_id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        role TEXT NOT NULL,
        FOREIGN KEY (username) REFERENCES users(username)
    );
`);

// Populate

await addUser({
    username: "admin",
    password: "12345",
    access: "admin",
    email: "support@greensmart.com",
    phoneNo: null,
    city: null,
    street: null,
    roomNo: null
});

defaultProducts.forEach((d: { category: string }) => {
    addCategory(d.category);
});

defaultProducts.forEach((d: { category: string, items: { name: string, price: number }[] }) => {
    d.items.forEach(i => {
        const imageFile = Deno.readFileSync(`src/defaultAssets/${d.category.toLowerCase().replace(RegExp("\\s+"), "_")}/${i.name.toLowerCase()}.png`);
        addProduct({ 
            category: d.category,
            name: i.name,
            price: i.price,
            mime_type: "png",
            image_data: imageFile
        });
    });
});