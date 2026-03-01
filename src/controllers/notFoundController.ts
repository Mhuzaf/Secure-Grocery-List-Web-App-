import { render } from "../app/render.ts";
import { notFoundView } from "../views/notFoundView.ts";

export const notFoundController = () => {
    return render(notFoundView(), 404);
}