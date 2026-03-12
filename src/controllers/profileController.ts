import { render } from "../app/render.ts";
import { Context } from "../app/router.ts";
import { profileView } from "../views/profileView.ts";

export const profileController = (ctx: Context) => {
    const { session } = ctx;
    return render(profileView(session), ctx);
}