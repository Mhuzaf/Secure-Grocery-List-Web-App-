import { db } from "../app/db.ts";
import { CategoryProps } from "../interfaces/categoryInterface.ts";
import { ProductsProps } from "../interfaces/productsInterface.ts";

export const getCategories = () : CategoryProps[] => {
    return db.prepare("SELECT * FROM category").all();
}

export const getProducts = () : ProductsProps[] => { 
    return db.prepare("SELECT * FROM products ORDER BY name").all();
}