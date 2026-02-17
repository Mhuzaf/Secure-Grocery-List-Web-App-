import render from "../app/render.js";
import homeView from "../views/homeView.js";

const homeController = () => {
    return render(homeView());
}

export default homeController;