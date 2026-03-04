import { render } from "../app/render.ts";
import { getCategories, getProducts, addCategory, deleteCategory } from "../models/manageModel.ts";
import { manageView } from "../views/manageView.ts";
import { redirect } from "../app/redirect.ts";
import Routes from "../app/routes.ts";
import { validateSchema } from "../app/validation.ts";
import { addCategorySchema, deleteCategorySchema } from "../schema/manageSchema.ts";


export const manageController = ({ request } : { request: Request }) => {
    const categories = getCategories();
    const products = getProducts();

    return render(manageView({ categories, products }), request);
}

export const managePostController = async ({ request } : { request: Request }) => {
    const formData = await request.formData();

    if (formData.has("addCategory")) {
        const { isValid, errors } = validateSchema(formData, addCategorySchema); 

        const newItem = formData.get("addCategory");
        const error = errors["addCategory"];
        
        if (!isValid) {
            const categories = getCategories();
            const products = getProducts();

            return render(manageView({ categories, products, error }), request, 400);
        }

        addCategory(newItem.toString().toLowerCase().replace(RegExp("\\s+"), "_"), newItem.toString());

        const headers = new Headers();
        return redirect(headers, Routes.MANAGE.route, `Added ${newItem} to Category.`);
    } 
    
    if (formData.has("deleteCategory")) {
        const { isValid, errors } = validateSchema(formData, deleteCategorySchema); 

        const item = formData.get("deleteCategory");
        const error = errors["deleteCategory"];

        if (!isValid) {
            const categories = getCategories();
            const products = getProducts();

            return render(manageView({ categories, products, error }), request, 400);
        }

        deleteCategory(item.toString().toLowerCase().replace(RegExp("\\s+"), "_"));

        const headers = new Headers();
        return redirect(headers, Routes.MANAGE.route, `Deleted ${item} from Category.`);
    }

    else if (formData.has("addProduct")) {
        // Later
    }
}