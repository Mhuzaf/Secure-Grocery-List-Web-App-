import { getProductImage } from "../models/imageModel.ts";

export const imageController = (id: string) => {
    const image = getProductImage(id);
    return new Response(image);
}