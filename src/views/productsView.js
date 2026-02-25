const productsView = ({ request, categories, products }) => {
    let items = products.map(p => {
        return `<div class="productCard">
                    <img 
                        src="src/assets/${p.category.toLowerCase()}/${p.name.toLowerCase()}.png"
                        alt="An image of ${p.name}"
                    >
                    <p>${p.name} - ${p.price}</p>
                </div>`
    }).join("")

    console.log(categories, products)

    const checkboxItems = categories.map(c => {
        const it = c.name.toLowerCase();
        return `<input type="checkbox" id="cb-${it}" name="filter-${it}">
                <label for="cb-${it}">${c.name}</label>
                <br>
                `
    }).join("");

    if (request.method == "GET") {
        console.log("applying filter");
    }

    return `
        <div id="productsRoot">
            <section id="productsUpper">
                <section id="productsFilter">
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
                </section>
                <section id="productsCartView">
                    <p>Cart view</p>
                </section>
            </section>
            <section id="productsItemsView">
                ${items}
            </section>
        </div>
    `;
}

export default productsView;