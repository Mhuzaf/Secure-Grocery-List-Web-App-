import { render } from "../app/render.ts";
import { getCategories } from "../models/categoryModel.ts";
import { getProducts } from "../models/productsModel.ts";
import { productsView } from "../views/productsView.ts";

export const productsController = (request: Request) => {
    const url = new URL(request.url);
    console.log(url.searchParams);

    const categories = getCategories();
    const products = getProducts();
    return render(productsView(categories, products), request);
}

export const productsPostController = async (request: Request) => {
    const formData = await request.formData();
}