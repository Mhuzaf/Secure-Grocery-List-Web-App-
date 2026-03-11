import { render } from "../app/render.ts";
import { SessionProps } from "../models/sessionsModel.ts";
import { profileView } from "../views/profileView.ts";

export const profileController = (ctx: { request: Request, session: SessionProps, headers: Headers }) => {
    const { session } = ctx;
    return render(profileView(session), ctx);
}