import { ErrorFragment, getErrFragments } from "../app/errorFragments.ts";
import { City, District } from "../models/locationsModel.ts";

export const loginView = (errors?) => {
    let fragments: ErrorFragment;
    if (errors) fragments = getErrFragments(errors);

    return `
        <section id="loginRoot" aria-labelledby="loginTitle">
            <article>
                <h2 id="loginTitle">Login</h2>

                <p>
                    Don't have an account?
                    <a href="/register">
                        <button>Register</button>
                    </a>
                </p>

                <form method="POST" id="loginForm">
                    <section>
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username"
                            ${errors ? fragments.username.value : ""} required>
                        ${errors ? fragments.username.message : ""}
                    </section>

                    <section>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password"
                            ${errors ? fragments.password.value : ""} required>
                        ${errors ? fragments.password.message : ""}
                    </section>
                    <input type="submit" value="Login">
                </form>
            </article>
        </section>
    `;
};


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
                    <section id="registerGrid">
                        <label for="username">Username</label>
                        <section>
                            <input type="text" name="username" id="username"
                            ${errors ? fragments.username.value : ""} required>
                            ${errors ? fragments.username.message : ""}
                        </section>

                        <label for="password">Password</label>
                        <section>
                            <input type="password" name="password" id="password"
                            ${errors ? fragments.password.value : ""} required>
                            ${errors ? fragments.password.message : ""}
                        </section>

                        <label for="confirmPassword">Confirm Password</label>
                        <section>
                            <input type="password" name="confirmPassword" id="confirmPassword"
                            ${errors ? fragments.confirmPassword.value : ""} required>
                            ${errors ? fragments.confirmPassword.message : ""}
                        </section>

                        <label for="email">Email</label>
                        <section>
                            <input type="email" name="email" id="email"
                            placeholder="example@domain.com"
                            ${errors ? fragments.email.value : ""} required>
                            ${errors ? fragments.email.message : ""}
                        </section>

                        <label for="phone">Phone No.</label>
                        <section>
                            <input type="tel" name="phone" id="phone"
                            ${errors ? fragments.phone.value : ""} required>
                            ${errors ? fragments.phone.message : ""}
                        </section>

                        <label for="citydistrict">City + District</label>
                        <select name="citydistrict" id="citydistrict">
                            ${cityDistrictsMap}
                        </select>

                        <label for="street">Street</label>
                        <section>
                            <input type="text" name="street" id="street"
                            ${errors ? fragments.street.value : ""} required>
                            ${errors ? fragments.street.message : ""}
                        </section>

                        <label for="room">Room No.</label>
                        <section>
                            <input type="text" name="room" id="room"
                            ${errors ? fragments.room.value : ""} required>
                            ${errors ? fragments.room.message : ""}
                        </section>
                    </section>
                    <input type="submit" value="Register">
                </form>
            </article>
            <script type="module" src="/src/assets/js/register.js"></script>
        </section>
    `;
}