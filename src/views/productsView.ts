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
        priceRange?: string,
        sort?: string
    }
) => {
    console.log(errors, filterData);
    // console.log(filterData.categories["Fruits"])

    const sortOptions = ["Alphabetical", "Price: Ascending", "Price: Descending"];

    const filterView = (isSection: boolean) => {
        return `
        <form id="filterForm" class="${isSection ? "isSection" : ""}">
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
                <label for="priceRange" class="title">Price range</label>
                <input type="range" id="priceRange" name="priceRange" min="0" max="400" step="10" value="0">    
            </section>
            <section>
                <span class="title">Sort</span>
                <ul id="radioContainer">
                    ${sortOptions.map(s => {
                        const stripped = s.replace(": ", ""); // maybe regex?
                        return `<li>
                                    <input type="radio" id="sort${stripped}" name="sortProducts" value="${stripped}">
                                    <label for="sort${stripped}">${s}</label>
                                </li>`
                    }).join("")}
                </ul>
            </section>
            <section id="filterDialogOptions">
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
                        alt="An image of ${p.name}"
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
            <aside id="productsFilter" class="hidden">
                ${filterView(true)}
                ${Dialog("filterDialog", "Filter", filterView(false), null)}
            </aside>
            <section id="productsMain">
                <section id="productsUpper">
                    <form>
                        <input type="search" name="productSearch" placeholder="Search products..." ${filterData ? (filterData.search ? (`value=${filterData.search}`) : "") : ""}>
                        <input type="submit" value="Search">
                    </form>
                    <section id="productsOptions">
                        <button id="filterButton" class="icon" command="show-modal" commandfor="filterDialog">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20z"/></svg>
                            <span>Filter</span>
                        </button>
                        <button id="cartButton" class="icon" command="show-modal" commandfor="cartDialog">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.588 21.413Q5 20.825 5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22t-1.412-.587m10 0Q15 20.825 15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22t-1.412-.587M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"/></svg>
                            <span>View Cart</span>
                        </button>
                    </section>
                </section>
                 <section id="productsItemsView">
                    ${items}
                </section>
            </section>
            
            ${Dialog("cartDialog", "Your Cart",`
                <p>TBI</p>    
            `, null)}

            ${Dialog("productOptionsDialog", "Product", `
                <p id="productTitle">...</p>
                <form method="POST">
                    <input type="hidden" name="addToCart" id="addToCart">
                    <input type="submit" value="Add to Cart">
                </form>
                <button id="productClose" command="close" commandfor="productOptionsDialog">Close</button>
            `, null)}
        </section>
        <script type="module" src="/src/assets/js/productsSelector.js"></script>
    `;
}