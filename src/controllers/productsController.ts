import { render } from "../app/render.ts";
import { getProducts, getCategories } from "../models/productsModel.ts";
import { productsView } from "../views/productsView.ts";

export const productsController = ({ request } : { request: Request }) => {
    const url = new URL(request.url);
    console.log(url.searchParams);

    const categories = getCategories();
    const products = getProducts();
    return render(productsView({ categories, products }));
}