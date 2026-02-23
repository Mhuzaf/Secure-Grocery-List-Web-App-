import { db } from "../app/db.js"

// Create/Reset

db.exec(`
    DROP TABLE IF EXISTS products;

    CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        category TEXT
    );
 
    DROP TABLE IF EXISTS user;

    CREATE TABLE user (
        uname TEXT PRIMARY KEY NOT NULL,
        password TEXT NOT NULL,
        cart_id INTEGER,
        FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
    );
    
    DROP TABLE if EXISTS cart;

    CREATE TABLE cart (
        uname TEXT,
        FOREIGN KEY (uname) REFERENCES user(uname),
        product_id INTEGER,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );
`);

// Populate

db.exec(`
   
    INSERT INTO products (name, price) VALUES
        ('apple', 0.32),
        ('banana', 0.42),
        ('orange', 0.72); 
`);