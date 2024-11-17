# Contact_System

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```


## 🗄️ Setting Up PocketBase
### The project uses PocketBase as a lightweight backend. Follow the steps below to download PocketBase, replace the existing .db file, and set up the server.

###  Step 1: Download PocketBase
1. Visit the PocketBase GitHub Releases..
2. Download the latest version for Windows:
  For 64-bit: pocketbase_0.x.x_windows_amd64.zip
  For 32-bit: pocketbase_0.x.x_windows_386.zip
3. Extract the .zip file to a desired folder on your system.
### Step 2: Replace the Database File
Download existing .db file from https://github.com/Henderxo/ContactSystem_PB:

1. Copy your .db file (e.g., pb_data.db).
2. Go to the extracted PocketBase folder, and navigate to the pb_data directory:
```sh
cd path\to\pocketbase\folder\pb_data
```
3. Replace the default .db file wit .db file from the repository.

### Step 3: Start PocketBase Server

1. Open Command Prompt or PowerShell.
2. Navigate to the PocketBase folder:
```sh
cd path\to\pocketbase\folder
```
3. Start the server:
```sh
./pocketbase.exe serve
```


