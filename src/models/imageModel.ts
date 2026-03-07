import { db } from "../app/db.ts";

export const getProductImage = (id: string) => {
    const { name, image_data, mime_type } = db.prepare(
        `SELECT name, image_data, mime_type FROM products WHERE id=:id`
    ).get(id);

    console.log(image_data);
    return new File([image_data], name, { type: mime_type });
}