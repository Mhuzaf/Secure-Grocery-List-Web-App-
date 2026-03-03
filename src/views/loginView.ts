export const loginView = (errors = {}) => {
    console.log(errors);    

    return `
        <section id="loginRoot" aria-labelledby="loginRoot">
            <h2>Login</h2>
            <p>Don't have an account? <a href="/register">Register here.</a></p>
            
            <form method="POST" id="loginForm">

                <section>
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" required>
                </section>

                <section>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" required>
                </section>

                <input type="submit" value="Login">

            </form>
        </section>    
    `;
};

export const registerView = (errors = {}) => {
    console.log(errors);    

    return `
        <section id="registerRoot">
            <h2>Register</h2>
            <p>Have an account? <a href="/login">Login here.</a></p>
            
            <ul>
                <li>Fields marked with an asterisk (*) are required.</li>
                <li>Do not register if you do not live in Dubai, United Arab Emirates.</li>
            </ul>
            <form method="POST" id="registerForm">
                <label for="username">Username*</label>
                <input type="text" name="username" id="username" required>
                
                <label for="password">Password*</label>
                <input type="password" name="password" id="password" required>

                <label for="email">Email*</label>
                <input type="email" name="email" id="email" placeholder="example@domain.com" required>

                <label for="phone">Phone No.</label>
                <input type="tel" name="tel" id="tel" placeholder="+971" pattern="[0-9]">

                <label for="city">City</label>
                <select name="city" id="city">
                    <option value="deira">Deira</option>
                    <option value="burdubai">Bur Dubai</option>
                    <option value="zaabeel">Zaa'beel</option>
                    <option value="rasalkhor">Ras Al Khor</option>
                </select>

                <label for="street">Street</label>
                <input type="text" name="street" id="street">

                <label for="room">Room No.</label>
                <input type="text" name="room" id="room">

                <input type="submit" value="Register">
            </form>

        </section>
    
    `
}