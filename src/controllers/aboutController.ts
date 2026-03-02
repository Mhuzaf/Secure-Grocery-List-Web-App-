import { render } from "../app/render.ts";
import { aboutView } from "../views/aboutView.ts";

export const aboutController = ({ request } : { request: Request }) => {
    return render(aboutView(), request);
}