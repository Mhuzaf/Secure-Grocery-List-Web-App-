import { escape } from "@std/html/entities";
import { CategoryProps } from "../interfaces/categoryInterface.ts";
import { ProductsProps } from "../interfaces/productsInterface.ts";
import { getErrFragments } from "../app/errorFragments.ts";

// deno-lint-ignore no-explicit-any
export const manageView = (categories: CategoryProps[], products: ProductsProps[], errors?: any) => {
    let fragments;
    if (errors) fragments = getErrFragments(errors);

    const categoryMap = categories.map(c => {
        const id = escape(c.id);
        const name = escape(c.name);
        return `<li class="categoryItem"
                    data-id="${id}"
                    data-name="${name}"
                >
                    <span>${name}</span>
                    <section>
                        <button class="editCategoryButton">Edit</button>
                        <button class="deleteCategoryButton">Delete</button>
                    </section>
                </li>`
    }).join("");
    
    const productsMap = products.map(p => {
        return `<li>${escape(p.name)}</li>`
    }).join("");

    console.log(errors);

    return `<section id="manageRoot">
                <section id="categories"> 
                    <p>Manage Categories</p>
                    <form method="POST">
                        <input name="addCategory" id="editCategory" type="text" placeholder="New Category" ${errors ? (fragments.addCategory ? fragments.addCategory.value : "" ) : ""} required>
                        <input type="submit">
                    </form>
                    ${errors ? (fragments.addCategory ? fragments.addCategory.message : "" ) : ""}
                    <ul>
                        ${categoryMap}
                    </ul>
                </section>
                <div class="seperator"></div>
                <section id="products">
                    <p>Manage Products</p>
                    <form method="POST" enctype="multipart/form-data" class="productForm">
                        <label for="addProductName">Product Name</label>
                        <section>
                            <input type="text" name="addProductName", id="addProductName" placeholder="New item" ${errors ? (fragments.addProductName ? fragments.addProductName.value : "" ) : ""}>
                            ${errors ? (fragments.addProductName ? fragments.addProductName.message : "" ) : ""}
                        </section>

                        <label for="productPrice">Price</label>
                        <section>
                            <input type="number" name="productPrice" id="productPrice" placeholder="1" ${errors ? (fragments.productPrice ? fragments.productPrice.value : "") : ""}>
                            ${errors ? (fragments.productPrice ? fragments.productPrice.message : "") : ""}
                        </section>

                        <label for="productCategory">Category</label>
                        <select name="productCategory" id="productCategory">
                            ${categories.map(c => {
                                return `<option value="${c.id}">${c.name}</option>`
                            }).join("")}
                        </select>

                        <label for="productImage">Image</label>
                        <section>
                            <input type="file" name="productImage" id="productImage" ${errors ? (fragments.productImage ? fragments.productImage.value : "") : ""}>
                            ${errors ? (fragments.productImage ? fragments.productImage.message : "") : ""}
                        </section>

                        <input type="submit">
                    </form>
                    <ul>
                        ${productsMap}
                    </ul>
                </section>
            </section>
            <dialog id="editCategoryDialog" closedby="any">
                <p id="editCategoryTitle">...</p>
                <form method="POST">
                    <input name="editCategoryNew" id="editCategoryNew" type="text" placeholder="New Category" ${errors ? (fragments.addCategory ? fragments.addCategory.value : "" ) : ""} required>
                    <input type="hidden" name="editCategoryOld" id="editCategoryOld">
                    <input type="submit" value="Confirm">
                </form>
                ${errors ? (fragments.addCategory ? fragments.addCategory.message : "" ) : ""}
            </dialog>
            <dialog id="deleteCategoryDialog" closedby="any">
                <p id="deleteDialogTitle">...</p>
                <button command="close" commandfor="deleteCategoryDialog">Cancel</button>
                <form method="POST" id="deleteCategoryForm">
                    <input type="hidden" name="deleteCategory" id="deleteCategory">
                    <input type="submit" value="Confirm">
                </form>
            </dialog>
            <script type="module" src="/src/assets/js/manageDialog.js"></script>`;
}