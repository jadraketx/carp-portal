Repository containing the dashboard (UI), the Carp Portal.

## Introduction

The website is using React v18, Material-UI v5, [Carp Client TS (1.0.0)](https://github.com/cph-cachet/carp-client-ts) and [Carp.Core (1.2.1)](https://github.com/cph-cachet/carp.core-kotlin/releases/tag/v1.1.1). The later two components are dependencies not available on npm. They can be found in the [non_npm_dependencies](non_npm_dependencies) folder.

## Setup

1. Install node `v18.16.0`
2. Install `pnpm`

3. Run `pnpm i` in the root folder of the project.

4. Create an `.env.` file in the root of the project:

```
VITE_APP_NAME=...
VITE_BASE_URL=...
VITE_BASE_NAME=...
VITE_KEYCLOAK_URL=...
VITE_KEYCLOAK_REALM=...
VITE_KEYCLOAK_CLIENT_ID=...
VITE_KEYCLOAK_REDIRECT_URI=...
```

4. You can now start the portal with `pnpm start` and you can access the portal at `http://localhost:3000`.

> **Note**
> Every time a developer uses the `pnpm add`, `pnpm install`, `pnpm rm` (or similar npm commands), `pnpm` will remove the `non_npm_dependencies` from `node_modules/`. There is a post-install script that links the dependencies again, but this only works on UNIX-based systems. On Windows, you must manually copy the `non_npm_dependencies` to `node_modules/`, taking special care not to erase the **node_modules/@types** folder and its original content.

---

## Development

### Folder structure

The [src](src) folder contains all the Typescript source code and static asset for the web interface. The web interface is using custom CARP fonts (MuseoSansRounded), and these custom font files can be found in the [fonts](src/assets/fonts) folder. The carp logo and the image used on the landing page are located in the [images](src/assets/images) folder. The [components](src/components) folder holds all the reusable components for the application and [pages](src/pages) contains the full sites, which are usually build up using the reusable components.
