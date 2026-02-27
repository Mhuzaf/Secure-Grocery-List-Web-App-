import { Title } from "../app/common.js";

const features = [
    {
        title: "Manage Items",
        desc: "Add, update, and remove grocery items with ease."
    },
    {
        title: "Search & Filter",
        desc: "Find items by name or browse by category instantly."
    },
    {
        title: "Track Quantities",
        desc: "Keep count of everything and never overbuy again."
    }
]

const featuresMap = features.map(f => {
    return `<section class="featureCard">
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
            </section>
    `
}).join("");

const homeView = () => {
    return `
    <section id="homeRoot">
        <section id="homeContainer">
            <h1>${Title}</h1>
            <h2>Your grocery shopping, organized.</h2>
            <p class="desc">Keep track of everything you need to buy. Add items, set quantities, 
            search by name, and filter by category, all in one place. </p>
            <a class="toProducts" href="/products">Start Shopping → </a> 
            <section id="homeFeatures">
                ${featuresMap}
            </section>
        </section>
    </section>
    `;
}

export default homeView;
