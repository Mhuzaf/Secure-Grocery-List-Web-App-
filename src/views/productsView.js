const productsView = ({ products }) => {
    const items = products.map(p => {
        return `<div>${p.name} - ${p.price}</div>`
    }).join("");

    console.log(items, products)

    return `
        <div id="productsRoot">
            <aside id="productsSidepanel">
                <ul>Category
                    <li>Fruits</li>
                    <li>Vegetables</li>
                    <li>Rice</li>
                    <li>Chocolate</li>
                    <li>Sweets</li>
                </ul>
            </aside>
            <section id="productsItemsView">
                ${items}
            </section>
        </div>
    `;
}

export default productsView;