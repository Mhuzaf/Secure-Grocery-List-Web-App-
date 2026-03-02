import { render } from "../app/render.ts";
import { getCategories, getProducts, addCategory } from "../models/manageModel.ts";
import { manageView } from "../views/manageView.ts";
import { setFlash } from "../app/flash.ts";

export const manageController = ({ request } : { request: Request }) => {
    const categories = getCategories();
    const products = getProducts();
    
    return render(manageView({ categories, products }), request);
}

export const managePostController = async ({ request } : { request: Request }) => {
    const formData = await request.formData();
    const newItem = formData.get("addCategory");
    
    if (!newItem) {
        const error = "Name cannot be blank";
        const categories = getCategories();
        const products = getProducts();
        return render(manageView({ categories, products, error }), request, 400);
    }

    addCategory(newItem.toString());

    const headers = new Headers();
    setFlash(headers, `Added ${newItem} to Category.`);

    headers.set("location", "/manage");
    return new Response(null, { headers, status: 303 });
}