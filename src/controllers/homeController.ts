import { render } from "../app/render.ts";
import { SessionProps } from "../models/sessionsModel.ts";
import { homeView } from "../views/homeView.ts";

export const homeController = (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    return render(homeView(), ctx);
}