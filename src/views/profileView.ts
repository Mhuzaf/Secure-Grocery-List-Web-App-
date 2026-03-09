import Routes from "../app/routes.ts";

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
            <a href="${Routes.LOGIN.route}">Login to order products.</a>
        `}
    </section>
    `
}