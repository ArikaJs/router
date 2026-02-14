import { Request } from '@arikajs/http';
import { MatchedRoute, Container } from './types';

export class Dispatcher {
    constructor(private container?: Container) { }

    /**
     * Set the container for resolving controllers.
     */
    public setContainer(container: Container): this {
        this.container = container;
        return this;
    }

    /**
     * Dispatch the matched route to its handler.
     */
    public async dispatch(matchedRoute: MatchedRoute, request: Request): Promise<any> {
        const { route, params } = matchedRoute;
        const handler = route.handler;

        if (Array.isArray(handler)) {
            const [controllerClass, methodName] = handler;

            if (!this.container) {
                throw new Error('Container required for controller resolution.');
            }

            const controller = this.container.make(controllerClass) as any;

            if (typeof controller[methodName] !== 'function') {
                throw new Error(`Controller method "${methodName}" not found on ${controllerClass.name || controllerClass}.`);
            }

            return await controller[methodName](request, ...Object.values(params));
        }

        if (typeof handler === 'function') {
            return await handler(request, ...Object.values(params));
        }

        throw new Error('Invalid route handler.');
    }
}
