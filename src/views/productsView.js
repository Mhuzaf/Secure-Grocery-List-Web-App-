const productsView = () => {
    
    const product = `<article class="productCard">
                    <p>image</p>
                    <p>item name</p>
                    <p>price</p>
                </article>`;

    let products = "";
    for (let i = 0; i < 50; i++) {
        products += product;   
    }

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
                ${products}
            </section>
        </div>
    `;
}

export default productsView;