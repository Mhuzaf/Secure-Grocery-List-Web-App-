export const profileView = (session?) => {
    
    const loginMsg = `
        <article>
            <h2>Profile</h2>

            <p>
                To order products and manage your cart, you need to be logged in.
            </p>

            <p>
                Or register to create an account.
            </p>

            <section id="profileActions">
                <a href="/login">
                    <button>Login</button>    
                </a>
                <a href="/register">
                    <button>Register</button>    
                </a>
            </section>
        </article>
    `;
    
    return `
        <section id="profileRoot">
            ${session ? `
                <p>Welcome to your account page, ${session.username}!</p>
                <form method="POST" action="/logout">
                    <button>Log out</button>
                </form>    
            ` : loginMsg}
        </section>
    `;
};