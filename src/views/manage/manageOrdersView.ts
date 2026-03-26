import { ErrorFragment, getErrFragments } from "../../app/errorFragments.ts";
import { manageTemplate } from "../components/manageTemplate.ts";

export const manageOrdersView = (errors) => {
    let fragments: ErrorFragment;
    if (errors) fragments = getErrFragments(errors);
    
    console.log(errors);    

    return `
        ${manageTemplate("Orders", `
            <p>Manage Orders (TBI)</p>
        `)}

        <script type="module" src="/src/assets/js/manageOrders.js"></script>
    `;
}