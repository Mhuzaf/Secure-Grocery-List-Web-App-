import { db } from "../app/db.js";

const getCategories = () => {
    return db.prepare("SELECT * FROM category").all();
}

const getProducts = () => { 
    return db.prepare("SELECT * FROM products").all();
}

export { getCategories, getProducts }