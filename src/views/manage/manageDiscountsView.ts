import { ErrorFragment, FormError, getErrFragments } from "../../app/errorFragments.ts";
import { manageTemplate } from "../components/manageTemplate.ts";

export const manageDiscountsView = (errors: FormError) => {
    let fragments: ErrorFragment;
    if (errors) fragments = getErrFragments(errors);

    console.log(errors);

    return `
        ${manageTemplate("Discounts", `
            <p>Manage Discounts (TBI)</p>    
        `)}

        <script type="module" src="/src/assets/js/manageDiscounts.js"></script>
    `;
}