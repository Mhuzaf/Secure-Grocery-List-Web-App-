import render from "../app/render.js";
import { getProducts } from "../models/productsModel.js";
import productsView from "../views/productsView.js";

const productsController = () => {
    const products = getProducts();
    return render(productsView({ products }));
}

export default productsController;