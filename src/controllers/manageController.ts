import { render } from "../app/render.ts";
import { manageView } from "../views/manageView.ts";

export const manageController = () => {
    return render(manageView());
}