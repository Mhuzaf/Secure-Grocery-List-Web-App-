const tabItems = document.getElementsByClassName("tabItem");
const tabViews = document.querySelectorAll(".tabView");

const tabMap = new Map();
for (let i = 0; i < tabItems.length; i++) {
    tabMap.set(tabItems[i], tabViews[i]);
    tabItems[i].addEventListener("click", () => {
        for (let j = 0; j < tabItems.length; j++) {
            tabItems[j].classList.remove("selected");
        }

        tabViews.forEach(view => {
            view.style.display = "none";
            view.classList.remove("selected");
        })

        tabItems[i].classList.add("selected");
        tabMap.get(tabItems[i]).style.display = "inline";
    })
}

const categoryItems =   document.querySelectorAll(".categoryItem");
const productItems =    document.querySelectorAll(".productItem");

const addCategoryButton =   document.getElementById("addCategoryButton");
const addCategoryDialog =   document.getElementById("addCategoryDialog");

const editCategoryDialog =          document.getElementById("editCategoryDialog");
const editCategoryTitle =           document.getElementById("dialogTitle-editCategoryDialog");
const editCategoryInputId =         document.getElementById("editCategoryId");
const editCategoryInputNewName =    document.getElementById("editCategoryNewName");

const deleteCategoryDialog =    document.getElementById("deleteCategoryDialog");
const deleteCategoryMsg =       document.getElementById("deleteCategoryMsg");
const deleteCategoryItemName =    document.getElementById("deleteCategoryName");
const deleteCategoryInput =       document.getElementById("deleteCategory");

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
const deleteProductInput = document.getElementById("deleteProduct")

if (addCategoryDialog.classList.contains("hasError"))
    addCategoryDialog.showModal();

if (editCategoryDialog.classList.contains("hasError"))
    editCategoryDialog.showModal();

if (addProductDialog.classList.contains("hasError"))
    addProductDialog.showModal();

if (editProductDialog.classList.contains("hasError"))
    editProductDialog.showModal();

addCategoryButton.addEventListener("click", () => {
    addCategoryDialog.showModal();
});

deleteCategoryDialog.children[1].addEventListener("click", () => {
    deleteCategoryDialog.close();
});

categoryItems.forEach(category => {
    // Edit button
    category.children[2].children[0].addEventListener("click", () => {
        editCategoryTitle.textContent = `Editing \"${category.dataset.name}\"`
        editCategoryInputId.value = category.dataset.id;
        editCategoryInputNewName.value = category.dataset.name;
        editCategoryDialog.showModal();
    });

    // Delete button
    category.children[3].children[0].addEventListener("click", () => {
        deleteCategoryMsg.textContent = `Are you sure you want to delete \"${category.dataset.name}\"?`
        deleteCategoryItemName.value = category.dataset.name; 
        deleteCategoryInput.value = category.dataset.id;
        deleteCategoryDialog.showModal();
    });
});

productItems.forEach(product => {
    // Show button
    product.children[4].children[0].addEventListener("click", () => {
        //
    })

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
    })

    // Delete button
    product.children[6].children[0].addEventListener("click", () => {
        deleteProductMsg.textContent = `Are you sure you want to delete \"${product.dataset.name}\"?`
        deleteProductItemName.value = product.dataset.name;
        deleteProductCategory.value = product.dataset.category;
        deleteProductInput.value = product.dataset.id;
        deleteProductDialog.showModal();
    })
})

// Reset Edit Category Dialog
editCategoryDialog.addEventListener("cancel", () => {
    editCategoryTitle.textContent = "";
    editCategoryInputId.value = "";
})

// Reset Delete Category Dialog
deleteCategoryDialog.addEventListener("cancel", () => {
    deleteCategoryMsg.textContent = "";
    deleteCategoryInput.value = "";
});

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