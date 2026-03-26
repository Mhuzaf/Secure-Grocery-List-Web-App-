import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import { Context } from "../../app/router.ts";
import { getCategories } from "../../models/categoryModel.ts";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../../models/productsModel.ts";
import { manageProductsView } from "../../views/manage/manageProductsView.ts";

export const manageProductsController = (ctx: Context) => {
    const { errors } = ctx;
    return render(manageProductsView(getCategories(), getProducts(), errors), ctx);
}

export const manageProductsAdd = async (ctx: Context, next) => {
    const { headers, isValid, validated } = ctx;

    if (!isValid) return next(ctx);

    const productName = validated.addProductName;
    const productPrice = validated.addProductPrice;
    const productPerKg = validated.addProductPerKg;
    const productCategory = validated.addProductCategory;
    const productImage = validated.addProductImage as unknown as File;

    const imageFile = await productImage.bytes();
    addProduct({
        name: productName.toString(), 
        category: productCategory.toString(), 
        price: parseInt(productPrice.toString()),
        averageWeight: productPerKg ? (productPerKg.toString() === "on" ? 1 : 0) : 0,
        imageData: imageFile
    });

    return redirect(headers, "/manage/products", `Added Product: \"${productName.toString()}\"`);
}

export const manageProductsEdit = async (ctx: Context, next) => {
    const { headers, isValid, validated } = ctx;

    if (!isValid) return next(ctx);

    console.log(validated);

    const productId = validated.editProductId;
    const productOldCategory = validated.editProductOldCategory;
    const productName = validated.editProductName;
    const productPrice = validated.editProductPrice;
    const productPerKg = validated.editProductPerKg;
    const productCategory = validated.editProductCategory;
    const productImage = validated.editProductImage as unknown as File;

    let imageFile;
    if (productImage) {
        imageFile = await productImage.bytes();
    }
    updateProduct(productOldCategory.toString(), {
        id: parseInt(productId.toString()),
        name: productName.toString(), 
        category: productCategory.toString(), 
        price: parseInt(productPrice.toString()),
        averageWeight: productPerKg ? (productPerKg.toString() === "on" ? 1 : 0) : 0,
        imageData: imageFile
    });

    return redirect(headers, "/manage/products", `Updated Product: \"${productName}\".`);
}

export const manageProductsDelete = (ctx: Context, next) => {
    const { headers, isValid, validated } = ctx;
    
    if (!isValid) return next(ctx);

    const productName = validated.deleteProductName;
    const productCategory = validated.deleteProductCategory;
    const productId = validated.deleteProduct;

    deleteProduct(parseInt(productId.toString()), productCategory.toString());

    return redirect(headers, "/manage/products", `Deleted Product: \"${productName}\".`);
}