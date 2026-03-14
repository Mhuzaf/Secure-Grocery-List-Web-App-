import { render } from "../app/render.ts";
import { Context } from "../app/router.ts";
import { notFoundView } from "../views/notFoundView.ts";

export const notFoundController = (ctx: Context) => {
    return render(notFoundView(), ctx, 404);
}