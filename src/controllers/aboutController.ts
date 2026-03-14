import { render } from "../app/render.ts";
import { Context } from "../app/router.ts";
import { aboutView } from "../views/aboutView.ts";

export const aboutController = (ctx: Context) => {
    return render(aboutView(), ctx);
}