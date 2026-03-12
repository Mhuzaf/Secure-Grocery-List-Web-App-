export const profileView = () => {

    return `
    <section id="profileRoot">

        <div class="authCard">

            <h2>Welcome</h2>

            <p>
                To order products and manage your cart, you need to be logged in.
            </p>

            <p>
                If you already have an account, click the login button below.
            </p>

            <div class="profileActions">

                <a href="/login" class="authBtn">Login</a>

                <a href="/register" class="authBtn secondaryBtn">Register</a>

            </div>

        </div>

    </section>
    `;
};