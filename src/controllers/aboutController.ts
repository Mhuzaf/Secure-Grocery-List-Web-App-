import { render } from "../app/render.ts";
import { SessionProps } from "../models/sessionsModel.ts";
import { aboutView } from "../views/aboutView.ts";

export const aboutController = (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    return render(aboutView(), ctx);
}