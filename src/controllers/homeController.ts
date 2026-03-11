import { render } from "../app/render.ts";
import { homeView } from "../views/homeView.ts";

export const homeController = (request: Request) => {
    return render(homeView(), request);
}