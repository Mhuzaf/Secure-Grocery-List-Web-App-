import { ErrorFragment, getErrFragments } from "../../app/errorFragments.ts";
import { City, District } from "../../models/locationsModel.ts";
import { UserProps } from "../../models/userModel.ts";

export const registerView = (cities: City[], districts: District[], errors?) => {
    let fragments: ErrorFragment;
    if (errors) fragments = getErrFragments(errors);

    const cityDistrictsMap = cities.map(city => {
        return `<optgroup label="${city.city}">
                    ${districts.map(dist => {
                        if (dist.city == city.city)
                            return `<option name="${dist.district}">${dist.district}</option>`
                    })}
                </optgroup>`
    }).join("");

    const formSection = (label: string, input: string) => {
        return `
            <div class="formSection">
                ${label}
                <div>
                    ${input}
                </div>
            </div>
        `;
    }

    // TODO: add min and max.
    return `
        <section id="registerRoot">
            <article>
                <h2>Register</h2>

                <p id="authSwitch">
                    Have an account?
                    <a href="/login">
                        <button>Login</button>    
                    </a>
                </p>

                <ul>
                    <li>Do not register if you do not live in the United Arab Emirates.</li>
                    <li>We do not provide shipping outside of the UAE.</li>
                </ul>

                <form method="POST" id="registerForm">
                    <section id="registerItems">
                        ${formSection(
                            `<label for="username">Username</label>`,
                            `<input type="text" name="username" id="username"
                            ${errors ? fragments.username.value : ""} required>
                            ${errors ? fragments.username.message : ""}`
                        )}
                        
                        ${formSection(
                            `<label for="password">Password</label>`,
                            `<input type="password" name="password" id="password"
                            ${errors ? fragments.password.value : ""} required>
                            ${errors ? fragments.password.message : ""}`
                        )}

                        ${formSection(
                            `<label for="confirmPassword">Confirm Password</label>`,
                            `<input type="password" name="confirmPassword" id="confirmPassword"
                            ${errors ? fragments.confirmPassword.value : ""} required>
                            ${errors ? fragments.confirmPassword.message : ""}`
                        )}

                        <div class="seperator"></div>

                        ${formSection(
                            `<label for="firstName">First Name</label>`,
                            `<input type="text" name="firstName" id="firstName"
                            ${errors ? fragments.firstName.value : ""} required>
                            ${errors ? fragments.firstName.message : ""}`
                        )}

                        ${formSection(
                            `<label for="lastName">Last Name</label>`,
                            `<input type="text" name="lastName" id="lastName"
                                ${errors ? fragments.lastName.value : ""} required>
                                ${errors ? fragments.lastName.message : ""}`
                        )}

                        ${formSection(
                            `<label for="email">Email</label>`,
                            `<input type="email" name="email" id="email"
                            placeholder="example@domain.com"
                            ${errors ? fragments.email.value : ""} required>
                            ${errors ? fragments.email.message : ""}`
                        )}

                        ${formSection(
                            `<label for="phone">Phone No.</label>`,
                            `<input type="tel" name="phone" id="phone"
                            ${errors ? fragments.phone.value : ""} required>
                            ${errors ? fragments.phone.message : ""}`
                        )}

                        ${formSection(
                            `<label for="citydistrict">City + District</label>`,
                            `<select name="citydistrict" id="citydistrict">
                                ${cityDistrictsMap}
                            </select>`
                        )}

                        ${formSection(
                            `<label for="street">Street</label>`,
                            `<input type="text" name="street" id="street"
                            ${errors ? fragments.street.value : ""} required>
                            ${errors ? fragments.street.message : ""}`
                        )}
                        
                        ${formSection(
                            `<label for="room">Room No.</label>`,
                            `<input type="text" name="room" id="room"
                            ${errors ? fragments.room.value : ""} required>
                            ${errors ? fragments.room.message : ""}`
                        )}
                    </section>
                    <input type="submit" value="Register">
                </form>
            </article>
            <script type="module" src="/src/assets/js/register.js"></script>
        </section>
    `;
}