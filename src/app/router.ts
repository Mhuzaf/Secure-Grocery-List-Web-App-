// deno-lint-ignore-file no-explicit-any
import { SessionProps } from "../models/sessionsModel.ts";
import { FormError } from "./errorFragments.ts";

export interface Context {
    request: Request, 
    session?: SessionProps, 
    headers?: Headers,
    formName?: string,
    isValid?: boolean,
    errors?: FormError,
    validated?: {
        [key: string]: string
    },
    status?: number
}

export class ApplicationRouter {
    routes: { 
        method: string,
        pattern: URLPattern,
        handler: any,
        middleware: any[]
    }[];
    middleware: any[];

    constructor() {
        this.routes = [];
        this.middleware = [];
    }

    private register(method: string, pattern, handler, ...middleware) {
        if (typeof pattern == "string") {
            pattern = new URLPattern({ pathname: pattern }); 
        }
        this.routes.push({ method, pattern, handler, middleware });
    }

    public get(path: string, handler: any, ...middleware) {
        this.register("GET", path, handler, ...middleware);
    }

    public post(path: string, handler: any, ...middleware) {
        this.register("POST", path, handler, ...middleware);
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
        
        const middleware = [...this.middleware, ...route.middleware];
        return this.chain(ctx, middleware, route.handler);
    }
}