import { Request, Response } from '@arikajs/http';

export type RouteHandler =
    | ((request: Request, ...params: any[]) => Promise<Response | any> | Response | any)
    | [any, string];

export interface RouteDefinition {
    method: string;
    path: string;
    handler: RouteHandler;
    name?: string;
    prefix?: string;
    middleware: any[]; // Using any for now to avoid circular dependency with Http/Middleware
    regex?: RegExp;
    paramKeys?: string[];
}

export interface MatchedRoute {
    route: RouteDefinition;
    params: Record<string, string>;
}
