import render from "../app/render.ts";
import cartView from "../views/manageView.ts";

const manageController = () => {
    return render(cartView());
}

export default manageController;