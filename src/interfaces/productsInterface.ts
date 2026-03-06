export interface ProductsProps {
    id: number,
    name: string,
    price: number,
    category_id: string,
    mime_type: string,
    image_data: Blob
}