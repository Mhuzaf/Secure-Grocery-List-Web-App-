import { escape } from "@std/html/entities";
import { CategoryProps, ProductsProps } from "../app/db.ts";

export const manageView = ({ categories, products, error = { message: "" } } : { categories: CategoryProps[], products: ProductsProps[], error?: { message: string } }) => {
    
    const categoryMap = categories.map(c => {
        const name = escape(c.name);
        const editCategoryId = `editCategory${name}Dialog`;
        const deleteCategoryId = `deleteCategory${name}Dialog`;
        return `<li>
                    <span>${name}</span>
                    <section>
                        <button command="show-modal" commandfor="${editCategoryId}">Edit</button>
                        <button command="show-modal" commandfor="${deleteCategoryId}">Delete</button>
                    <section>
                    <dialog id="${editCategoryId}" closedby="any">

                    </dialog>

                    <dialog id="${deleteCategoryId}" closedby="any">
                        <p>Are you sure you want to delete \"${name}\"?</p>
                        <button command="close" commandfor="${deleteCategoryId}">Cancel</button>
                        <form method="POST">
                            <input type="hidden" name="deleteCategory" value="${name}">
                            <input type="submit" value="Confirm">
                        </form>
                    </dialog>
                </li>`
    }).join("");
    
    const productsMap = products.map(p => {
        return `<li>${escape(p.name)}</li>`
    }).join("");

    const errorMsg = error ? `<p class="error">${escape(error.message)}</p>`: "";

    return `<section id="manageRoot">
                <section id="categories"> 
                    <p>Manage Categories</p>
                    <form method="POST">
                        <input name="addCategory" type="text" placeholder="New Category" required>
                        <input type="submit">
                    </form>
                    ${errorMsg}
                    <ul>
                        ${categoryMap}
                    </ul>
                </section>
                <div class="seperator"></div>
                <section id="products">
                    <p>Manage Products</p>
                    <form method="POST">
                        <label for="productName">New Item</label>
                        <input type="text" name="productName", id="productName" placeholder="New item">
                    </form>
                    <ul>
                        ${productsMap}
                    </ul>
                </section>
            </section>`;
}