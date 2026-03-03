import { render } from "../app/render.ts";
import { getCategories, getProducts, addCategory } from "../models/manageModel.ts";
import { manageView } from "../views/manageView.ts";
import { redirect } from "../app/redirect.ts";
import Routes from "../app/routes.ts";
import { validateSchema } from "../app/validation.ts";
import { categorySchema } from "../schema/manageSchema.ts";


export const manageController = ({ request } : { request: Request }) => {
    const categories = getCategories();
    const products = getProducts();

    return render(manageView({ categories, products }), request);
}

export const managePostController = async ({ request } : { request: Request }) => {
    const formData = await request.formData();

    if (formData.has("addCategory")) {
        const { isValid, errors } = validateSchema(formData, categorySchema); 

        const newItem = formData.get("addCategory");
        const error = errors["addCategory"];
        
        if (!isValid) {
            const categories = getCategories();
            const products = getProducts();

            return render(manageView({ categories, products, error }), request, 400);
        }

        addCategory(newItem.toString());

        const headers = new Headers();
        return redirect(headers, Routes.MANAGE.route, `Added ${newItem} to Category.`);
    } else if (formData.has("addProduct")) {
        // Later
    }
}