import { render } from "../app/render.ts";
import { getCategories, getProducts, addCategory, deleteCategory } from "../models/manageModel.ts";
import { manageView } from "../views/manageView.ts";
import { redirect } from "../app/redirect.ts";
import Routes from "../app/routes.ts";
import { validateSchema } from "../app/validation.ts";
import { addCategorySchema, deleteCategorySchema } from "../schema/categorySchema.ts";
import { addProductSchema } from "../schema/productSchema.ts";


export const manageController = (request: Request ) => {
    const categories = getCategories();
    const products = getProducts();

    return render(manageView(categories, products), request);
}

export const managePostController = async (request: Request ) => {
    const formData = await request.formData();

    if (formData.has("addCategory")) {
        const { isValid, errors } = validateSchema(formData, addCategorySchema); 

        const newItem = formData.get("addCategory");
        
        if (!isValid) {
            const categories = getCategories();
            const products = getProducts();

            return render(manageView(categories, products, errors), request, 400);
        }

        addCategory(newItem.toString().toLowerCase().replace(RegExp("\\s+"), "_"), newItem.toString());

        const headers = new Headers();
        return redirect(headers, Routes.MANAGE.route, `Added ${newItem} to Category.`);
    } 
    
    if (formData.has("deleteCategory")) {
        const { isValid, errors } = validateSchema(formData, deleteCategorySchema); 

        if (!isValid) {
            const categories = getCategories();
            const products = getProducts();

            return render(manageView(categories, products, errors), request, 400);
        }

        const item = formData.get("deleteCategory");
        deleteCategory(item.toString().toLowerCase().replace(RegExp("\\s+"), "_"));

        const headers = new Headers();
        return redirect(headers, Routes.MANAGE.route, `Deleted ${item} from Category.`);
    }

    if (formData.has("addProductName")) {
        const { isValid, errors } = validateSchema(formData, addProductSchema); 

        if (!isValid) {
            const categories = getCategories();
            const products = getProducts();

            return render(manageView(categories, products, errors), request, 400);
        }

        const productName = formData.get("addProductName");
        const productPrice = formData.get("productPrice");
        const productCategory = formData.get("productCategory");
        const productImage = formData.get("productImage") as File;

        console.log(productName, productPrice, productCategory, productImage);

        const headers = new Headers();
        return redirect(headers, Routes.MANAGE.route, `Dummy.`);
    }
}