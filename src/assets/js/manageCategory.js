const categoryItems =   document.querySelectorAll(".categoryItem");

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

if (addCategoryDialog.classList.contains("hasError"))
    addCategoryDialog.showModal();

if (editCategoryDialog.classList.contains("hasError"))
    editCategoryDialog.showModal();

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