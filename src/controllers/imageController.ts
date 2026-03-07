import { getProductImage } from "../models/imageModel.ts";

export const imageController = (id: string) => {
    const image = getProductImage(id);
    console.log(image);
    return new Response(image);
}