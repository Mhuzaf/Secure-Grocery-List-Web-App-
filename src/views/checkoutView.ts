import { ErrorFragment, FormError, getErrFragments } from "../app/errorFragments.ts";
import { CartItem } from "../models/cartModel.ts";
import { City, District } from "../models/locationsModel.ts";
import { Product } from "../models/productsModel.ts";
import { UserProps } from "../models/userModel.ts";

export const checkoutView = (user: UserProps, cartItems: CartItem[], products: Product[], cities: City[], districts: District[],
    totalData: {
        subTotal: number,
        shipping: number,
        coupon?: number
    },
    errors: FormError
) => {

    let fragments: ErrorFragment;
    if (errors) fragments = getErrFragments(errors);
    
    console.log(fragments);

    const formSection = (id: string, label: string, value, errorValue, errorMsg) => {
        return `
            <div class="formSection">
                <label for="${id}">${label}</label>
                <input type="text" name="${id}" id="${id}" ${errorValue ? errorValue : `value="${value}"`}">
                ${errorMsg}
            </div>
        `;
    }

    const cityDistrictsMap = cities.map(city => {
        return `<optgroup label="${city.city}">
                    ${districts.map(dist => {
                        if (dist.city == city.city)
                            return `<option name="${dist.district}">${dist.district}</option>`
                    })}
                </optgroup>`
    }).join("");

    const cartItemsMap = products.map(p => {
        const qty = cartItems.find(c => c.productId == p.id).quantity;
        return `
            <article class="item">
                <img 
                    src="/images/${p.id}"
                    alt="${p.name}"
                >
                <div class="nameQty">
                    <div class="name">${p.name}</div>
                    <div class="qty">x ${qty}</div>
                </div>
                <div class="subTotal priceFont">
                    Dhs. ${p.averageWeight != 0 ? (
                        ((qty * p.averageWeight) / 1000 * p.price).toFixed(2)
                    ) : p.price * qty}
                </div>
            </article>
        `;
    }).join("");

    return `
        <section id="checkoutRoot">                
            <form id="main" method="POST">
                <section id="contact">
                    <h2>Contact</h2>
                    <div class="content">
                        <div class="container">
                            ${formSection(
                                "firstName", "First Name", user.firstName,
                                errors ? (fragments.firstName ? fragments.firstName.value : null ) : null,
                                errors ? (fragments.firstName ? fragments.firstName.message : "" ) : ""
                            )}
                            ${formSection(
                                "lastName", "Last Name", user.lastName,
                                errors ? (fragments.lastName ? fragments.lastName.value : null ) : null,
                                errors ? (fragments.lastName ? fragments.lastName.message : "" ) : ""
                            )}
                        </div>
                        
                        ${formSection(
                            "email", "Email", user.email,
                            errors ? (fragments.email ? fragments.email.value : null ) : null,
                            errors ? (fragments.email ? fragments.email.message : "" ) : ""
                        )}

                        ${formSection(
                            "phoneNo", "Phone No.", user.phoneNo,
                            errors ? (fragments.phoneNo ? fragments.phoneNo.value : null ) : null,
                            errors ? (fragments.phoneNo ? fragments.phoneNo.message : "" ) : ""
                        )}
                    </div>
                </section>
                <section id="shipping">
                    <h2>Shipping</h2>
                    <div class="content">
                        <div class="formSection">
                            <label for="citydistrict">City/District</label>
                            <select name="citydistrict" id="citydistrict">
                                ${cityDistrictsMap}
                            </select>
                        </div>

                        ${formSection(
                            "street", "Street", user.street,
                            errors ? (fragments.street ? fragments.street.value : null ) : null,
                            errors ? (fragments.street ? fragments.street.message : "" ) : ""
                        )}

                        ${formSection(
                            "roomNo", "Room No.", user.roomNo,
                            errors ? (fragments.roomNo ? fragments.roomNo.value : null ) : null,
                            errors ? (fragments.roomNo ? fragments.roomNo.message : "" ) : ""
                        )}
                    </div>
                </section>
                <section id="billing">
                    <h2>Billing</h2>
                    <div class="content">
                        ${formSection(
                            "card16", "16-digit Card Number", user.card16 ? user.card16 : "",
                            errors ? (fragments.card16 ? fragments.card16.value : null ) : null,
                            errors ? (fragments.card16 ? fragments.card16.message : "" ) : ""
                        )}

                        ${formSection(
                            "card3", "3-digit Passcode", user.card3 ? user.card3 : "",
                            errors ? (fragments.card3 ? fragments.card3.value : null ) : null,
                            errors ? (fragments.card3 ? fragments.card3.message : "" ) : ""
                        )}
                    </div>
                </section>
                <input id="checkoutSubmit" class="big" type="submit" value="Place Order">
            </form>
            <details id="totalSection" open>
                <summary>
                    <header>
                        <img
                            id="detailsIcon"
                            src="src/assets/chev_down.svg"
                        >
                        <h2>Total</h2>
                    </header>
                    <a href="/cart">
                        <button>Back to Cart</button>
                    </a>
                </summary>
                <div id="cartItems">
                    ${cartItemsMap}
                </div>
                
                <form method="POST">
                    <label for="coupon">
                        <input type="text" name="coupon" placeholder="Enter coupon">
                    </label>
                    <input type="submit" value="Apply">
                </form>

                <div id="totals">
                    <div class="totalItem">
                        <span>Subtotal (${cartItems.length})</span>
                        <p class="priceFont">Dhs. ${totalData.subTotal.toFixed(2)}</p>
                    </div>
                    <div class="totalItem">
                        <span>Shipping</span>
                        <p class="priceFont">Dhs. ${totalData.shipping}</p>
                    </div>
                    ${totalData.coupon ? `
                        <div class="totalItem">
                            <span>Coupon</span>
                            <p class="priceFont">Dhs. ${totalData.coupon}</p>
                        </div>
                    ` : ""}
                    <div class="seperator"></div>
                    <div class="totalItem">
                        <span>Total</span>
                        <p class="priceFont">Dhs. ${(totalData.subTotal + totalData.shipping).toFixed(2)}</p>
                    </div>
                </div>
            </details>
        </section>
    `;
}