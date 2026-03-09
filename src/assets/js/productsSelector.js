// Filter panel

const sidePanel = document.getElementById("productsSidepanel");
const filterOpen = document.getElementById("filterButton");
const filterClose = document.getElementById("filterClose");

filterOpen.addEventListener("click", () => {
    if (sidePanel.classList.contains("hidden")) sidePanel.classList.remove("hidden");
});
filterClose.addEventListener("click", () => {
    if (!sidePanel.classList.contains("hidden")) sidePanel.classList.add("hidden");
})

// Product Selector

const productItems = document.querySelectorAll(".productCard");
const productDialog = document.getElementById("productOptionsDialog");
const productTitle = document.getElementById("productTitle");
const productClose = document.getElementById("productClose");

productItems.forEach(item => {
    item.addEventListener("click", () => {
        console.log(item.dataset.name, item.dataset.price, item.dataset.category)
        productTitle.textContent = item.dataset.name;
        productDialog.showModal();
    });
});

productClose.addEventListener("click", () => {
    productDialog.close();
});