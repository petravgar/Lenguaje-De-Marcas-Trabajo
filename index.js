const express = require('express');
const app = express();
const PORT = 3000;

//Entender JSON
app.use(express.json());
app.use(express.static('public')); //Middleware para servir archivos estáticos desde la carpeta "public"

//Recurso principal: Campeones del LoL
let campeones = [
    {
        id: 1,
        nombre: "Viego",
        rol: "Asesino",
        dificultad: 3,
        daño: "Físico",
        posicion: "Jungla",
        esMelee: true,
        region: "Islas de las sombras"

    },

    {
        id: 2, 
        nombre: "Garen", 
        rol: "Luchador", 
        dificultad: 1, 
        daño: "Físico", 
        posicion: "Top", 
        esMelee: true, 
        region: "Demacia"
    },

    { 
        id: 3, 
        nombre: "Aphelios", 
        rol: "Tirador", 
        dificultad: 3, 
        daño: "Físico", 
        linea: "Bot", 
        esMelee: false, 
        region: "Targon" 
    },

    { 
        id: 4, 
        nombre: "Sylas", 
        rol: "Luchador", 
        dificultad: 3, 
        daño: "Mágico", 
        linea: "Mid", 
        esMelee: true, 
        region: "Demacia, Freljord" 
    }


];

//Recurso secundario: skins del LoL

let skins = [
    {
        id: 1,
        campeonId: 1,
        nombre: "Viego Rey Renacido",
        precio: 250
    },
    {
        id: 2,
        campeonId: 2,
        nombre: "Garen Academia de Combate",
        precio: 10
    },
    {
        id: 3,
        campeonId: 3,
        nombre: "Aphelios Bestia Lunar",
        precio: 10
    },
    {
        id: 4,
        campeonId: 4,
        nombre: "Sylas Estrella Oscura",
        precio: 20
    }
];

//GET - Obtener datos

//Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor de League of Legends está funcionando'); //Respuesta simple para verificar que el servidor está activo
});

//Endpoint para obtener todos los campeones
app.get('/campeones', (req, res) => { //Cuando se accede a esta ruta, se devuelve la lista completa de campeones en formato JSON
    res.status(200).json(campeones); //El código de estado 200 indica que la solicitud es correcta
});

//Endpoint para obtener un campeón por su id
app.get('/campeones/:id', (req,res) => {
    const id = parseInt(req.params.id); //Extraigo el id de los parámetros de la ruta y lo convertimos a un número entero
    const campeon = campeones.find(c => c.id === id); //Busco el campeón en la lista de campeones utilizando el método find, que devuelve el primer elemento que cumple la condición (en este caso, que el id del campeón sea igual al id proporcionado en la ruta)

    if (campeon) { //Si se encuentra el campeón, se devuelve su información en formato JSON con un código de estado 200, sino, se devuelve un mensaje de error con un código de estado 404 indicando que el campeón no fue encontrado
        res.status(200).json(campeon);
    }
    else {
        res.status(404).json({ mensaje: "Campeón no encontrado" });
    }
});

//Endpoint para obtener todas las skins
app.get('/skins', (req, res) => { 
    res.status(200).json(skins);
});

//POST - Crear nuevo campeón
app.post('/campeones', (req, res) => {
    const nuevoCampeon = req.body;
    
    //Validación:
    if (!nuevoCampeon.nombre || !nuevoCampeon.rol) {
        return res.status(400).json({
            mensaje: "Bad Request: Los campos 'nombre' y 'rol' son obligatorios"

        });
    }

    //Generar ID automático (buscando el último y sumando 1)
    const nuevoId = campeones.length > 0 ? campeones[campeones.length - 1].id + 1 : 1;

    //Creamos el objeto con el id generadl y los datos que hemos recibido
    const campeonGuardar = { id: nuevoId, ...nuevoCampeon };

    campeones.push(campeonGuardar);

    //Respuesta con éxito: 201 Created
    res.status(201).json({
        mensaje: "Campeón creado correctamente",
        campeon: campeonGuardar
    });
});

