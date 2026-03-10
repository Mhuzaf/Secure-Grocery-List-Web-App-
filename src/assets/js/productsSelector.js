// Filter panel

const filterButton = document.getElementById("filterButton");
const filterClose = document.getElementById("filterClose");
const filterDialog = document.getElementById("filterDialog");

console.log(filterClose);

filterButton.addEventListener("click", () => {
    filterDialog.showModal();
});

filterClose.addEventListener("click", () => {
    console.log("attempting close");
    filterDialog.close();
});

// Product Selector

const productItems = document.querySelectorAll(".productCard");
const productDialog = document.getElementById("productOptionsDialog");
const productTitle = document.getElementById("productTitle");
const productInput = document.getElementById("addToCart");
const productClose = document.getElementById("productClose");

productItems.forEach(item => {
    item.addEventListener("click", () => {
        console.log(item.dataset.name, item.dataset.price, item.dataset.category)
        productTitle.textContent = item.dataset.name;
        productInput.value = item.dataset.id;
        productDialog.showModal();
    });
});

productClose.addEventListener("click", () => {
    productDialog.close();
});

productDialog.addEventListener("cancel", () => {
    productInput.value = "";
});