export const Dialog = (
    id: string,
    title: string,
    content: string,
    hasError: boolean
) => {
    return `
        <dialog id="${id}" class="${hasError ? "hasError" : ""}" closedby="any">
            <header id="dialogHeader">
                <h2 id="dialogTitle-${id}">${title}</h2>
                <button id="dialogClose" class="flat" command="close" commandfor="${id}">✕</button>
            </header>
            <main>
                ${content}
            </main>
        </dialog>
    `;
}