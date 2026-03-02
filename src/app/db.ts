import { Database } from '@db/sqlite'

export interface CategoryProps {
    name: string,
}

export interface ProductsProps {
    id: number,
    name: string,
    price: number,
    category: string,
}

export const db = new Database("app.db");