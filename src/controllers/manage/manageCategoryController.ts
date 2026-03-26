import { redirect } from "../../app/redirect.ts";
import { render } from "../../app/render.ts";
import { Context } from "../../app/router.ts";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../../models/categoryModel.ts";
import { manageCategoryView } from "../../views/manage/manageCategoryView.ts";

export const manageCategoryController = (ctx: Context) => {
    const { errors } = ctx;
    return render(manageCategoryView(getCategories(), errors), ctx);
}

export const manageAddCategory = (ctx: Context, next) => {    
    const { headers, isValid, validated } = ctx;
    
    if (!isValid) return next(ctx);
    
    const newItem = validated.addCategory;
    addCategory(newItem.toString());

    return redirect(headers, "/manage/category", `Added Category: \"${newItem}\".`);
}

export const manageEditCategory = (ctx: Context, next) => {
    const { headers, isValid, validated } = ctx;

    if (!isValid) return next(ctx);

    const id = validated.editCategoryId;
    const newItem = validated.editCategoryNewName;
    updateCategory(id.toString(), newItem.toString());

    return redirect(headers, "/manage/category", `Updated Category: \"${newItem}\".`);
}

export const manageDeleteCategory = (ctx: Context, next) => {
    const { headers, isValid, validated } = ctx;

    if (!isValid) return next(ctx);

    const item = validated.deleteCategory;
    const itemName = validated.deleteCategoryName;
    deleteCategory(item.toString().toLowerCase().replace(RegExp("\\s+"), "_"));

    return redirect(headers, "/manage/category", `Deleted Category: \"${itemName}\".`);
}