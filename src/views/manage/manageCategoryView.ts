import { escape } from "@std/html/entities";
import { ErrorFragment, FormError, getErrFragments } from "../../app/errorFragments.ts";
import { Category } from "../../models/categoryModel.ts";
import { Dialog } from "../components/dialog.ts";
import { manageTemplate } from "../components/manageTemplate.ts";

export const manageCategoryView = (categories: Category[], errors: FormError) => {        
    let fragments: ErrorFragment;
    if (errors) fragments = getErrFragments(errors);

    console.log(errors);

    const categoryMap = categories.map(c => {
        return `
            <tr class="categoryItem"
                data-id="${c.id}"
                data-name="${escape(c.name)}"
            >
                <td>${escape(c.name)}</td>
                <td class="amountCol">${c.amount}</td>
                <td>
                    <button class="editCategoryButton plain">Edit</button>
                </td>
                <td>
                    <button class="deleteCategoryButton plain">Delete</button>
                </td>
            </tr>
    `}).join("");

    return `
        ${manageTemplate("Category", `
            <section class="options">
                <button id="addCategoryButton" command="show-modal" commandfor="addCategoryDialog">Add Category</button>
                <form>
                    <label for="sortCategory">Sorting:</label>
                    <select name="sortCategory" id="sortCategory">
                        <option name="nameAsc">Name: Ascending</option>
                        <option name="nameDsc">Name: Descending</option>
                        <option name="prodAsc">Products: Ascending</option>
                        <option name="prodDsc">Products: Descending</option>
                    </select>
                    <input type="submit" value="Apply">
                </form>
            </section>

            <table id="categoryTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th colspan=2>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${categoryMap}
                </tbody>
            </table>

            ${Dialog("addCategoryDialog", "New Category",
                `<form method="POST" action="/manage/category/add">
                    <input name="addCategory" id="addCategory" type="text" placeholder="New Category" ${errors ? (fragments.addCategory ? fragments.addCategory.value : "" ) : ""} required>
                    ${errors ? (fragments.addCategory ? fragments.addCategory.message : "" ) : ""}
                    <section class="dialogOptions">
                        <input type="submit" value="Confirm">
                        <button class="plain" type="button" command="close" commandfor="addCategoryDialog">Cancel</button>
                    </section>
                </form>`,
                errors ? (errors.formName == "addCategory" ? true : false) : false
            )}

            ${Dialog("editCategoryDialog", "...",
                `<form method="POST" action="/manage/category/edit">
                    <input type="hidden" name="editCategoryId" id="editCategoryId">
                    <input name="editCategoryNewName" id="editCategoryNewName" type="text" placeholder="New Category" ${errors ? (fragments.editCategoryNewName ? fragments.editCategoryNewName.value : "" ) : ""} required>
                    ${errors ? (fragments.editCategoryNewName ? fragments.editCategoryNewName.message : "" ) : ""}
                    <section class="dialogOptions">
                        <input type="submit" value="Confirm">
                        <button class="plain" type="button" command="close" commandfor="editCategoryDialog">Cancel</button>
                    </section>
                </form>`,
                errors ? (errors.formName == "editCategory" ? true : false) : false
            )}
            
            ${Dialog("deleteCategoryDialog", "Delete Category",
                `<form method="POST" action="/manage/category/delete">
                    <p id="deleteCategoryMsg">...</p>
                    <input type="hidden" name="deleteCategoryName" id="deleteCategoryName">
                    <input type="hidden" name="deleteCategory" id="deleteCategory">
                    <section class="dialogOptions">
                        <input type="submit" value="Confirm">
                        <button class="plain" type="button" command="close" commandfor="deleteCategoryDialog">Cancel</button>
                    </section>
                </form>`,
                null
            )}
        `)}
        <script type="module" src="/src/assets/js/manageCategory.js"></script>
    `;
}