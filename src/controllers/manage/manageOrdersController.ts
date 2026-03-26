import { render } from "../../app/render.ts";
import { Context } from "../../app/router.ts";
import { manageOrdersView } from "../../views/manage/manageOrdersView.ts";

export const manageOrdersController = (ctx: Context) => {
    const { errors } = ctx;
    return render(manageOrdersView(errors), ctx);
}