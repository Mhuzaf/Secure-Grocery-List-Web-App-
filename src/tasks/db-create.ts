import { db } from "../app/db.ts"
import { defaultProducts } from "../app/defaults.ts";
import { addCategory } from "../models/categoryModel.ts";
import { addProduct } from "../models/productsModel.ts";
import { addUser } from "../models/userModel.ts";

// Create/Reset

db.exec(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS products;
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
        mimeType TEXT,
        imageData BLOB
    );
 
    CREATE TABLE cart (
        userId INTEGER,
        productId INTEGER,
        FOREIGN KEY (userId) REFERENCES users(userId),
        FOREIGN KEY (productId) REFERENCES products(id)
    );

    CREATE TABLE users (
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        access TEXT DEFAULT 'normal',
        email TEXT NOT NULL,
        phoneNo TEXT,
        city TEXT,
        street TEXT,
        roomNo TEXT
    );

    CREATE TABLE sessions (
        sessionId TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        access TEXT NOT NULL,
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
            imageData: imageFile
        });
    });
});