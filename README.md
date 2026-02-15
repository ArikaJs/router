## Arika Router

`@arikajs/router` is the **routing and request-dispatching layer** of the ArikaJS framework.

It is responsible for mapping HTTP requests to route handlers in a predictable, framework-controlled way, without depending on Express, Fastify, or any external routing library.

Arika Router integrates directly with **@arikajs/http** and **@arikajs/foundation** to provide an elegant, intuitive routing experience.

---

### Status

- **Stage**: Early Development / v0.x
- **Scope (v1.x)**:
  - HTTP method based routing (GET, POST, PUT, PATCH, DELETE)
  - Path-based route matching (Static & Regex)
  - Route parameters (`/users/:id`)
  - Central route registry
  - Route grouping with prefixes & middleware
  - Route naming
  - Controller resolution from container
  - Route handler execution (dispatching)
- **Out of scope (for now)**:
  - API Versioning helpers
  - Automatic OpenAPI/Swagger generation

---

## Features

- **Core Routing**
  - HTTP method based routing (GET, POST, PUT, PATCH, DELETE)
  - Path-based route matching
  - Central route registry

- **Route Grouping**
  - Group routes with a common prefix
  - Nested groups support

- **Request Matching**
  - Method + path matching
  - First match wins logic
  - Predictable matching order

- **Dispatching**
  - Route handler execution
  - Framework-controlled dispatch flow
  - Decoupled from HTTP response handling

---

## Installation

```bash
npm install @arikajs/router
# or
yarn add @arikajs/router
# or
pnpm add @arikajs/router
```

⚠️ Requires `@arikajs/http` and `@arikajs/foundation`.

---

## Quick Start

### 1. Register Routes

```ts
import { Route } from '@arikajs/router';

Route.get('/hello', () => {
  return 'Hello World';
});

Route.post('/submit', (request) => {
  return 'Form submitted';
});
```

### 2. Route Parameters & Fluent Chaining

```ts
Route.get('/users/:id', (request, id) => {
  return `User ID: ${id}`;
})
.as('users.show')
.withMiddleware(AuthMiddleware);
```

### 3. Controller Resolution

```ts
import { UserController } from './controllers/UserController';

Route.get('/users', [UserController, 'index']);
```

### 4. Route Grouping

```ts
Route.group('/api', () => {
  Route.get('/users', () => {
    return ['user1', 'user2'];
  });
});
```

---

## Architecture Overview

The router follows a simple flow:

```text
HTTP Request
↓
HttpKernel (@arikajs/http)
↓
RouteMatcher
↓
Matched Route
↓
Dispatcher
↓
Handler Execution
```

The router never writes to the response directly. It only decides **which handler should run**.

---

## Route Matching

The router matches incoming requests using method and path:

```ts
const route = routeMatcher.match('GET', '/hello');
```

Matching rules:
- Method must match exactly.
- Supports both static paths and dynamic parameters (`/users/:id`).
- The first route defined that matches will be selected.

---

## Dispatching

Once a route is matched, the dispatcher executes the handler:

```ts
await dispatcher.dispatch(route, request);
```

The dispatcher focuses purely on execution, leaving middleware and response formatting to other layers of the framework.

---

## Road Map

- [x] Route parameters (`/users/:id`)
- [x] Controller resolution from container
- [x] Route-level middleware
- [x] Named routes
- [x] Route caching for performance

---

## Versioning & Stability

- While in **v0.x**, the API may change between minor versions.
- Once the core routing engine stabilizes, `@arikajs/router` will move to **v1.0** and follow **semver** strictly.

---

## Contributing

Contributions are welcome! Please ensure you:
- Run the test suite before submitting PRs.
- Add tests for new features.
- Follow the existing coding style.

---

## License

`@arikajs/router` is open-sourced software licensed under the **MIT license**.
