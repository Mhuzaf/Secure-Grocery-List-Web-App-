import { db } from "../app/db.ts"

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
        category_id TEXT,
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

db.exec(`
   
    INSERT INTO category (id, name) VALUES
        ('fruits',          'Fruits'),
        ('vegetables',      'Vegetables'),
        ('drinks',          'Drinks'),
        ('snacks',          'Snacks'),
        ('dairy_products',   'Dairy Products'),
        ('bakery_products',  'Bakery Products'),
        ('dry_foods',        'Dry foods');

    INSERT INTO products (category_id, name, price) VALUES
        ('fruits', 'Apple', 5),
        ('fruits', 'Banana', 10),
        ('fruits', 'Mandarin', 7),
        ('fruits', 'Grapes', 10),
        ('fruits', 'Watermelon', 6);
`);