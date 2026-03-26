import { redirect } from "../app/redirect.ts";
import { render } from "../app/render.ts";
import { Context } from "../app/router.ts";
import { addToCart } from "../models/cartModel.ts";
import { getCategories } from "../models/categoryModel.ts";
import { getProducts } from "../models/productsModel.ts";
import { getUser } from "../models/userModel.ts";
import { productsView } from "../views/productsView.ts";

export const productsController = (ctx: Context) => {
    const { request, errors } = ctx;
    const url = new URL(request.url);

    const categories = getCategories();
    let products = getProducts();

    const filterData: {
        search?: string,
        categories?: string[],
        sort?: string
    } = {};

    if (url.searchParams.has("sortProducts") && url.searchParams.get("sortProducts") != "") {
        filterData.sort = url.searchParams.get("sortProducts");
    } else filterData.sort = "Alphabetical";

    if (url.searchParams.has("productSearch") && url.searchParams.get("productSearch") != "") {
        const search = url.searchParams.get("productSearch");
        
        products = products.filter((p) => {
            return p.name.toLowerCase().includes(search);
        });
        filterData.search = search;
    } 
    
    if (url.searchParams.has("filterCategory") && url.searchParams.get("filterCategory") != "") {
        const items = url.searchParams.getAll("filterCategory");
        const filteredCategory = [];
        items.forEach(i =>
            filteredCategory.push(...products.filter(p => p.category.includes(i)))
        );
        products = filteredCategory;
        filterData.categories = items.map(i => i);
    }

    // filterData.sort is already available, so sort last
    if (filterData.sort == "PriceAscending") {
        products = products.sort((a, b) => {
            return a.price - b.price;
        });
    } else if (filterData.sort == "PriceDescending") {
        products = products.sort((a, b) => {
            return b.price - a.price;
        });
    }

    return render(productsView(categories, products, errors, filterData), ctx);
}

export const productsPostController = (ctx: Context, next) => {
    const { session, headers, isValid, validated } = ctx;
    
    if (!isValid) return next(ctx);

    const user = getUser(session.username);
    addToCart(parseInt(validated.addToCartId.toString()), user.userId, parseInt(validated.productQuantity));

    return redirect(headers, "/products", `Added \"${validated.addToCart}\" to cart.`);
}