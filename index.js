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