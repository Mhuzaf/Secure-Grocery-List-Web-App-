import { escape } from "@std/html/entities";
import { CategoryProps, ProductsProps } from "../app/db.ts";

export const manageView = ({ categories, products, error = "" } : { categories: CategoryProps[], products: ProductsProps[], error?: string }) => {
    
    const categoryMap = categories.map(c => {
        return `<li>${escape(c.name)}</li>`
    }).join("");
    
    const productsMap = products.map(p => {
        return `<li>${escape(p.name)}</li>`
    }).join("");

    const errorMsg = error ? `<p class="error">${escape(error)}</p>`: "";

    return `<section id="manageRoot">
                <section id="categories">
                    <p>Manage Categories</p>
                    <form method="POST">
                    <input name="addCategory" type="text" placeholder="New Category" required>
                    <input type="submit">
                        ${errorMsg}
                        <ul>
                            ${categoryMap}
                        </ul>
                    </form>
                </section>
                <section id="products">
                    <p>Manage Products</p>
                    <ul>
                        ${productsMap}
                    </ul>
                </section>
            </section>`;
}