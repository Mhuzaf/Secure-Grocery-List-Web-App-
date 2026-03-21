import { render } from "../app/render.ts";
import { Context } from "../app/router.ts";
import { checkoutView } from "../views/checkoutView.ts";

export const checkoutController = (ctx: Context) => {
    return render(checkoutView(), ctx);
}