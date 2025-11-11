# mi-proyecto-vue

Sistema de gestión de items desarrollado con Vue 3, TypeScript y Vite. Esta aplicación permite listar, visualizar, crear y eliminar items con sus respectivos detalles como nombre, descripción, precio, categoría, stock y especificaciones técnicas.

## Características

- **Lista de Items**: Visualiza todos los items en una tabla con información resumida
- **Detalle de Item**: Vista detallada de cada item con todas sus especificaciones
- **Gestión CRUD**: Añade y elimina items de la lista
- **Manejo de Estado**: Utiliza Pinia para la gestión centralizada del estado
- **Enrutamiento**: Implementado con Vue Router para navegación entre vistas
- **TypeScript**: Desarrollo con tipado estático para mayor seguridad
- **Pruebas Unitarias**: Suite completa de tests con Vitest y Vue Test Utils

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

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

El proyecto incluye pruebas unitarias para todos los componentes y el store de Pinia.

```sh
# Ejecutar todas las pruebas
npm run test:unit

# Ejecutar pruebas en modo watch (recomendado para desarrollo)
npm run test:unit -- --watch

# Ejecutar pruebas con cobertura
npm run test:unit -- --coverage

# Ejecutar pruebas en modo UI
npm run test:unit -- --ui
```

#### Archivos de prueba incluidos:
- `src/App.spec.ts` - Pruebas del componente principal y navegación
- `src/components/ProjectAbout.spec.ts` - Pruebas del componente About
- `src/components/ItemList.spec.ts` - Pruebas del componente de lista de items
- `src/components/ItemDetail.spec.ts` - Pruebas del componente de detalle de item
- `src/stores/items.spec.ts` - Pruebas del store de Pinia (getters, actions)

Las pruebas cubren:
- Renderizado de componentes
- Interacción del usuario (clicks, formularios)
- Navegación entre rutas
- Gestión de estado con Pinia
- Validación de datos
- Casos edge (items inexistentes, validaciones, etc.)

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
