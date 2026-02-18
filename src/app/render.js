import { Routes } from "./server.js";

const render = (content, status = 200) => {
    const headers = new Headers();
    headers.set("content-type", "text/html");

    const groupName = "Cartereuse"; // "Cart"ereuse?
    const title =  groupName + " Groceries";

    const routes = Object.values(Routes).map(route => {
        return `<a href="${route.route}">${route.name}</a>`
    }).join("");

    return new Response(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                <link rel="icon" href="/src/assets/favicon.svg">
                <link rel="stylesheet" href="/src/assets/styles.css">
            </head>
            <body>
                <header>
                    <h2 class="title">${title}</h2>
                    <nav>
                        ${routes}
                    </nav>
                    <button id="headerNavButton">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"/></svg>
                    </button>
                </header>
                
                <main>
                    ${content}
                </main>

                <footer>
                    <span>&copy; ${groupName}, All Rights Reserved.</span>
                </footer>

            </body>
        </html>
    `, {headers, status});
}

export default render;