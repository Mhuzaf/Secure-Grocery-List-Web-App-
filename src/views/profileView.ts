export const profileView = (session?) => {
    return `
    <section id="profileLoginMsg">
        ${session ? `
            <p>Welcome to your account page, ${session.username}!</p>
            <br>
            <form method="POST" action="/logout">
                <button>Log out</button>
            </form>   
        ` : `
            <a href="/login">Login to order products.</a>
        `}
    </section>
    `
}