import { ErrorFragment, getErrFragments } from "../../app/errorFragments.ts";

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