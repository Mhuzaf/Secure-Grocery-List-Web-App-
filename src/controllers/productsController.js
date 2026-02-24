import render from "../app/render.js";
import { getProducts, getCategories } from "../models/productsModel.js";
import productsView from "../views/productsView.js";

const productsController = ({ request }) => {
    const categories = getCategories();
    const products = getProducts();
    return render(productsView({ request, categories, products }));
}

export default productsController;