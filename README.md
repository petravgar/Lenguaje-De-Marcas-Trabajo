# Trabajo Final Lenguaje de Marcas: API de League of Legends 

Este proyecto es una API REST desarrollada con **Node.js** y **Express** para la asignatura de Lenguajes de Marcas. La temática elegida es: League of Legends.

## Descripción
La API permite gestionar una colección de **Campeones** (recurso principal) y sus **Skins** (recurso secundario). 

### Recursos
* **Campeones:** Contiene información detallada como rol, dificultad, tipo de daño, línea, región, etc.
* **Skins:** Colección relacionada con los campeones mediante el campo `campeonId`.

## Endpoints
| Método | Ruta | Descripción | Ejemplo de uso |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Comprobación del servidor. | `http://localhost:3000/` |
| **GET** | `/campeones` | Obtiene la lista completa de campeones. | `http://localhost:3000/campeones` |
| **GET** | `/campeones/:id` | Obtiene un campeón específico por su ID. | `http://localhost:3000/campeones/1` |
| **GET** | `/skins` | Obtiene la lista completa de skins. | `http://localhost:3000/skins` |
| **POST** | `/campeones` | Crea un nuevo campeón (requiere nombre y rol). | `http://localhost:3000/campeones` |
| **DELETE** | `/campeones/:id` | Elimina un campeón de la lista según su ID. | `http://localhost:3000/campeones/2` |
| **GET** | `/estadisticas/count` | Obtiene el total de registros de cada recurso. | `http://localhost:3000/estadisticas/count` |
| **GET** | `/estadisticas/dificultad-media` | Calcula la media de dificultad de los campeones. | `http://localhost:3000/estadisticas/dificultad-media` |
| **GET** | `/campeones/search/filter` | Filtra por región, dificultad máxima o melee (Query Params). | `http://localhost:3000/campeones/search/filter?region=Demacia&dificultadMax=2` |
| **GET** | `/campeones/:id/skins` | Obtiene todas las skins asociadas a un campeón específico. | `http://localhost:3000/campeones/1/skins` |

---

## Interfaz Frontend
Se ha implementado una interfaz visual en la carpeta `/public` que consume la API de forma dinámica mediante JavaScript (Fetch API).

## Herramientas utilizadas
* **Backend:** Node.js y Express.
* **Pruebas:** Bruno (Colección exportada incluida en el repositorio).
* **Frontend:** HTML5, CSS3 y JavaScript.

---


**Desarrollado por:** Pedro Enrique Traverso García

**Curso:** 1° DAM