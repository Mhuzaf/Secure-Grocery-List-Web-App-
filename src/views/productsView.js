import { getProducts } from "../models/productsModel.js";

const productsView = () => {
    
    const products = getProducts();
    console.log(products)

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
                <p>impl later</p>
            </section>
        </div>
    `;
}

export default productsView;