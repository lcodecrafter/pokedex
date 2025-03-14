# README para Pokedex

## Descripción del Proyecto

Este proyecto es una aplicación web Pokedex que permite explorar y visualizar información sobre diferentes Pokémon utilizando la API pública PokeAPI. La aplicación está desarrollada con React, TypeScript y Vite, implementando una arquitectura moderna y escalable.

## Tecnologías Utilizadas

- React: Biblioteca para construir la UI
- TypeScript: Tipado de JavaScript
- React Router: Enrutamiento para la aplicación
- Redux Toolkit: Manejo del estado global
- TanStack React Query: Gestión de estado del servidor y caché
- Tailwind CSS: Framework CSS para estilos

### Herramientas de Desarrollo

- Vite: Bundler y servidor de desarrollo
- ESLint: Análisis estático de código
- Prettier: Formateador de código
- Husky: Hooks de git
- Lint-Staged: Ejecuta linters en archivos staged
- Vitest: Framework de testing

## Arquitectura del Proyecto

📦src/  
├── 📂 app/ # Configuración central (store, router, providers)  
├── 📂 components/ # Componentes compartidos y reutilizables  
├── 📂 features/ # Funcionalidades organizadas por dominio  
│ └── 📂 pokemon/ # Feature de Pokémon  
│ ├── 📂 components/ # Componentes específicos de Pokémon  
│ ├── 📂 hooks/ # Hooks personalizados (ViewModel en MVVM)  
│ ├── 📂 models/ # Interfaces y tipos relacionados con Pokémon  
│ ├── 📂 pages/ # Vistas principales (PokemonList, PokemonDetail)  
│ ├── 📂 services/ # Llamadas a la API  
│ └── 📂 store/ # Estado Redux para Pokémon  
├── 📂 layouts/ # Layouts reutilizables  
├── 📂 lib/ # Utilidades y servicios compartidos  
├── 📂 pages/ # Páginas principales y de error  
└── 📂 tests/ # Configuración y utilidades para testing  
└── 📜 main.tsx # Punto de entrada de la app  
└── 📜 app.tsx/ # Componente raiz

## Características de la Aplicación

- Listado paginado de Pokémon con querystring para acceder directamente a una página
- Vista detallada de cada Pokémon
- Persistencia de caché para reducir peticiones de API
- Navegación entre Pokémon (anterior/siguiente)
- Diseño responsive

### Requisitos

Node.js (versión >= 20.18.1)
npm

### Configuración e Instalación

**Clona el repositorio:**

```sh
git clone [URL_DEL_REPOSITORIO]
cd pokedex
```

**Instala las dependencias:**

Crea un archivo .env en la raíz del proyecto (o usa el existente)

**Scripts Disponibles**

-> Inicia modo Desarrollo:

```sh
npm run dev
```

-> Compilación:

```sh
npm run build
```

Compila la aplicación para producción en la carpeta dist

-> Vista previa:

```sh
npm run preview
```

Inicia un servidor local para previsualizar la versión compilada

-> Linting:

```sh
npm run lint       # Ejecuta ESLint
npm run lint:ts    # Comprueba tipos de TypeScript
npm run format     # Formatea el código con Prettier
```

-> Testing:

```sh
npm run test             # Ejecuta tests unitarios
npm run test:coverage    # Ejecuta tests con reporte de cobertura
```
