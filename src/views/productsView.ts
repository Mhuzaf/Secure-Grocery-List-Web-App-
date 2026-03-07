import { CategoryProps } from "../interfaces/categoryInterface.ts";
import { ProductsProps } from "../interfaces/productsInterface.ts";

const sortOptions = ["Default", "Price: Ascending", "Price: Descending", "Alphabetical"];

export const productsView = ({ categories, products } : { categories: CategoryProps[], products: ProductsProps[] }) => {
    
    const filterFormView = () => {
        return `<form class="filterForm">
                    <section>
                        <span class="title">Advanced Filter</span>
                        <ul id="filterList">
                            ${categories.map(c => {
                                console.log(c);
                                const it = c.name.toLowerCase();
                                return `<li>
                                            <input type="checkbox" id="cb-${it}" name="filter-${it}">
                                            <label for="cb-${it}">${c.name}</label>
                                        </li>`
                            }).join("")}
                        <ul>
                    </section>
                    <section>
                        <label for="priceRange" class="title">Price range</label>
                        <input type="range" id="priceRange" name="priceRange" min="0" max="400" step="10">    
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
                    <input type="submit" value="Apply">
                </form>`
    }

    const items = products.map(p => {
        // console.log(p.image_data);
        return `<article class="productCard">
                    <img 
                        src="images/${p.id}"
                        alt="An image of ${p.name}"
                    >
                    <form>
                        <input type="hidden" name="productAdd" value="${p.name}">
                        <section>
                            <p class="productName">${p.name}</p>
                            <p class="productPrice">AED ${p.price} ${p.category_id.toLowerCase() == "fruits" || p.category_id.toLowerCase() == "vegetables" ? "per kg" : ""}</p>
                        </section>
                        <input type="submit" value="Add to Cart">
                    </form>
                </article>`
    }).join("")

    console.log(products);

    return `
        <section id="productsRoot">
            <section id="productsUpper">
                <form>
                    <input name="productSearch" type="text" placeholder="Search products..." />
                    <input type="submit" value="Search">
                </form>
            </section>
            <section id="productsMiddle">
                <article id="productsFilter">
                    ${filterFormView()}
                </article>
                <article id="productsCartView">
                    <p>Your Cart</p>
                </article>
            </section>
            <section id="productsMobileView">
                <button id="filterButton" command="show-modal" commandfor="filterDialog">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20z"/></svg>
                    <span>Filter</span>
                </button>
                <button id="cartButton" command="show-modal" commandfor="cartDialog">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.588 21.413Q5 20.825 5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22t-1.412-.587m10 0Q15 20.825 15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22t-1.412-.587M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"/></svg>
                    <span>View Cart</span>
                </button>
            </section>
            <section id="productsItemsView">
                ${items}
            </section>

            <dialog id="filterDialog" closedby="any">
                ${filterFormView()}
            </dialog>
            
            <dialog id="cartDialog">
            </dialog>

            <dialog id="productOptionsDialog" closedby="any">
            </dialog>
        </section>
        <script type="module" src="/src/assets/js/productsSelector.js"></script>
    `;
}