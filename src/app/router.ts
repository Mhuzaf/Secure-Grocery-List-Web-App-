// deno-lint-ignore-file no-explicit-any
// Have to use "any" as the image controller needs an id...

import { SessionProps } from "../models/sessionsModel.ts";

export class ApplicationRouter {
    routes: { 
        method: string,
        pattern: URLPattern,
        handler: any
    }[];
    middleware: any[];

    constructor() {
        this.routes = [];
        this.middleware = [];
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

    public use(middlewareFunc) {
        this.middleware.push(middlewareFunc);
    }

    private chain(ctx: { request: Request, session?: SessionProps, headers?: Headers }, middleware: any[], handler) {
        if (middleware.length == 0) return handler(ctx);
        const [nextMWFunc, ...remainingMWFunc] = middleware;
        const next = (ctx) => {
            return this.chain(ctx, remainingMWFunc, handler);
        };
        return nextMWFunc({...ctx}, next);
    }

    public handle(ctx: { request: Request, session?: SessionProps, headers?: Headers }) {
        const { request } = ctx; 
        const route = this.routes.find(({ method, pattern }) => {
            return request.method == method && pattern.test(request.url);
        });

        // TODO: is there a better way?
        const imagePath = route.pattern.exec(request.url).pathname.groups.imageId;
        if (imagePath) {
            return route.handler(imagePath);
        }

        return this.chain(ctx, this.middleware, route.handler);
    }
}