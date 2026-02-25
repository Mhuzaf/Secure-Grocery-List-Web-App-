import render from "../app/render.js";
import { getProducts, getCategories } from "../models/productsModel.js";
import productsView from "../views/productsView.js";

const productsController = async ({ request }) => {

    console.log(request.method)

    if (request.method == "POST") {
        const data = await request.formData("productSearch");
        console.log(data);
    }

    const categories = getCategories();
    const products = getProducts();
    return render(productsView({ request, categories, products }));
}

export default productsController;