import { Category } from "../models/categoryModel.ts";
import { Product } from "../models/productsModel.ts";
import { Dialog } from "./components/dialog.ts";

export const productsView = (
    categories: Category[], 
    products: Product[], 
    errors,
    filterData: {
        search?: string,
        categories?: string[],
        sort?: string
    }
) => {
    console.log(errors, filterData);
    // console.log(filterData.categories["Fruits"])

    const sortOptions = ["Alphabetical", "Price: Ascending", "Price: Descending"];

    const filterView = (isSection: boolean) => {
        return `
        <form id="filterForm" class="${isSection ? "isSection" : ""}">
            ${isSection ? `<h2>Filter</h2>` : ""}
            <section>
                <span class="title">Categories</span>
                <ul id="filterList">
                    ${categories.map(c => {
                        const it = c.name.toLowerCase();
                        const isFilter = filterData ? (filterData.categories ? (filterData.categories.includes(c.name) ? "checked" : "") : "") : "";
                        return `<li>
                                    <input type="checkbox" id="cb-${it}" name="filterCategory" value="${c.name}" ${isFilter}>
                                    <label for="cb-${it}">${c.name}</label>
                                </li>`
                    }).join("")}
                <ul>
            </section>
            <section>
                <span class="title">Sort</span>
                <ul id="radioContainer">
                    ${sortOptions.map(s => {
                        const stripped = s.replace(": ", ""); // maybe regex?
                        const isFilter = filterData ? (filterData.sort ? (stripped == filterData.sort ? "checked" : "") : "") : "";
                        return `<li>
                                    <input type="radio" id="sort${stripped}" name="sortProducts" value="${stripped}" ${isFilter}>
                                    <label for="sort${stripped}">${s}</label>
                                </li>`
                    }).join("")}
                </ul>
            </section>
            <section class="dialogOptions">
                ${!isSection ? `
                    <button type="button" command="close" commandfor="filterDialog" id="filterClose">Close</button>
                ` : ""}
                <input type="submit" value="Apply">
            </section>
        </form>`;
    }

    console.log(products);

    const items = products.map(p => {
        return `<article 
                    class="productCard"
                    data-id="${p.id}"
                    data-name="${p.name}"
                    data-price="${p.price}"
                    data-category=${p.category}
                >
                    <img
                        class="productCardImage"
                        src="images/${p.id}"
                        alt="${p.name}"
                    >
                    <section>
                        <p class="productName">${p.name}</p>
                        <article>
                            <small class="productPrice">
                                Dhs. 
                                <span>${p.price}</span>
                            </small>
                            ${p.isWeighedPerKg ? `<small>per kg</small>` : ""}
                        </article>
                    </section>
                </article>`
    }).join("")

    return `
        <section id="productsRoot">
            <aside id="productsFilter">
                ${filterView(true)}
                ${Dialog("filterDialog", "Filter", filterView(false), null)}
                <section>
                    <p>discounts and ads?</p>
                </section>
            </aside>
            <section id="productsMain">
                <section id="productsUpper">
                    <form>
                        <input type="search" id="productSearch" name="productSearch" placeholder="Search products..." ${filterData ? (filterData.search ? (`value=${filterData.search}`) : "") : ""}>
                        <input type="submit" value="Search">
                    </form>
                    <button id="filterButton" class="icon" command="show-modal" commandfor="filterDialog">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20z"/></svg>
                        <span>Filter</span>
                    </button>
                    <p id="productsCount">Showing ${products.length} items</p>
                </section>
                 <section id="productsItemsView">
                    ${items}
                </section>
            </section>
            
            ${Dialog("productOptionsDialog", "Product", `
                <p id="productTitle">...</p>
                <form method="POST">
                    <input type="hidden" name="productPostMethod" value="addToCart">
                    <input type="hidden" name="addToCart" id="addToCart">
                    <input type="hidden" name="addToCartId" id="addToCartId">
                    <input type="submit" value="Add to Cart">
                </form>
                <button id="productClose" command="close" commandfor="productOptionsDialog">Close</button>
            `, null)}
        </section>
        <script type="module" src="/src/assets/js/products.js"></script>
    `;
}