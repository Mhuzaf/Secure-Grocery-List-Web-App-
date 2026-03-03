import Routes from "../app/routes.ts";

export const profileView = () => {
    return `
    <section id="profileLoginMsg">
        <a href="${Routes.LOGIN.route}">Login to order products.</a>
    </section>
    `
}