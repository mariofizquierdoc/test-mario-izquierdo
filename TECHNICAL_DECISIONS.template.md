# Decisiones Técnicas
## [Tu Nombre]

> **Nota**: Este es un archivo opcional pero recomendado. Documentar tus decisiones técnicas demuestra pensamiento crítico y puede sumar puntos extra en la evaluación.

---

## 📋 Información General

- **Nombre del Candidato**: Mario Izquierdo
- **Fecha de Inicio**: 07/12/2025
- **Fecha de Entrega**: 10/12/2025
- **Tiempo Dedicado**: Aprox 36 horas

---

## 🛠️ Stack Tecnológico Elegido

### Backend

| Tecnología | Versión | Razón de Elección |
|------------|---------|-------------------|
| Node.js | 22.20.0 |  |
| Express | 5.2.1 |  |
| Base de Datos | MySQL | Tengo más familiaridad con MySQL y sería más práctico por el tiempo límite |
| ORM/ODM | Sequelize | El manejo de Sequelize se me hizo muy familiar a Eloquent (Laravel) con el que tengo amplia experiencia, admás de que su documentación es bastante completa y su instalación sencilla |
| Validación | express-validator | [Razón] |

### Frontend

| Tecnología | Versión | Razón de Elección |
|------------|---------|-------------------|
| React | 19.2.5 |  |
| Build Tool | Vite | Permite que el desarrollo se lleve a cabo con más rapidez ya que al hacer cambios en los archivos, el servidor se refresca (watch) pero sin perder el estado actual de la app |
| Estilos | Tailwind | Su manejo de estilos por clases da mayor facilidad para quienes venimos de un contexto de uso de Bootstrap |

---

## 🏗️ Arquitectura

### Estructura del Backend

```
backend/
└── src/
    ├── config (usuario y contraseña de prueba para BD)
    ├── controllers
    │   ├── authController.js
    │   ├── profileController.js
    │   ├── projectController.js
    │   └── taskController.js
    ├── middlewares
    │   ├── auth.js
    │   ├── errorHandler.js
    │   └── logger.js
    ├── migrations
    │   └── ... #migraciones para crear las tablas de la BD
    ├── models
    │   ├── index.js
    │   ├── project.js
    │   ├── projectusers.js
    │   ├── task.js
    │   └── user.js
    ├── routes
    │   ├── admin.js
    │   ├── auth.js
    │   └── index.js
    ├── services
    │   ├── authService.js
    │   ├── profileService.js
    │   ├── projectService.js
    │   └── taskService.js
    ├── app.js
    └── server.js
```

**Razón de esta estructura:**
[Explica por qué organizaste tu código de esta manera]

### Estructura del Frontend

```
frontend/
└── src/
    ├── components
    │   ├── MyProjects
    │   │   └── MyProjects.jsx
    │   ├── MyTasks
    │   │   └── MyTasks.jsx
    │   ├── ProjectTasks
    │   │   └── ProjectTasks.jsx
    │   ├── UserMultiSelect
    │   │   └── UserMultiSelect.jsx
    │   ├── UserSelect
    │   │   └── UserSelect.jsx
    │   └── ProtectedRoute.jsx
    ├── controllers
    │   ├── authController.js
    │   ├── profileController.js
    │   ├── projectController.js
    │   └── taskController.js
    ├── context
    │   └── authContext.jsx
    ├── pages
    │   ├── CreateProject.jsx
    │   ├── CreateTask.jsx
    │   ├── Dashboard.jsx
    │   ├── EditMyTask.jsx
    │   ├── EditProject.jsx
    │   ├── EditTask.jsx
    │   ├── Login.jsx
    │   └── Register.jsx
    ├── routes
    │   └── AppRoutes.jsx
    ├── services
    │   └── api.js
    ├── App.css
    └── App.jsx
```

**Razón de esta estructura:**
Vengo de manejar proyectos usando MVC para poder divorciar la lógica de negocio del manejo de base de datos, de las rutas, etc.
Esta estructura permite que cada archivo y cada componente se dedique sólo a lo suyo.

---

## 🗄️ Diseño de Base de Datos

### Elección: MySQL

**Razones:**
- Familiaridad
- Rapidez
- Mayor enfoque en relaciones entre tablas

### Schema/Modelos

- users (almacena los usuarios del sistema y maneja unicidad de correo electrónico)
- projects (almacena los proyectos, cada proyecto le pertenece a un usuario, que es quien lo creó)
- tasks (almacena las tareas, cada tarea le pertenece a un proyecto, que es donde fue creada, y puede ser asignada a un usuario)
- projectusers (almacena los colaboradores de cada proyecto, así las tareas pueden ser asignadas a un usuario de los que ya colaboran en el proyecto)

**Decisiones importantes:**
- **Normalización** (si usas MySQL): En lugar de colocar en la tabla de proyectos los ids o nombres de usuarios colaboradores en una columna adicional, se partió la relación muchos a muchos con una tabla intermedia para eliminar cualquier redundancia o duplicación de datos.
- **Índices**: Únicamente las llaves primarias de cada tabla ya que al ser un proyecto pequeño con solo 4 tablas, no demanda mucho tiempo de búsqueda
- **Relaciones**: A través de foreignkey con el formato nombresingularId. Ej: userId, projectId, etc. La relación de muchos a muchos también se manejó de esta manera con una tabla intermedia.

