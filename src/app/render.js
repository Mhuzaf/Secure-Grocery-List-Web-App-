const render = (content, status = 200) => {
    const headers = new Headers();
    headers.set("content-type", "text/html");
    return new Response(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>My Server</title>
                <meta charset="UTF-8">
                <link rel="icon" href="/src/assets/favicon.svg">
                <link rel="stylesheet" href="/src/assets/styles.css">
                </head>
            <body>
                <header>
                    <nav>
                        <a href="/">home</a>
                        <a href="/about">about</a>
                    </nav>
                    <h1>My Website</h1>
                </header>
                
                <main>
                    ${content}
                </main>

                <footer>
                    <p>&copy; P2836489</p>
                    <p>test</p>
                </footer>

            </body>
        </html>
    `, {headers, status});
}

export default render;