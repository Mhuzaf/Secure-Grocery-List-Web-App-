import { escape } from "@std/html/entities";
import { ErrorFragment, FormError, getErrFragments } from "../../app/errorFragments.ts";
import { Category } from "../../models/categoryModel.ts";
import { Product } from "../../models/productsModel.ts";
import { Dialog } from "../components/dialog.ts";
import { manageTemplate } from "../components/manageTemplate.ts";

export const manageProductsView = (categories: Category[], products: Product[], errors: FormError) => {

    let fragments: ErrorFragment;
    if (errors) fragments = getErrFragments(errors);
    
    console.log(errors);

    const productsMap = products.map(p => {
            return `
                <tr class="productItem"
                    data-id="${p.id}"
                    data-name="${p.name}"
                    data-price="${p.price}"
                    data-perkg="${p.averageWeight}"
                    data-category="${p.category}"
                >
                    <td class="imageCol">
                        <img
                        src="/images/${p.id}"
                        alt="${p.name}">
                    </td>
                    <td>${escape(p.name)}</td>
                    <td class="priceCol">${p.price}</td>
                    <td class="categoryCol">${p.category}</td>
                    <td class="infoCol">
                        <button class="infoProductButton plain icon" command="show-modal" commandfor="infoProductDialog">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.588 6.413Q10 5.825 10 5t.588-1.412T12 3t1.413.588T14 5t-.587 1.413T12 7t-1.412-.587M10.5 21V9h3v12z"/></svg>
                            <span>Info</span>
                        </button>
                    </td>
                    <td class="editCol">
                        <button class="editProductButton plain icon" command="show-modal" commandfor="editProductDialog">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>
                            <span>Edit</span>
                        </button>
                    </td>
                    <td class="deleteCol">
                        <button class="deleteProductButton plain icon" command="show-modal" commandfor="deleteProductDialog">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"/></svg>
                            <span>Delete</span>
                        </button>
                    </td>
                </tr>
        `}).join("");

    return `
        ${manageTemplate("Products", `
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

            ${Dialog("addProductDialog", "New Product", 
                `<form method="POST" enctype="multipart/form-data" action="/manage/products/add">
                    <section id="productGrid">
                        <label for="addProductName">Product Name</label>
                        <section>
                            <input type="text" name="addProductName", id="addProductName" placeholder="New item" ${errors ? (fragments.addProductName ? fragments.addProductName.value : "" ) : ""}>
                            ${errors ? (fragments.addProductName ? fragments.addProductName.message : "" ) : ""}
                        </section>

                        <label for="addProductPrice">Price</label>
                        <section>
                            <input type="number" name="addProductPrice" id="addProductPrice" placeholder="1" ${errors ? (fragments.addProductPrice ? fragments.addProductPrice.value : "") : ""}>
                            ${errors ? (fragments.addProductPrice ? fragments.addProductPrice.message : "") : ""}
                        </section>

                        <label for="addProductPerKg">Is weighed per kg</label>
                        <section>
                            <input type="checkbox" name="addProductPerKg" id="addProductPerKg" ${errors ? (fragments.addProductPerKg ? (fragments.addProductPerKg.value == "value=on" ? "checked" : "") : "") : ""}>
                            ${errors ? (fragments.addProductPerKg ? fragments.addProductPerKg.message : "") : ""}
                        </section>

                        <label for="addProductCategory">Category</label>
                        <section>
                            <select name="addProductCategory" id="addProductCategory">
                                ${categories.map(c => {
                                    return `<option value="${c.name}">${c.name}</option>`
                                }).join("")}
                            </select>
                        </section>

                        <label for="addProductImage">Image</label>
                        <section>
                            <div class="fileInput">
                                <input type="file" accept="image/*" name="addProductImage" id="addProductImage" ${errors ? (fragments.addProductImage ? fragments.addProductImage.value : "") : ""}>
                                <label for="addProductImage">Select file</label>
                                <p id="addProductImageText" class="productImageText"></p>
                            </div>
                            ${errors ? (fragments.addProductImage ? fragments.addProductImage.message : "") : ""}
                        </section>
                    </section>
                    <section class="dialogOptions">
                        <input type="submit" value="Confirm">
                        <button class="plain" type="button" command="close" commandfor="addProductDialog">Cancel</button>
                    </section>
                </form>`,
                errors ? (errors.formName == "addProduct" ? true : false) : false
            )}

            ${Dialog("infoProductDialog", "Product Info", `
                <p>TBI</p>
            `, null)}

            ${Dialog("editProductDialog", "Edit Product", 
                `<form method="POST" enctype="multipart/form-data" action="/manage/products/edit">
                    <input type="hidden" name="editProductId" id="editProductId" ${errors ? (fragments.editProductId ? fragments.editProductId.value : "" ) : ""}>
                    <input type="hidden" name="editProductOldCategory" id="editProductOldCategory" ${errors ? (fragments.editProductOldCategory ? fragments.editProductOldCategory.value : "" ) : ""}>
                    <section id="productGrid">
                        <label for="editProductName">Product Name</label>
                        <section>
                            <input type="text" name="editProductName", id="editProductName" ${errors ? (fragments.editProductName ? fragments.editProductName.value : "" ) : ""}>
                            ${errors ? (fragments.editProductName ? fragments.editProductName.message : "" ) : ""}
                        </section>

                        <label for="editProductPrice">Price</label>
                        <section>
                            <input type="number" name="editProductPrice" id="editProductPrice" placeholder="1" min="1" max="100" ${errors ? (fragments.editProductPrice ? fragments.editProductPrice.value : "") : ""}>
                            ${errors ? (fragments.editProductPrice ? fragments.editProductPrice.message : "") : ""}
                        </section>

                        <label for="editProductPerKg">Is weighed per kg</label>
                        <section>
                            <input type="checkbox" name="editProductPerKg" id="editProductPerKg" ${errors ? (fragments.editProductPerKg ? (fragments.editProductPerKg.value == "value=on" ? "checked" : "") : "") : ""}>
                            ${errors ? (fragments.editProductPerKg ? fragments.editProductPerKg.message : "") : ""}
                        </section>

                        <label for="editProductCategory">Category</label>
                        <section>
                            <select name="editProductCategory" id="editProductCategory">
                                ${categories.map(c => {
                                    return `<option value="${c.name}">${c.name}</option>`
                                }).join("")}
                            </select>
                        </section>

                        <label for="editProductImage">Image</label>
                        <section>
                            <div class="fileInput">
                                <input type="file" accept="image/*" name="editProductImage" id="editProductImage" ${errors ? (fragments.editProductImage ? fragments.editProductImage.value : "") : ""}>
                                <label for="editProductImage">Select file</label>
                                <p id="editProductImageText" class="productImageText"></p>
                            </div>
                            ${errors ? (fragments.editProductImage ? fragments.editProductImage.message : "") : ""}
                        </section>
                    </section>
                    <section class="dialogOptions">
                        <input type="submit" value="Confirm">
                        <button class="plain" type="button" command="close" commandfor="editProductDialog">Cancel</button>
                    </section>
                </form>`,
                errors ? (errors.formName == "editProduct" ? true : false) : false
            )}

            ${Dialog("deleteProductDialog", "Delete Product", `
                <form method="POST" action="/manage/products/delete">
                    <p id="deleteProductMsg">...</p>
                    <input type="hidden" name="deleteProductName" id="deleteProductName">
                    <input type="hidden" name="deleteProductCategory" id="deleteProductCategory">
                    <input type="hidden" name="deleteProduct" id="deleteProduct">
                    <section class="dialogOptions">
                    <input type="submit" value="Confirm">
                    <button class="plain" type="button" command="close" commandfor="deleteProductDialog">Cancel</button>
                    </section>
                </form>
            `, null)}
            <script type="module" src="/src/assets/js/manageProducts.js"></script>
        `)}
    `;
}