import { Database } from '@db/sqlite'

// TODO: move these to another directory (or use the schemas?)
export interface CategoryProps {
    id: string,
    name: string,
}

export interface ProductsProps {
    id: number,
    name: string,
    price: number,
    category_id: string,
    mime_type: string,
    image_data: Blob
}

export const db = new Database("app.db");