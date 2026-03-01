import { render } from "../app/render.ts";
import { getCategories, getProducts } from "../models/productsModel.ts";
import { manageView } from "../views/manageView.ts";

export const manageController = ({ request } : { request: Request }) => {
    
    // move this
    if (request.method == "POST") {
        //
    }
    
    const categories = getCategories();
    const products = getProducts();

    return render(manageView({ categories, products }));
}