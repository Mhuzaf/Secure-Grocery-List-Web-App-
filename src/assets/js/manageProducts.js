const productItems =    document.querySelectorAll(".productItem");

const addProductDialog =    document.getElementById("addProductDialog");
const addProductFilePicker = document.getElementById("addProductImage");
const addProductImageText = document.getElementById("addProductImageText");

const editProductDialog =   document.getElementById("editProductDialog");
const editProductTitle =    document.getElementById("dialogTitle-editProductDialog");
const editProductId = document.getElementById("editProductId");
const editProductOldCategory = document.getElementById("editProductOldCategory");
const editProductName = document.getElementById("editProductName");
const editProductPrice = document.getElementById("editProductPrice");
const editProductPerKg = document.getElementById("editProductPerKg");
const editProductCategory = document.getElementById("editProductCategory");
const editProductImageFilePicker = document.getElementById("editProductImage");
const editProductImageText = document.getElementById("editProductImageText");

const deleteProductDialog = document.getElementById("deleteProductDialog");
const deleteProductMsg = document.getElementById("deleteProductMsg")
const deleteProductItemName = document.getElementById("deleteProductName")
const deleteProductCategory = document.getElementById("deleteProductCategory");
const deleteProductInput = document.getElementById("deleteProduct");

if (addProductDialog.classList.contains("hasError"))
    addProductDialog.showModal();

if (editProductDialog.classList.contains("hasError"))
    editProductDialog.showModal();

productItems.forEach(product => {
    // Show button
    product.children[4].children[0].addEventListener("click", () => {
        //
    });

    // Edit button
    product.children[5].children[0].addEventListener("click", () => {
        editProductTitle.textContent = `Editing \"${product.dataset.name}\"`;
        editProductId.value = product.dataset.id;
        editProductOldCategory.value = product.dataset.category;
        editProductName.value = product.dataset.name;
        editProductPrice.value = product.dataset.price;
        if (product.dataset.perkg == "1") editProductPerKg.setAttribute("checked", "checked");
        editProductCategory.value = product.dataset.category;
        editProductDialog.showModal();
    });

    // Delete button
    product.children[6].children[0].addEventListener("click", () => {
        deleteProductMsg.textContent = `Are you sure you want to delete \"${product.dataset.name}\"?`
        deleteProductItemName.value = product.dataset.name;
        deleteProductCategory.value = product.dataset.category;
        deleteProductInput.value = product.dataset.id;
        deleteProductDialog.showModal();
    });
})

// File picker

addProductFilePicker.addEventListener("change", (e) => {
    const [file] = e.target.files;
    const { name: fileName } = file;
    addProductImageText.textContent = fileName;
});

editProductImageFilePicker.addEventListener("change", (e) => {
    const [file] = e.target.files;
    const { name: fileName } = file;
    editProductImageText.textContent = fileName;
});