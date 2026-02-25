import render from "../app/render.js";
import cartView from "../views/cartView.js";

const cartController = () => {
    return render(cartView());
}

export default cartController;