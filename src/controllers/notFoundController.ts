import { render } from "../app/render.ts";
import { SessionProps } from "../models/sessionsModel.ts";
import { notFoundView } from "../views/notFoundView.ts";

export const notFoundController = (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    return render(notFoundView(), ctx, 404);
}