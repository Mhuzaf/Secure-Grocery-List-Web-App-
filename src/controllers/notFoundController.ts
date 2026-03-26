import { render } from "../app/render.ts";
import { Context } from "../app/router.ts";
import { notFoundView } from "../views/notFoundView.ts";

export const notFoundController = (ctx: Context) => {
    ctx.status = 404;
    return render(notFoundView(), ctx);
}