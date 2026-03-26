import { defaultLocations, defaultProducts } from "../app/defaults.ts";
import { createCartTable, deleteCartTable } from "../models/cartModel.ts";
import { addCategory, createCategoryTable, deleteCategoryTable } from "../models/categoryModel.ts";
import { addCity, addDistrict, createCityTable, createDistrictsTable, deleteCityTable, deleteDistrictsTable } from "../models/locationsModel.ts";
import { addProduct, createProductsTable, deleteProductsTable } from "../models/productsModel.ts";
import { createSessionsTable, deleteSessionsTable } from "../models/sessionsModel.ts";
import { addUser, createUsersTable, deleteUsersTable } from "../models/userModel.ts";

// Reset
deleteCartTable();
deleteProductsTable();
deleteCategoryTable();
deleteSessionsTable();
deleteUsersTable();
deleteDistrictsTable();
deleteCityTable();

// Create
createCategoryTable();
createProductsTable();
createCartTable();
createCityTable();
createDistrictsTable();
createSessionsTable();
createUsersTable();

defaultLocations.forEach(d => {
    addCity(d.city);
    d.districts.forEach(dis => {
        addDistrict(dis, d.city);
    });
});

// Populate
await addUser({
    username: "admin",
    password: "12345",
    access: "admin",
    firstName: "GreensMart",
    lastName: "Admin",
    email: "support@greensmart.com",
    phoneNo: null,
    city: null,
    district: null,
    street: null,
    roomNo: null
});

defaultProducts.forEach(d => {
    addCategory(d.category);
});

defaultProducts.forEach(d => {
    d.items.forEach(i => {
        const productName = i.fileName || i.name.toLowerCase();
        const imageFile = Deno.readFileSync(`src/defaultAssets/${d.category.toLowerCase().replace(RegExp("\\s+"), "_")}/${productName}.png`);
        addProduct({ 
            category: d.category,
            name: i.name,
            price: i.price,
            averageWeight: i.avgWeight ? i.avgWeight : 0,
            imageData: imageFile
        });
    });
});