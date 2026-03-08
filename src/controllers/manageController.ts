import { render } from "../app/render.ts";
import { getCategories, getProducts, addCategory, deleteCategory, updateCategory } from "../models/manageModel.ts";
import { manageView } from "../views/manageView.ts";
import { redirect } from "../app/redirect.ts";
import Routes from "../app/routes.ts";
import { validateSchema } from "../app/validation.ts";
import { addCategorySchema, deleteCategorySchema, editCategorySchema } from "../schema/categorySchema.ts";
import { addProductSchema } from "../schema/productSchema.ts";


export const manageController = (request: Request) => {
    const categories = getCategories();
    const products = getProducts();

    return render(manageView(categories, products), request);
}

export const managePostController = async (request: Request) => {
    const formData = await request.formData();

    console.log(formData.get("manageMethod"))

    switch (formData.get("manageMethod")) {
        case "addCategory": {
            const { isValid, errors } = validateSchema(formData, addCategorySchema); 

            const newItem = formData.get("addCategory");
            
            const categories = getCategories();
            if (!isValid) {
                const products = getProducts();

                return render(manageView(categories, products, errors), request, 400);
            }

            addCategory(categories.length + 1, newItem.toString());

            const headers = new Headers();
            return redirect(headers, Routes.MANAGE.route, `Added ${newItem} to category.`);
        }

        case "editCategory": {
            const { isValid, errors } = validateSchema(formData, editCategorySchema); 

            const id = formData.get("editCategoryId");
            const newItem = formData.get("editCategoryNewName");
            
            if (!isValid) {
                const categories = getCategories();
                const products = getProducts();

                return render(manageView(categories, products, errors), request, 400);
            }

            updateCategory(id.toString(), newItem.toString());

            const headers = new Headers();
            return redirect(headers, Routes.MANAGE.route, `Updated a category to \"${newItem}\".`);
        }

        case "deleteCategory": {
            const { isValid, errors } = validateSchema(formData, deleteCategorySchema); 

            if (!isValid) {
                const categories = getCategories();
                const products = getProducts();

                return render(manageView(categories, products, errors), request, 400);
            }

            const item = formData.get("deleteCategory");
            deleteCategory(item.toString().toLowerCase().replace(RegExp("\\s+"), "_"));

            const headers = new Headers();
            return redirect(headers, Routes.MANAGE.route, `Deleted ${item} from category.`);
        }

        case "addProduct": {
            const { isValid, errors } = validateSchema(formData, addProductSchema); 

            if (!isValid) {
                const categories = getCategories();
                const products = getProducts();

                return render(manageView(categories, products, errors), request, 400);
            }

            const productName = formData.get("productName");
            const productPrice = formData.get("productPrice");
            const productCategory = formData.get("productCategory");
            const productImage = formData.get("productImage") as File;

            console.log(productName, productPrice, productCategory, productImage);

            const headers = new Headers();
            return redirect(headers, Routes.MANAGE.route, `stub!`);
        }
    }
}