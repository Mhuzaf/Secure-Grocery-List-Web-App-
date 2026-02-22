const productsView = ({ products }) => {
    let items = products.map(p => {
        return `<div class="productCard" >${p.name} - ${p.price}</div>`
    }).join("")

    console.log(items, products)

    for (let i = 0; i < 10; i++) {
        items += "<div class=\"productCard\">dummy items</div>";
    }

    // TODO: replace with db categories when finished
    const categories = [
        "Fruits", 
        "Vegetables", 
        "Rice",
        "Chocolate",
        "Sweets", 
    ];

    const checkboxItems = categories.map(c => {
        let it = c.toLowerCase();
        return `
        <input type="checkbox" id="cb-${it}" name="filter-${it}">
        <label for="cb-${it}">${c}</label>
        <br>
        `
    }).join("");

    return `
        <div id="productsRoot">
            <aside id="productsFilter">
                <h3>Search</h3>
                <form>
                    <input name="productSearch" type="text" placeholder="Search products..." />
                    <input type="submit">
                    <br><br>
                    <h3>Advanced Filter</h3>
                    ${checkboxItems}
                    <br>
                    <br>

                    <label for="priceRange">Price range</label>
                    <input type="range" id="priceRange" name="priceRange" min="0" max="400" step="10">
                </form>
            </aside>
            <section id="productsItemsView">
                <div class="productCard">
                    <img src="src/assets/img/apple.png">
                    <p>apple - 0.42</p>
                </div>
                ${items}
            </section>
        </div>
    `;
}

export default productsView;