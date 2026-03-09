import { currentSession } from "../app/auth.ts";
import { render } from "../app/render.ts";
import { profileView } from "../views/profileView.ts";

export const profileController = (request: Request) => {
    const session = currentSession(request.headers);
    return render(profileView(session), request);
}