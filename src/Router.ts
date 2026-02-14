import { Request, Response } from '@arikajs/http';
import { RouteMatcher } from './RouteMatcher';
import { Dispatcher } from '@arikajs/dispatcher';
import { MatchedRoute, Container } from './types';

export class Router {
    private matcher: RouteMatcher;
    private dispatcher: Dispatcher;
    private cache: Map<string, MatchedRoute | null> = new Map();

    constructor(container?: Container) {
        this.matcher = new RouteMatcher();
        this.dispatcher = new Dispatcher(container);
    }

    /**
     * Set the container for the dispatcher.
     */
    public setContainer(container: Container): this {
        this.dispatcher.setContainer(container);
        return this;
    }

    /**
     * Register a route model binding.
     */
    public model(key: string, resolver: ((value: any) => Promise<any>) | { findOrFail: (id: any) => Promise<any> }): this {
        this.dispatcher.bind(key, resolver);
        return this;
    }

    /**
     * Match a request to a route.
     */
    public match(method: string, path: string): MatchedRoute | null {
        const cacheKey = `${method.toUpperCase()}:${path}`;

        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        const matched = this.matcher.match(method, path);
        this.cache.set(cacheKey, matched);

        return matched;
    }

    /**
     * Clear the route cache.
     */
    public clearCache(): void {
        this.cache.clear();
    }

    /**
     * Dispatch the request to the matching route and return the result.
     * Note: This does not wrap the result in a Response object.
     */
    public async dispatch(request: Request, response: Response): Promise<any> {
        const matched = this.match(request.method(), request.path());

        if (!matched) {
            return null;
        }

        return await this.dispatcher.dispatch(matched, request, response);
    }
}
