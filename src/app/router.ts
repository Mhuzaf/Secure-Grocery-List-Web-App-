// deno-lint-ignore-file no-explicit-any
// Have to use "any" as the image controller needs an id...

import { SessionProps } from "../models/sessionsModel.ts";

export interface Context {
    request: Request, 
    session?: SessionProps, 
    headers?: Headers
}

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

    private chain(ctx: Context, middleware: any[], handler) {
        if (middleware.length == 0) return handler(ctx);
        const [nextMWFunc, ...remainingMWFunc] = middleware;
        const next = (ctx) => {
            return this.chain(ctx, remainingMWFunc, handler);
        };
        return nextMWFunc({...ctx}, next);
    }

    public handle(ctx: Context) {
        const { request } = ctx; 
        const route = this.routes.find(({ method, pattern }) => {
            return request.method == method && pattern.test(request.url);
        });
        
        return this.chain(ctx, this.middleware, route.handler);
    }
}