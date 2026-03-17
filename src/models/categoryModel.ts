import { db } from "../app/db.ts";

export interface Category {
    id: number,
    name: string,
    amount: number
}

export const createCategoryTable = () => {
    db.prepare(`
        CREATE TABLE category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            amount INTEGER DEFAULT '0'
        );
    `).run();
}

export const addCategory = (name: string) => {
    db.prepare("INSERT INTO category (name) VALUES (?)").run(name);
}

export const getCategories = () : Category[] => {
    return db.prepare("SELECT * FROM category").all();
}

export const updateCategory = (id: string, name: string) => {
    db.prepare("UPDATE category SET name = ? WHERE id = ?").run(name, id);
}

// TODO: maybe change these to use ids.
export const incrementAmount = (name: string) => {
    db.prepare("UPDATE category SET amount = amount + 1 WHERE name = ?").run(name);
}

export const decrementAmount = (name: string) => {
    db.prepare("UPDATE category SET amount = amount - 1 WHERE name = ?").run(name);
}

export const deleteCategory = (id: string) => {
    db.prepare("DELETE FROM category WHERE id = ?").run(id);
}

export const deleteCategoryTable = () => {
    db.prepare("DROP TABLE IF EXISTS category").run();
}