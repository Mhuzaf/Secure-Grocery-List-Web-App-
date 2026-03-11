import { getProductImage } from "../models/productsModel.ts";
import { SessionProps } from "../models/sessionsModel.ts";

export const imageController = (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    const { request } = ctx;
    const url = new URL(request.url); 
    return new Response(
        getProductImage(
            new URLPattern({ pathname: "/images/:imageId" })
                .exec(url).pathname.groups.imageId
        )
    );
}