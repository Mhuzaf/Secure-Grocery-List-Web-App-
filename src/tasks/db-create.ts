import { db } from "../app/db.ts"

// Create/Reset

db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS category;
    DROP TABLE IF EXISTS user;

    CREATE TABLE category (
        name TEXT PRIMARY KEY
    );

    CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        category TEXT,
        FOREIGN KEY (category) REFERENCES category(name)
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

db.exec(`
   
    INSERT INTO category (name) VALUES
        ('Fruits'),
        ('Vegetables'),
        ('Drinks'),
        ('Snacks'),
        ('Dairy Products'),
        ('Bakery Products'),
        ('Dry foods');

    INSERT INTO products (category, name, price) VALUES
        ('Fruits', 'Apple', 5),
        ('Fruits', 'Banana', 10),
        ('Fruits', 'Mandarin', 7),
        ('Fruits', 'Grapes', 10),
        ('Fruits', 'Watermelon', 6);
`);