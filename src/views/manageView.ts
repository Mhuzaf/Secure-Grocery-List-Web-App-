import { CategoryProps, ProductsProps } from "../models/productsModel.ts";

export const manageView = ({ categories, products } : { categories: CategoryProps[], products: ProductsProps[] }) => {
    
    const categoryMap = categories.map(c => {
        return `<li>${c.name}</li>`
    }).join("");
    
    const productsMap = products.map(p => {
        return `<li>${p.name}</li>`
    }).join("");

    return `<section id="manageRoot">
                <section id="categories">
                    <p>Manage Categories</p>
                    <ul>
                        ${categoryMap}
                    </ul>
                </section>
                <section id="products">
                    <p>Manage Products</p>
                    <ul>
                        ${productsMap}
                    </ul>
                </section>
            </section>`;
}