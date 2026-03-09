import { getProductImage } from "../models/productsModel.ts";

export const imageController = (id: string) => {
    const image = getProductImage(id);
    return new Response(image);
}