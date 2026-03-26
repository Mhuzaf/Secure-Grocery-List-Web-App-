import { ErrorFragment, FormError, getErrFragments } from "../../app/errorFragments.ts";
import { City, District } from "../../models/locationsModel.ts";
import { Dialog } from "../components/dialog.ts";
import { manageTemplate } from "../components/manageTemplate.ts";

export const manageLocationsView = (cities: City[], districts: District[], errors: FormError) => {
    let fragments: ErrorFragment;
    if (errors) fragments = getErrFragments(errors);

    console.log(errors);    

    const citiesMap = cities.map(city => {
            return `
                <tr>
                    <td>${city.city}</td>
                    <td>
                        <button class="editCityButton plain icon">
                            Edit
                        </button>
                    </td>
                    <td>
                        <button class="deleteCityButton plain icon">
                            Delete
                        </button>
                    </td>
                </tr>
            `
        }).join("");
    
        const districtsMap = districts.map(districts => {
            return `
                <tr>
                    <td>${districts.district}</td>
                    <td>${districts.city}</td>
                    <td>
                        <button class="editDistrictButton plain icon">
                            Edit
                        </button>
                    </td>
                    <td>
                        <button class="deleteDistrictButton plain icon">
                            Delete
                        </button>
                    </td>
                </tr>
            `
        }).join("");

    return `
        ${manageTemplate("Locations", `
            <section class="options">
                <button id="addLocationButton" command="show-modal" commandfor="addLocationDialog">Add Location</button>
            </section>
            <table id="citiesTable">
                <thead>
                    <tr>
                        <th>City</th>
                        <th colspan=2>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${citiesMap}
                </tbody>
            </table>
            <table id="districtsTable">
                <thead>
                    <tr>
                        <th>District</th>
                        <th>City</th>
                        <th colspan=2>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${districtsMap}
                </tbody>
            </table>

            ${Dialog("addLocationDialog", "Add Location", `
                <p>TBI</p>    
            `, false)}
            <script type="module" src="/src/assets/js/manageLocations.js"></script> 
        `)}
    `;
}