const express = require('express');
const app = express();
const PORT = 3000;

//Entender JSON
app.use(express.json());

//Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor de League of Legends está funcionando');
});

//Arrancamos el Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`); 
});

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