---

## 🔐 Seguridad

### Implementaciones de Seguridad

- [ ] **Hash de contraseñas**: [bcrypt]
- [ ] **JWT**: [3 horas, lo considero un estándar para tiempo de uso de un sistema]
- [ ] **Validación de inputs**: [¿Qué estrategia usaste?]
- [ ] **CORS**: [¿Cómo lo configuraste?]
- [ ] **Headers de seguridad**: [¿Usaste helmet? ¿Otras medidas?]
- [ ] **Rate limiting**: [Si lo implementaste, ¿cómo?]

### Consideraciones Adicionales

[¿Qué otras medidas de seguridad tomaste? ¿Qué vulnerabilidades consideraste?]

---

## 🎨 Decisiones de UI/UX

### Framework/Librería de UI

**Elegí**: [Ninguna / Material-UI / Ant Design / TailwindCSS / etc.]

**Razón**: [¿Por qué elegiste esto sobre otras opciones?]

### Patrones de Diseño

- **Responsive Design**: [Mobile first]
- **Loading States**: [Loading icons que se eliminan al terminar el tiempo de espera]
- **Error Handling**: [Indico qué error ocurrió]

### Decisiones de UX

[Explica algunas decisiones importantes de experiencia de usuario que tomaste]

---

## 🧪 Testing

### Estrategia de Testing

**Backend:**
- [Tipo de tests que escribiste]
- [¿Por qué elegiste probar estos endpoints/funciones específicamente?]
- [Herramientas usadas]

**Frontend:**
- [Tipo de tests que escribiste]
- [¿Qué componentes decidiste probar y por qué?]
- [Herramientas usadas]

### Cobertura

- **Backend**: [X%]
- **Frontend**: [X%]

[¿Por qué decidiste este nivel de cobertura dado el tiempo disponible?]

---

## 🐳 Docker

### Implementación

- [ ] Dockerfile backend
- [ ] Dockerfile frontend
- [ ] docker-compose.yml

**Decisiones:**
- [¿Por qué elegiste Alpine/Debian como base?]
- [¿Usaste multi-stage builds? ¿Por qué?]
- [¿Cómo optimizaste el tamaño de las imágenes?]

---

## ⚡ Optimizaciones

### Backend

- [Optimización 1 y por qué la implementaste]
- [Optimización 2]
- [etc.]

### Frontend

- [Optimización 1]
- [Optimización 2]
- [etc.]

---

## 🚧 Desafíos y Soluciones

### Desafío 1: [Nombre del desafío]

**Problema:**
[Describe el problema que enfrentaste]

**Solución:**
[Cómo lo resolviste]

**Aprendizaje:**
[Qué aprendiste de esto]

### Desafío 2: [Nombre del desafío]

**Problema:**
[Descripción]

**Solución:**
[Tu solución]

**Aprendizaje:**
[Qué aprendiste]

### Desafío 3: [Nombre del desafío]

**Problema:**
[Descripción]

**Solución:**
[Tu solución]

**Aprendizaje:**
[Qué aprendiste]

---

## 🎯 Trade-offs

### Trade-off 1: [Decisión]

**Opciones consideradas:**
- Opción A: [Descripción]
- Opción B: [Descripción]

**Elegí**: [Opción X]

**Razón:**
[Por qué elegiste esta opción sobre la otra. ¿Qué sacrificaste y qué ganaste?]

### Trade-off 2: [Decisión]

**Opciones consideradas:**
- [...]

**Elegí**: [...]

**Razón:**
[...]

---

## 🔮 Mejoras Futuras

Si tuviera más tiempo, implementaría:

1. **[Mejora 1]**
   - Descripción: [...]
   - Beneficio: [...]
   - Tiempo estimado: [...]

2. **[Mejora 2]**
   - Descripción: [...]
   - Beneficio: [...]
   - Tiempo estimado: [...]

3. **[Mejora 3]**
   - Descripción: [...]
   - Beneficio: [...]
   - Tiempo estimado: [...]

---

## 📚 Recursos Consultados

Lista de recursos que consultaste durante el desarrollo:

- [Documentación oficial de X]
- [Artículo sobre Y]
- [Stack Overflow thread sobre Z]
- [etc.]

---

## 🤔 Reflexión Final

### ¿Qué salió bien?

[Reflexiona sobre qué aspectos del proyecto consideras que hiciste particularmente bien]

### ¿Qué mejorarías?

[Con más tiempo o conocimiento, ¿qué harías diferente?]

### ¿Qué aprendiste?

[¿Qué nuevas habilidades o conocimientos adquiriste durante este proyecto?]

---

## 📸 Capturas de Pantalla

[Opcional: Agrega capturas de pantalla de tu aplicación]

### Login
![Login](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Lista de Proyectos
![Projects](./screenshots/projects.png)

### Detalle de Tareas
![Tasks](./screenshots/tasks.png)

---

**Fecha de última actualización**: [DD/MM/YYYY]
