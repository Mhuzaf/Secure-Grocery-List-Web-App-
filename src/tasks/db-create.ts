import { defaultProducts } from "../app/defaults.ts";
import { createCartTable, deleteCartTable } from "../models/cartModel.ts";
import { addCategory, createCategoryTable, deleteCategoryTable } from "../models/categoryModel.ts";
import { addProduct, createProductsTable, deleteProductsTable } from "../models/productsModel.ts";
import { createSessionsTable, deleteSessionsTable } from "../models/sessionsModel.ts";
import { addUser, createUsersTable, deleteUsersTable } from "../models/userModel.ts";

// Reset
deleteCartTable();
deleteProductsTable();
deleteCategoryTable();
deleteSessionsTable();
deleteUsersTable();

// Create
createCategoryTable();
createProductsTable();
createCartTable();
createUsersTable();
createSessionsTable();

// Populate
await addUser({
    username: "admin",
    password: "12345",
    access: "admin",
    email: "support@greensmart.com",
    phoneNo: null,
    city: null,
    street: null,
    roomNo: null
});

defaultProducts.forEach((d: { category: string }) => {
    addCategory(d.category);
});

defaultProducts.forEach((d: { category: string, items: { name: string, price: number, perKg?: boolean }[] }) => {
    d.items.forEach(i => {
        const imageFile = Deno.readFileSync(`src/defaultAssets/${d.category.toLowerCase().replace(RegExp("\\s+"), "_")}/${i.name.toLowerCase()}.png`);
        addProduct({ 
            category: d.category,
            name: i.name,
            price: i.price,
            isWeighedPerKg: i.perKg ? 1 : 0,
            imageData: imageFile
        });
    });
});