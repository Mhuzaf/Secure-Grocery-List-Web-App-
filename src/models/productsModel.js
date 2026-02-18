import { db } from "../app/db.js";

const getProducts = () => { 
    return db.prepare("SELECT * FROM products").all();
}

export { getProducts }