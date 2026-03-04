import { escape } from "@std/html/entities";
import { CategoryProps, ProductsProps } from "../app/db.ts";

export const manageView = ({ categories, products, error = { message: "" } } : { categories: CategoryProps[], products: ProductsProps[], error?: { message: string } }) => {
    
    const categoryMap = categories.map(c => {
        return `<li>
        <span>${escape(c.name)}</span>
        <section>
            <button command="show-modal" commandfor="editCategoryDialog">Edit</button>
            <button command="show-modal" commandfor="deleteCategoryDialog">Delete</button>
        <section>
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
                    <ul>
                        ${productsMap}
                    </ul>
                </section>
                
                <dialog id="editCategoryDialog" closedby="any">
                
                </dialog>

                <dialog id="deleteCategoryDialog" closedby="any">

                </dialog>
            </section>`;
}