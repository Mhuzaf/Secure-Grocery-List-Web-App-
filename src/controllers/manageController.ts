import { render } from "../app/render.ts";
import { manageView } from "../views/manageView.ts";
import { redirect } from "../app/redirect.ts";
import { validateSchema } from "../app/validation.ts";
import { addCategorySchema, deleteCategorySchema, editCategorySchema } from "../schema/categorySchema.ts";
import { addProductSchema } from "../schema/productSchema.ts";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../models/categoryModel.ts";
import { addProduct, getProducts } from "../models/productsModel.ts";
import { Context } from "../app/router.ts";


export const manageController = (ctx: Context) => {
    const { session, headers } = ctx;
    if (!session || session.access != "admin") {
        return redirect(headers, "/", `Page access is not authorized.`);
    }
    
    const categories = getCategories();
    const products = getProducts();

    return render(manageView(categories, products), ctx);
}

export const managePostController = async (ctx: Context) => {
    const { request, session, headers } = ctx;
    if (!session || session.access != "admin") {
        return redirect(headers, "/", `Page access is not authorized.`);
    }
    const formData = await request.formData();

    console.log(formData.get("manageMethod"))

    switch (formData.get("manageMethod")) {
        case "addCategory": {
            const { isValid, errors } = validateSchema(formData, addCategorySchema); 

            if (!isValid) {
                const categories = getCategories();
                const products = getProducts();
                
                return render(manageView(categories, products, errors), ctx, 400);
            }
            
            const newItem = formData.get("addCategory");
            addCategory(newItem.toString());

            return redirect(headers, "/manage", `Added ${newItem} to category.`);
        }

        case "editCategory": {
            const { isValid, errors } = validateSchema(formData, editCategorySchema); 
            
            if (!isValid) {
                const categories = getCategories();
                const products = getProducts();

                return render(manageView(categories, products, errors), ctx, 400);
            }

            const id = formData.get("editCategoryId");
            const newItem = formData.get("editCategoryNewName");
            updateCategory(id.toString(), newItem.toString());

            return redirect(headers, "/manage", `Updated a category to \"${newItem}\".`);
        }

        case "deleteCategory": {
            const { isValid, errors } = validateSchema(formData, deleteCategorySchema); 

            if (!isValid) {
                const categories = getCategories();
                const products = getProducts();

                return render(manageView(categories, products, errors), ctx, 400);
            }

            const item = formData.get("deleteCategory");
            const itemName = formData.get("deleteCategoryName");
            deleteCategory(item.toString().toLowerCase().replace(RegExp("\\s+"), "_"));

            return redirect(headers, "/manage", `Deleted ${itemName} from category.`);
        }

        case "addProduct": {
            const { isValid, errors } = validateSchema(formData, addProductSchema); 

            if (!isValid) {
                const categories = getCategories();
                const products = getProducts();

                return render(manageView(categories, products, errors), ctx, 400);
            }

            const productName = formData.get("productName");
            const productPrice = formData.get("productPrice");
            const productCategory = formData.get("productCategory");
            const productImage = formData.get("productImage") as File;

            // console.log(productName, productPrice, productCategory, productImage);
            const imageFile = await productImage.bytes();
            addProduct({
                name: productName.toString(), 
                category: productCategory.toString(), 
                price: Number.parseInt(productPrice.toString()),
                imageData: imageFile
            });

            return redirect(headers, "/manage", `Added Product \"${productName.toString()}\"`);
        }
    }
}