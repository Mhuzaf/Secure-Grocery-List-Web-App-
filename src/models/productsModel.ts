import { db } from "../app/db.ts";

export interface CategoryProps {
    name: string,
}

export interface ProductsProps {
    id: number,
    name: string,
    price: number,
    category: string,
}

export const getCategories = () : CategoryProps[] => {
    return db.prepare("SELECT * FROM category").all();
}

export const getProducts = () : ProductsProps[] => { 
    return db.prepare("SELECT * FROM products").all();
}
