import { CategoryProps, ProductsProps } from "../models/productsModel.ts";

const productsView = ({ categories, products } : { categories: CategoryProps[], products: ProductsProps[] }) => {
    const items = products.map(p => {
        console.log(p)

        return `<article class="productCard">
                    <img 
                        src="src/assets/${p.category.toLowerCase()}/${p.name.toLowerCase()}.png"
                        alt="An image of ${p.name}"
                    >
                    <form>
                        <input type="hidden" name="productAdd" value="${p.name}">
                        <section>
                            <span>${p.name}</span>
                            <span>AED ${p.price}</span>
                        </section>
                        <input type="submit" value="+">
                    </form>
                </article>`
    }).join("")

    console.log(categories, products)

    const checkboxItems = categories.map(c => {
        const it = c.name.toLowerCase();
        return `<input type="checkbox" id="cb-${it}" name="filter-${it}">
                <label for="cb-${it}">${c.name}</label>
                <br>
                `
    }).join("");

    return `
        <section id="productsRoot">
            <section id="productsUpper">
                <article id="productsFilter">
                    <form>
                        <input name="productSearch" type="text" placeholder="Search products..." />
                        <input type="submit" value="🔍">
                        <br><br>
                        <label>Advanced Filter</label>
                        <br>
                        ${checkboxItems}
                        <br>
                        <br>

                        <label for="priceRange">Price range</label>
                        <br>
                        <input type="range" id="priceRange" name="priceRange" min="0" max="400" step="10">
                        <br>
                        <input type="submit" value="Apply">
                    </form>
                </article>
                <article id="productsCartView">
                    <p>Cart view</p>
                </article>
            </section>
            <section id="productsItemsView">
                ${items}
            </section>
        </section>
    `;
}

export default productsView;