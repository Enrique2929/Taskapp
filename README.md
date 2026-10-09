# Gestor de Tareas (TaskApp)

Mini proyecto desarrollado con **Ionic y Angular** para crear y administrar tareas. La aplicación permite agregar tareas con título, descripción y prioridad; marcar una tarea como completada; y eliminarla. Los datos se guardan en el almacenamiento local del navegador (`localStorage`).

## Requisitos

- Git
- Node.js y npm, en versiones compatibles con Angular 22

## Clonar y ejecutar

Instala Ionic CLI una sola vez y, luego, clona el proyecto e instala sus dependencias:

```bash
npm install -g @ionic/cli
git clone https://github.com/Enrique2929/Taskapp.git
cd Taskapp
npm ci
ionic serve
```

`ionic serve` inicia el servidor de desarrollo de Ionic, observa los cambios en el código y recarga la aplicación. La terminal muestra la dirección local que debes abrir en el navegador. También puedes usar `npm start`, que ejecuta `ng serve` según el script definido en `package.json`. Consulta la [instalación de Ionic CLI](https://ionicframework.com/docs/cli) y la documentación de [`ionic serve`](https://ionicframework.com/docs/cli/commands/serve).

## Estructura del proyecto

```text
Taskapp/
├── android/                       # Proyecto nativo Android generado por Capacitor
├── src/
│   ├── app/
│   │   ├── home/                  # Pantalla principal y su vista/estilos
│   │   │   ├── home.page.ts
│   │   │   ├── home.page.html
│   │   │   └── home.page.scss
│   │   ├── Models/
│   │   │   └── tarea.model.ts      # Forma y tipos de una tarea
│   │   ├── Service/
│   │   │   └── tareas.service.ts   # Operaciones y persistencia de tareas
│   │   ├── app.routes.ts           # Rutas de la aplicación
│   │   └── app.component.*         # Componente raíz
│   ├── assets/                     # Recursos estáticos
│   ├── environments/               # Configuración por entorno
│   ├── theme/                      # Variables de tema Ionic
│   ├── global.scss                 # Estilos globales
│   ├── index.html
│   └── main.ts                     # Punto de entrada
├── angular.json                    # Configuración Angular CLI
├── capacitor.config.ts             # Configuración Capacitor
├── ionic.config.json               # Configuración Ionic
├── package.json                    # Dependencias y comandos npm
└── README.md
```

## Apartados principales

### Modelo: `src/app/Models/tarea.model.ts`

Define la interfaz `Tarea`, que describe los datos de cada tarea: `id`, `titulo`, `descripcion`, `prioridad` (`Alta`, `Media` o `Baja`) y `completada`.

### Servicio e `@Injectable`: `src/app/Service/tareas.service.ts`

El servicio **sí está implementado**. La clase `TareasService` lleva el decorador de Angular:

```ts
@Injectable({
  providedIn: 'root'
})
export class TareasService { /* ... */ }
```

`providedIn: 'root'` registra el servicio en el inyector raíz de Angular para que pueda inyectarse en la aplicación. El servicio mantiene la lista en memoria y ofrece estos métodos:

- `obtenerTareas()`: devuelve las tareas actuales.
- `agregarTarea(tarea)`: agrega una tarea y guarda los cambios.
- `eliminarTarea(id)`: elimina la tarea indicada y guarda los cambios.
- `cambiarEstado(id)`: alterna si la tarea está completada y guarda los cambios.
- `cargarTareas()` y `guardarTareas()`: leen y escriben la lista en `localStorage`.

### Pantalla principal: `src/app/home/`

`home.page.ts` inyecta `TareasService`, administra el formulario reactivo y conecta las acciones de la interfaz con el servicio. `home.page.html` contiene el formulario y la lista; `home.page.scss` contiene los estilos de esa pantalla.

### Navegación: `src/app/app.routes.ts`

La ruta `/home` carga la pantalla principal. La ruta raíz (`/`) redirige a `/home`.

## Comandos disponibles

```bash
ionic serve    # Inicia el servidor local de desarrollo de Ionic
npm start       # Alternativa: ejecuta ng serve
npm run build   # Compila la aplicación
npm test        # Ejecuta las pruebas configuradas
npm run lint    # Revisa el código con ESLint
```

## Persistencia

Las tareas se guardan en `localStorage` del navegador. Por eso permanecen al recargar la aplicación en el mismo navegador y dispositivo, pero no se sincronizan con otros dispositivos ni con una base de datos remota. Para empezar con una lista limpia, se puede borrar la clave `tareas` desde las herramientas de almacenamiento del navegador.



