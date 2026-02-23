const homeView = () => {
    return `
    <section id="homeRoot">
        <section id="homeContainer">
            <h1>Your grocery shopping, organized.</h1>
            <p> Keep track of everything you need to buy. Add items, set quantities, search by name, </p>
            <p>and filter by category, all in one place </p>
            <a class="toProducts" href="/products">Start Shopping → </a> 
                <section id="homeFeatures">
            <h3> Manage Items </h3>
            <p> Add, update, and remove grocery items with ease.</p>
            <h3> Search & Filter </h3>
            <p> Find items by name or browse by category instantly.</p>
            <h3> Track Quantities </h3>
            <p> Keep count of everything and never overbuy again.</p>
                </section>
        </section>
    </section>
    `;
}

export default homeView;
