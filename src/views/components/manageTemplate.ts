export const manageRoutes = [
    { name: "Discounts",    route: "/manage/discounts" },
    { name: "Category",     route: "/manage/category" },
    { name: "Products",     route: "/manage/products" },
    { name: "Locations",    route: "/manage/locations" },
    { name: "Orders",       route: "/manage/orders" }
]
export const manageTemplate = (
    name: string,
    content: string,
) => {
    return `
        <section id="manage${name}" class="manageTemplate">
            <aside id="manageHeader">
                ${manageRoutes.map(m => {
                    return `
                        <a href="${m.route}">
                            <button class="${m.name != name ? "plain" : ""}">
                                ${m.name}
                            </button>
                        </a>
                    `;
                }).join("")}
            </aside>

            ${content ? `
                <section id="manageContent">
                    <h2>${name}</h2>
                    ${content}
                </section>
            ` : ""}
        </section>
    `;
}