import { render } from "../app/render.ts";
import { notFoundView } from "../views/notFoundView.ts";

export const notFoundController = ({ request } : { request: Request }) => {
    return render(notFoundView(), request, 404);
}