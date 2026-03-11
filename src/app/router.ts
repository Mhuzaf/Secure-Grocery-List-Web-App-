// Have to use "any" as the image controller needs an id...
// deno-lint-ignore-file no-explicit-any
export class ApplicationRouter {
    routes: { 
        method: string,
        pattern: URLPattern,
        handler: any
    }[];

    constructor() {
        this.routes = [];
    }

    private register(method: string, pattern, handler) {
        if (typeof pattern == "string") {
            pattern = new URLPattern({ pathname: pattern }); 
        }
        this.routes.push({ method, pattern, handler });
    }

    public get(path: string, handler: any) {
        this.register("GET", path, handler);
    }

    public post(path: string, handler: any) {
        this.register("POST", path, handler);
    }

    handle(request: Request) {
        const route = this.routes.find(({ method, pattern }) => {
            return request.method == method && pattern.test(request.url);
        });

        // TODO: is there a better way?
        const imagePath = route.pattern.exec(request.url).pathname.groups.imageId;
        if (imagePath) {
            return route.handler(imagePath);
        }

        return route.handler(request);
    }
}