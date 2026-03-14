import { Context } from "../app/router.ts";
import { getProductImage } from "../models/productsModel.ts";

export const imageController = (ctx: Context) => {
    const { request } = ctx;
    const url = new URL(request.url); 
    return new Response(
        getProductImage(
            new URLPattern({ pathname: "/images/:imageId" })
                .exec(url).pathname.groups.imageId
        )
    );
}