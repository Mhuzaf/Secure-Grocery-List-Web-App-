import render from "../app/render.ts";
import { getProducts, getCategories } from "../models/productsModel.ts";
import productsView from "../views/productsView.ts";

const productsController = async ({ request } : { request: Request }) => {

    console.log(request.method)

    if (request.method == "POST") {
        console.log("got post request")
        const data = await request.formData();
        console.log(data);
    }

    const categories = getCategories();
    const products = getProducts();
    return render(productsView({ categories, products }));
}

export default productsController;