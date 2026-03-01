import { render } from "../app/render.ts";
import { homeView } from "../views/homeView.ts";

export const homeController = () => {
    return render(homeView());
}