import { db } from "../app/db.ts";
import { CategoryProps } from "../interfaces/categoryInterface.ts";
import { ProductsProps } from "../interfaces/productsInterface.ts";

export const getCategories = () : CategoryProps[] => {
    return db.prepare("SELECT * FROM category").all();
}

export const getProducts = () : ProductsProps[] => { 
    return db.prepare("SELECT * FROM products").all();
}

export const addCategory = (id: string, name: string) => {
    db.prepare("INSERT INTO category (id, name) VALUES (?, ?)").run(id, name);
}

export const deleteCategory = (id: string) => {
    console.log(id)
    db.prepare("DELETE FROM category WHERE id = ?").run(id);
}