import { RouteHandler, RouteDefinition } from './types';

export class RouteEntry implements RouteDefinition {
    public method: string;
    public path: string;
    public handler: RouteHandler;
    public name?: string;
    public prefix?: string;
    public middleware: any[] = [];
    public regex: RegExp;
    public paramKeys: string[] = [];

    constructor(method: string, path: string, handler: RouteHandler, prefix?: string, groupMiddleware: any[] = []) {
        this.method = method.toUpperCase();
        this.path = path;
        this.handler = handler;
        this.prefix = prefix;
        this.middleware = [...groupMiddleware];

        const { regex, paramKeys } = this.compilePath(path);
        this.regex = regex;
        this.paramKeys = paramKeys;
    }

    /**
     * Set a name for the route.
     */
    public as(name: string): this {
        this.name = name;
        return this;
    }

    /**
     * Add middleware to the route.
     */
    public withMiddleware(middleware: any | any[]): this {
        if (Array.isArray(middleware)) {
            this.middleware.push(...middleware);
        } else {
            this.middleware.push(middleware);
        }
        return this;
    }

    /**
     * Compile the path into a regex.
     */
    private compilePath(path: string) {
        const paramKeys: string[] = [];
        const pattern = path
            .replace(/:([a-zA-Z0-9_]+)|\{([a-zA-Z0-9_]+)\}/g, (_, key1, key2) => {
                paramKeys.push(key1 || key2);
                return '([^/]+)';
            })
            .replace(/\//g, '\\/');

        return {
            regex: new RegExp(`^${pattern}$`),
            paramKeys
        };
    }
}