//DELETE - Eliminar un campeón por ID
app.delete('/campeones/:id', (req, res) => {
    const id = parseInt(req.params.id);
    //Buscamos el índice del campeón en el array
    const indice = campeones.findIndex(c => c.id === id);

    if (indice !== -1) { //Si el índice es diferente de -1, significa que se encontró el campeón y se puede eliminar
        const campeonEliminado = campeones.splice(indice, 1);
        res.status(200).json({
            mensaje: "Campeón eliminado correctamente",
            campeon: campeonEliminado[0] //splice devuelve un array con el elemento eliminado, por eso accedemos al primer elemento
        });
    }
    else { 
        res.status(404).json({  //En caso de que no se encuentre, se devuelve un mensaje de error con el código 404
            mensaje: "Error: No se ha encontrado el campeón con ese ID"
        });
    }
});

//ENDPOINTS DE ESTADÍSTICAS

//(Get) - Obtener estadísticas generales
app.get('/estadisticas/count', (req,res) => {
        res.status(200).json({ 
        totalCampeones: campeones.length, // Contamos el numero de campeones utilizando la propiedad length
        totalSkins: skins.length //Contamos el numero de skins
    });
});

//(Get) - Calcular la dificultad media de los campeones
app.get('/estadisticas/dificultad-media', (req,res) => {
    if (campeones.length === 0) {
        return res.status(200).json({ media: 0});//Si no hay campeones, la dificultad media es 0
    }
    const sumaDificultad = campeones.reduce((acc, c) => acc + c.dificultad, 0); //Sumamos la dificultad de todos los campeones utilizando reduce
    const media = sumaDificultad / campeones.length; //Calculamos la media dividiendo la suma total entre el numero de campeones

    res.status(200).json({
        mensaje: "Cálculo de la dificultad media realizado",
        dificultadmEDIA: media.toFixed(2) //Limitamos a 2 decimales
    });
});

//ENDPOINTS DE BUSQUEDA Y FILTROS
//(Get) - Filtrar campeones
app.get('/campeones/search/filter', (req,res) => {
    let resultados = [...campeones]; //Creamos una copia del array de campeones para aplicar los filtros
    const { region, dificultadMax, esMelee } = req.query; //Extraemos los parámetros de consulta (query) de la URL

    //1. Filtro por región
    if (region) {
        resultados = resultados.filter(c => c.region.toLowerCase().includes(region.toLowerCase())); //Convertimos ambos valores a minúsculas 
    }

    //2. Filtro por dificultad máxima
    if (dificultadMax) {
        resultados = resultados.filter(c => c.dificultad <= parseInt(dificultadMax)); //Convertimos el valor de dificultadMax a un número entero para compararlo con la dificultad de cada campeón
    }
    //3. Filtro por esMelee
    if (esMelee !== undefined) { //Verificamos que el parámetro esMelee esté presente en la consulta
        const valorFiltro = esMelee === 'true'; //Convertimos el string a booleano
        resultados = resultados.filter(c => c.esMelee === valorFiltro);
    }
    res.status(200).json(resultados);
});

//OPERACIONES CON LOS RECURSOS SECUNDARIOS
//(Get) - Obtener todas las skins de un campeon por su ID
app.get('/campeones/:id/skins', (req,res) => {
    const idCampeon = parseInt(req.params.id);
    //Filtramos el array de skins buscando las que coincidan con campeonId
    const skinsDelCampeon = skins.filter(s => s.campeonId === idCampeon);

    if (skinsDelCampeon.length > 0) { //Si se encuentran skins para ese campeón, se devuelven en formato JSON con un código de estado 200, sino, se devuelve un mensaje de error con un código de estado 404 indicando que no se encontraron skins para ese campeón
        res.status(200).json(skinsDelCampeon);
    }
    else {
        res.status(404).json({
            mensaje: "No se encontraron skins para este campeón o este no existe"
        });
    }
});
//Arrancamos el Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});