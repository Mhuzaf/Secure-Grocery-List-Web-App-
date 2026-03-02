import { CategoryProps, ProductsProps, db } from "../app/db.ts";

export const getCategories = () : CategoryProps[] => {
    return db.prepare("SELECT * FROM category").all();
}

export const getProducts = () : ProductsProps[] => { 
    return db.prepare("SELECT * FROM products").all();
}

export const addCategory = (name: string) => {
    db.prepare("INSERT INTO category (name) VALUES (:name)").run({ name });
}