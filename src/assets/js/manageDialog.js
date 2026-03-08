const categoryItems = document.querySelectorAll(".categoryItem");

const editCategoryDialog = document.getElementById("editCategoryDialog");
const editCategoryTitle = document.getElementById("editCategoryTitle");
const editCategoryInputNew = document.getElementById("editCategoryNew");
const editCategoryInputOld = document.getElementById("editCategoryOld")

const deleteCategoryDialog = document.getElementById("deleteCategoryDialog");
const deleteDialogTitle = document.getElementById("deleteDialogTitle");
const deleteDialogInput = document.getElementById("deleteCategory");

categoryItems.forEach(category => {
    // Edit dialog
    category.children[1].children[0].addEventListener("click", () => {
        editCategoryTitle.textContent = `Editing \"${category.dataset.name}\"`
        editCategoryInputNew.value = category.dataset.name;
        editCategoryInputOld.value = category.dataset.name;
        editCategoryDialog.showModal();
    })

    // Delete dialog
    category.children[1].children[1].addEventListener("click", () => {
        deleteDialogTitle.textContent = `Are you sure you want to delete \"${category.dataset.name}\"?`
        deleteDialogInput.value = category.dataset.id;
        deleteCategoryDialog.showModal();
    });
});

deleteCategoryDialog.addEventListener("cancel", () => {
    deleteDialogTitle.textContent = "";
    deleteDialogInput.value = "";
});

deleteCategoryDialog.children[1].addEventListener("click", () => {
    console.log("closing");
    deleteCategoryDialog.close();
})
