import render from "../app/render.ts";
import homeView from "../views/homeView.ts";

const homeController = () => {
    return render(homeView());
}

export default homeController;