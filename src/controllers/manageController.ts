import { render } from "../app/render.ts";
import { manageView } from "../views/manageView.ts";
import { redirect } from "../app/redirect.ts";
import { validateSchema } from "../app/validation.ts";
import { addCategorySchema, deleteCategorySchema, editCategorySchema } from "../schema/categorySchema.ts";
import { addProductSchema, deleteProductSchema, editProductSchema } from "../schema/productSchema.ts";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../models/categoryModel.ts";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../models/productsModel.ts";
import { Context } from "../app/router.ts";
import { getCities, getDistricts, LocationSortOptions } from "../models/locationsModel.ts";


export const manageController = (ctx: Context) => {
    const { session, headers } = ctx;
    if (!session || session.access != "admin") {
        return redirect(headers, "/", `Page access is not authorized.`);
    }
    return render(manageView(getCategories(), getProducts(), getCities(), getDistricts(LocationSortOptions.CITY_ASC)), ctx);
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
            const { isValid, errors } = validateSchema("addCategory", formData, addCategorySchema); 

            if (!isValid) {
                return render(manageView(getCategories(), getProducts(), getCities(), getDistricts(LocationSortOptions.CITY_ASC), errors), ctx, 400);
            }
            
            const newItem = formData.get("addCategory");
            addCategory(newItem.toString());

            return redirect(headers, "/manage", `Added Category: \"${newItem}\".`);
        }

        case "editCategory": {
            const { isValid, errors } = validateSchema("editCategory", formData, editCategorySchema); 
            
            if (!isValid) {
                return render(manageView(getCategories(), getProducts(), getCities(), getDistricts(LocationSortOptions.CITY_ASC), errors), ctx, 400);
            }

            const id = formData.get("editCategoryId");
            const newItem = formData.get("editCategoryNewName");
            updateCategory(id.toString(), newItem.toString());

            return redirect(headers, "/manage", `Updated Category: \"${newItem}\".`);
        }

        case "deleteCategory": {
            const { isValid, errors } = validateSchema("deleteCategory", formData, deleteCategorySchema); 

            if (!isValid) {
                return render(manageView(getCategories(), getProducts(), getCities(), getDistricts(LocationSortOptions.CITY_ASC), errors), ctx, 400);
            }

            const item = formData.get("deleteCategory");
            const itemName = formData.get("deleteCategoryName");
            deleteCategory(item.toString().toLowerCase().replace(RegExp("\\s+"), "_"));

            return redirect(headers, "/manage", `Deleted Category: \"${itemName}\".`);
        }

        case "addProduct": {
            const { isValid, errors } = validateSchema("addProduct", formData, addProductSchema); 
            
            if (!isValid) {
                return render(manageView(getCategories(), getProducts(), getCities(), getDistricts(LocationSortOptions.CITY_ASC), errors), ctx, 400);
            }

            const productName = formData.get("addProductName");
            const productPrice = formData.get("addProductPrice");
            const productPerKg = formData.get("addProductPerKg");
            const productCategory = formData.get("addProductCategory");
            const productImage = formData.get("addProductImage") as File;

            const imageFile = await productImage.bytes();
            addProduct({
                name: productName.toString(), 
                category: productCategory.toString(), 
                price: parseInt(productPrice.toString()),
                isWeighedPerKg: productPerKg ? (productPerKg.toString() === "on" ? 1 : 0) : 0,
                imageData: imageFile
            });

            return redirect(headers, "/manage", `Added Product: \"${productName.toString()}\"`);
        }

        case "editProduct": {
            const { isValid, errors, validated } = validateSchema("addProduct", formData, editProductSchema); 
            
            console.log(formData, validated);

            if (!isValid) {
                return render(manageView(getCategories(), getProducts(), getCities(), getDistricts(LocationSortOptions.CITY_ASC), errors), ctx, 400);
            }

            const productId = formData.get("editProductId");
            const productOldCategory = formData.get("editProductOldCategory");
            const productName = formData.get("editProductName");
            const productPrice = formData.get("editProductPrice");
            const productPerKg = formData.get("editProductPerKg");
            const productCategory = formData.get("editProductCategory");
            const productImage = formData.get("editProductImage") as File;

            let imageFile;
            if (productImage) {
                imageFile = await productImage.bytes();
            }
            updateProduct(productOldCategory.toString(), {
                id: parseInt(productId.toString()),
                name: productName.toString(), 
                category: productCategory.toString(), 
                price: parseInt(productPrice.toString()),
                isWeighedPerKg: productPerKg ? (productPerKg.toString() === "on" ? 1 : 0) : 0,
                imageData: imageFile
            });

            return redirect(headers, "/manage", `Updated Product: \"${productName}\".`);
        }
        
        case "deleteProduct": {
            const { isValid, errors } = validateSchema("deleteProduct", formData, deleteProductSchema);
            
            if (!isValid) {
                return render(manageView(getCategories(), getProducts(), getCities(), getDistricts(LocationSortOptions.CITY_ASC), errors), ctx, 400);
            }

            const productName = formData.get("deleteProductName");
            const productCategory = formData.get("deleteProductCategory");
            const productId = formData.get("deleteProduct");

            deleteProduct(parseInt(productId.toString()), productCategory.toString());

            return redirect(headers, "/manage", `Deleted Product: \"${productName}\".`);
        }

    }
}