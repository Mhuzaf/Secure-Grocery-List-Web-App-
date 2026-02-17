import render from "../app/render.js";
import productsView from "../views/productsView.js";

const productsController = () => {
    return render(productsView());
}

export default productsController;