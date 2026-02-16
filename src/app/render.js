import { Routes } from "./server.js";

const render = (content, status = 200) => {
    const headers = new Headers();
    headers.set("content-type", "text/html");

    const title = "HuzafaHashim Products";
    const groupName = "HuzafaHashim"; // temporary

    let routes = "";
    Object.values(Routes).forEach(route => {
        routes += `<a href="${route.route}">${route.name}</a>`
    });

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