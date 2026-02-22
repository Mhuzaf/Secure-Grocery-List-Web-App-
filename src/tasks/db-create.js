import { db } from "../app/db.js"

db.exec(`
    DROP TABLE IF EXISTS products;

    CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        category TEXT
    );

    INSERT INTO products (name, price) VALUES
        ('apple', 0.32),
        ('banana', 0.42),
        ('orange', 0.72); 

    DROP TABLE IF EXISTS user;

    CREATE TABLE user (
        uname TEXT PRIMARY KEY NOT NULL,
        password TEXT NOT NULL
    ); 
`);