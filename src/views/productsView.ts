import { CategoryProps, ProductsProps } from "../app/db.ts";

export const productsView = ({ categories, products } : { categories: CategoryProps[], products: ProductsProps[] }) => {
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
                            <span class="productName">${p.name}</span>
                            <span class="productPrice">AED ${p.price}</span>
                        </section>
                        <input type="submit" value="Add to Cart">
                    </form>
                </article>`
    }).join("")

    console.log(categories, products);

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
                        <br><br>
                        <label>Advanced Filter</label>
                        <br>
                        ${checkboxItems}
                        <br>
                        <label for="priceRange">Price range</label>
                        <br>
                        <input type="range" id="priceRange" name="priceRange" min="0" max="400" step="10">
                        <br>
                        <input type="submit" value="Apply">
                    </form>
                </article>
                <article id="productsCartView">
                    <p>Your Cart</p>
                </article>
            </section>
            <section id="productsMobileView">
                <button id="filterButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20z"/></svg>
                    <span>Filter</span>
                </button>
                <button id="cartButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.588 21.413Q5 20.825 5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22t-1.412-.587m10 0Q15 20.825 15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22t-1.412-.587M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"/></svg>
                    <span>View Cart</span>
                </button>
            </section>
            <section id="productsItemsView">
                ${items}
            </section>
        </section>
    `;
}