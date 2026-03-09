import { defaultLocations } from "../app/defaults.ts"
import { getErrFragments } from "../app/errorFragments.ts";

export const loginView = (errors?) => {
    let fragments;
    if (errors) fragments = getErrFragments(errors);
    
    console.log(errors) 

    return `
        <section id="loginRoot" aria-labelledby="loginRoot">
            <h2>Login</h2>
            <p>Don't have an account? <a href="/register">Register here.</a></p>
            
            <form method="POST" id="loginForm">

                <section>
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" ${errors ? fragments.username.value : ""} required>
                    ${errors ? fragments.username.message : ""}
                </section>

                <section>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" ${errors ? fragments.password.value : ""} required>
                    ${errors ? fragments.password.message : ""}
                </section>

                <input type="submit" value="Login">

            </form>
        </section>    
    `;
};

export const registerView = (errors?) => {
    let fragments;
    if (errors) fragments = getErrFragments(errors);
    
    console.log(errors)

    return `
        <section id="registerRoot">
            <h2>Register</h2>
            <p>Have an account? <a href="/login">Login here.</a></p>
            
            <ul>
                <li>Do not register if you do not live in the United Arab Emirates.</li>
                <li>We do not provide shipping outside of the UAE, and to certain cities within the country.</li>
            </ul>

            <form method="POST" id="registerForm">
                <label for="username">Username</label>
                <section>
                    <input type="text" name="username" id="username" ${errors ? fragments.username.value : ""} required>
                    ${errors ? fragments.username.message : ""}
                </section>
                
                <label for="password">Password</label>
                <section>
                    <input type="password" name="password" id="password" ${errors ? fragments.password.value : ""} required>
                    ${errors ? fragments.password.message : ""}
                </section>

                <label for="confirm_password">Confirm Password</label>
                <section>
                    <input type="password" name="confirm_password" id="confirm_password" ${errors ? fragments.confirm_password.value : ""} required>
                    ${errors ? fragments.confirm_password.message : ""}
                </section>

                <label for="email">Email</label>
                <section>
                    <input type="email" name="email" id="email" placeholder="example@domain.com" ${errors ? fragments.email.value : ""} required>
                    ${errors ? fragments.email.message : ""}
                </section>

                <label for="phone">Phone No.</label>
                <section>
                    <input type="tel" name="phone" id="phone" ${errors ? fragments.phone.value : ""} required>
                    ${errors ? fragments.phone.message : ""}
                </section>

                <label for="citydistrict">City/District</label>
                <select name="citydistrict" id="citydistrict">
                    ${defaultLocations.map(loc => {
                        return `<optgroup label="${loc.city}">
                                    ${loc.districts.map(dist => {
                                        return `<option value="${dist.toLowerCase().replace(RegExp("\\s+"), "_")}">${dist}</option>`
                                    }).join("")}
                                </optgroup>`
                    }).join("")}
                </select>

                <label for="street">Street</label>
                <section>
                    <input type="text" name="street" id="street" ${errors ? fragments.street.value : ""} required>
                    ${errors ? fragments.street.message : ""}
                </section>

                <label for="room">Room No.</label>
                <section>
                    <input type="text" name="room" id="room" ${errors ? fragments.room.value : ""} required>
                    ${errors ? fragments.room.message : ""}
                </section>

                <input type="submit" value="Register">
            </form>
            <script type="module" src="/src/assets/js/confirmPassword.js"></script>

        </section>
    
    `
}