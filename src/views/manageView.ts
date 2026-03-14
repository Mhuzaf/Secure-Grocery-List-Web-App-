import { escape } from "@std/html/entities";
import { ErrorFragment, FormError, getErrFragments } from "../app/errorFragments.ts";
import { Category } from "../models/categoryModel.ts";
import { Product } from "../models/productsModel.ts";

export const manageView = (categories: Category[], products: Product[], errors?: FormError) => {
    
    let fragments: ErrorFragment;
    if (errors) fragments = getErrFragments(errors);

    console.log(errors);

    const categoryMap = categories.map(c => {
        const name = escape(c.name);
        return `<tr class="categoryItem"
                    data-id="${c.id}"
                    data-name="${name}"
                >
                    <td>${name}</span>
                    <td>
                        <button class="editCategoryButton">Edit</button>
                    </td>
                    <td>
                        <button class="deleteCategoryButton">Delete</button>
                    </td>
                </tr>`
    }).join("");

    const productsMap = products.map(p => {
        return `<tr>
                    <td class="imageCol">
                        <img
                        src="images/${p.id}"
                        alt="An image of ${p.name}">
                    </td>
                    <td>${escape(p.name)}</td>
                    <td class="priceCol">${p.price}</td>
                    <td class="categoryCol">${p.category}</td>
                    <td class="showCol">
                        <button class="infoProductButton">Show</button>
                    </td>
                    <td class="editCol">
                        <button class="editProductButton">Edit</button>
                    </td>
                    <td class="deleteCol">
                        <button class="deleteProductButton">Delete</button>
                    </td>
                </tr>`
    }).join("");

    return `<section id="manageRoot">
                <section id="categories">
                    <h2>Manage Categories</h2>
                    <section class="options">
                        <button id="addCategoryButton" command="show-modal" commandfor="addCategoryDialog">Add Category</button>
                        <form>
                            <label for="sortCategory">Sorting:</label>
                            <select name="sortCategory" id="sortCategory">
                                <option name="nameAsc">Name: Ascending</option>
                                <option name="nameDsc">Name: Descending</option>
                                <option name="prodAsc">Products: Ascending</option>
                                <option name="prodDsc">Products: Descending</option>
                            </select>
                            <input type="submit" value="Apply">
                        </form>
                    </section>
                    <table id="categoryTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th colspan=2>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${categoryMap}
                        </tbody>
                    </table>
                </section>
                <div class="seperator"></div>
                <section id="products">
                    <h2>Manage Products</h2>
                    <section class="options">
                        <button id="addProductButton" command="show-modal" commandfor="addProductDialog">Add Product</button>
                    </section>
                    <table id="productsTable">
                        <thead>
                            <tr>
                                <th class="imageCol">Image</th>
                                <th>Name</th>
                                <th class="priceCol">Price</th>
                                <th class="categoryCol">Category</th>
                                <th class="actionsCol" colspan=3>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productsMap}
                        </tbody>
                    </table>
                </section>
                
                <dialog id="addCategoryDialog" class="${errors ? (errors.formName == "addCategory" ? "hasError" : "") : ""}" closedby="any">
                    <p>New Category</p>
                    <form method="POST">
                        <input type="hidden" name="manageMethod" value="addCategory">
                        <input name="addCategory" id="addCategory" type="text" placeholder="New Category" ${errors ? (fragments.addCategory ? fragments.addCategory.value : "" ) : ""} required>
                        ${errors ? (fragments.addCategory ? fragments.addCategory.message : "" ) : ""}
                        <button type="button" command="close" commandfor="addCategoryDialog">Cancel</button>
                        <input type="submit" value="OK">
                    </form>
                </dialog>

                <dialog id="editCategoryDialog" closedby="any">
                    <p id="editCategoryTitle">...</p>
                    <form method="POST">
                        <input type="hidden" name="manageMethod" value="editCategory">
                        <input type="hidden" name="editCategoryId" id="editCategoryId">
                        <input name="editCategoryNewName" id="editCategoryNewName" type="text" placeholder="New Category" ${errors ? (fragments.editCategoryNewName ? fragments.editCategoryNewName.value : "" ) : ""} required>
                        <input type="submit" value="Confirm">
                    </form>
                    ${errors ? (fragments.editCategoryNewName ? fragments.editCategoryNewName.message : "" ) : ""}
                </dialog>
                
                <dialog id="deleteCategoryDialog" closedby="any">
                    <p id="deleteDialogTitle">...</p>
                    <section>
                        <button command="close" commandfor="deleteCategoryDialog">Cancel</button>
                        <form method="POST" id="deleteCategoryForm">
                            <input type="hidden" name="manageMethod" value="deleteCategory">
                            <input type="hidden" name="deleteCategoryName" id="deleteCategoryName">
                            <input type="hidden" name="deleteCategory" id="deleteCategory">
                            <input type="submit" value="Confirm">
                        </form>
                    </section>
                </dialog>

                <dialog id="addProductDialog" class="${errors ? (errors.formName == "addProduct" ? "hasError" : "") : ""}" closedby="any">
                    <form method="POST" enctype="multipart/form-data" class="productForm">
                        <input type="hidden" name="manageMethod" value="addProduct">
                        <label for="productName">Product Name</label>
                        <section>
                            <input type="text" name="productName", id="productName" placeholder="New item" ${errors ? (fragments.productName ? fragments.productName.value : "" ) : ""}>
                            ${errors ? (fragments.productName ? fragments.productName.message : "" ) : ""}
                        </section>

                        <label for="productPrice">Price</label>
                        <section>
                            <input type="number" name="productPrice" id="productPrice" placeholder="1" ${errors ? (fragments.productPrice ? fragments.productPrice.value : "") : ""}>
                            ${errors ? (fragments.productPrice ? fragments.productPrice.message : "") : ""}
                        </section>

                        <label for="productCategory">Category</label>
                        <select name="productCategory" id="productCategory">
                            ${categories.map(c => {
                                return `<option value="${c.name}">${c.name}</option>`
                            }).join("")}
                        </select>

                        <label for="productImage">Image</label>
                        <section>
                            <input type="file" accept="image/*" name="productImage" id="productImage" ${errors ? (fragments.productImage ? fragments.productImage.value : "") : ""}>
                            ${errors ? (fragments.productImage ? fragments.productImage.message : "") : ""}
                        </section>

                        <button type="button" command="close" commandfor="addProductDialog">Cancel</button>
                        <input type="submit">
                    </form>
                </dialog>

                <dialog id="infoProductDialog" closedby="any">
                </dialog>

                <dialog id="editProductDialog" closedby="any">
                </dialog>

                <dialog id="deleteProductDialog" closedby="any">
                </dialog>
            </section>
            <script type="module" src="/src/assets/js/manageDialog.js"></script>`;
}