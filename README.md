# Trabajo Final Lenguaje de Marcas: API de League of Legends 

Este proyecto es una API REST desarrollada con **Node.js** y **Express** para la asignatura de Lenguajes de Marcas. La temática elegida es: League of Legends.

## Descripción
La API permite gestionar una colección de **Campeones** (recurso principal) y sus **Skins** (recurso secundario). 

### Recursos
* **Campeones:** Contiene información detallada como rol, dificultad, tipo de daño, línea, región, etc.
* **Skins:** Colección relacionada con los campeones mediante el campo `campeonId`.

## Endpoints (En construcción)
| Método | Ruta | Descripción | Ejemplo de uso |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Comprobación del servidor. | `http://localhost:3000/` |
| **GET** | `/campeones` | Obtiene la lista completa de campeones. | `http://localhost:3000/campeones` |
| **GET** | `/campeones/:id` | Obtiene un campeón específico por su ID. | `http://localhost:3000/campeones/1` |
| **GET** | `/skins` | Obtiene la lista completa de skins. | `http://localhost:3000/skins` |

---
**Desarrollado por:** Pedro Enrique Traverso García
**Curso:** 1° DAM