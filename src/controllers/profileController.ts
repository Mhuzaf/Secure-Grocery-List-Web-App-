import { render } from "../app/render.ts";
import { profileView } from "../views/profileView.ts";

export const profileController = ({ request } : { request: Request }) => {
    return render(profileView(), request);
}