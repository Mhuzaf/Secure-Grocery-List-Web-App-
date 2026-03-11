import { db } from "../app/db.ts";

export interface CategoryProps {
    id: number,
    name: string,
}

export const addCategory = (name: string) => {
    db.prepare("INSERT INTO category (name) VALUES (?)").run(name);
}

export const getCategories = () : CategoryProps[] => {
    return db.prepare("SELECT * FROM category").all();
}

export const updateCategory = (id: string, name: string) => {
    db.prepare("UPDATE category SET name = ? WHERE id = ?").run(name, id);
}

export const deleteCategory = (id: string) => {
    console.log(id)
    db.prepare("DELETE FROM category WHERE id = ?").run(id);
}