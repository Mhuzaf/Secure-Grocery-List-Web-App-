import { render } from "../app/render.ts";
import { Context } from "../app/router.ts";
import { homeView } from "../views/homeView.ts";

export const homeController = (ctx: Context) => {
    return render(homeView(), ctx);
}