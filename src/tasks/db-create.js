import { db } from "../app/db.js"

// Create/Reset

db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS category;

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
 
    DROP TABLE IF EXISTS user;

    CREATE TABLE user (
        uname TEXT PRIMARY KEY NOT NULL,
        password TEXT NOT NULL,
        cart_id INTEGER,
        FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
    );

    CREATE TABLE cart (
        cart_id INTEGER PRIMARY KEY,
        uname TEXT,
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