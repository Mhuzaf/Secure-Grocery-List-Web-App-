export const loginView = () => {
    return `
        <section class="login-section" aria-labelledby="login-heading">
            <h2 id="login-heading">Login</h2>
            <p> Log in to save progress </p>
            <form method="POST" action="/login" id="loginForm">

                <div class="form-group">
                    <label for="username">Username: </label>
                    <input type="text" name="username" id="username" required>
                    
                </div>

                <div class="form-group">
                    <label for="password">Password: </label>
                    <input type="password" name="password" id="password" required>
                
                </div>

                <button type="submit">login</button>

            </form>
        </section>    
    `;
};

export const registerView = () => {
    
}