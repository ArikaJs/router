import { RouteRegistry } from './RouteRegistry';
import { RouteHandler } from './types';
import { RouteEntry } from './RouteEntry';

export class Route {
    public static get(path: string, handler: RouteHandler): RouteEntry {
        return RouteRegistry.getInstance().addRoute('GET', path, handler);
    }

    public static post(path: string, handler: RouteHandler): RouteEntry {
        return RouteRegistry.getInstance().addRoute('POST', path, handler);
    }

    public static put(path: string, handler: RouteHandler): RouteEntry {
        return RouteRegistry.getInstance().addRoute('PUT', path, handler);
    }

    public static patch(path: string, handler: RouteHandler): RouteEntry {
        return RouteRegistry.getInstance().addRoute('PATCH', path, handler);
    }

    public static delete(path: string, handler: RouteHandler): RouteEntry {
        return RouteRegistry.getInstance().addRoute('DELETE', path, handler);
    }

    public static group(options: string | { prefix?: string; middleware?: any | any[] }, callback: () => void): void {
        RouteRegistry.getInstance().group(options, callback);
    }
}
