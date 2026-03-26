import { render } from "../../app/render.ts";
import { Context } from "../../app/router.ts";
import { manageDiscountsView } from "../../views/manage/manageDiscountsView.ts";

export const manageDiscountsController = (ctx: Context) => {
    const { errors } = ctx;
    return render(manageDiscountsView(errors), ctx);
}