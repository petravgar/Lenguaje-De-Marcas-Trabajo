//Funcion para obtener los campeones de nuestra API
async function cargarCampeones() {
    const respuesta = await fetch('/campeones'); //Llamada al endpoint GET que creamos
    const datos = await respuesta.json(); //Convertimos la respuesta a JSON

    const lista = document.getElementById('campeones-lista'); //Obtenemos el elemento donde mostraremos los campeones
    lista.innerHTML = ''; //Limpiamos la lista antes de agregar los campeones

    datos.forEach(campeon => {
        const card = document.createElement('div'); //Creamos un div para cada campeón
        card.className = 'card'; //Le asignamos una clase para estilos
        card.innerHTML = `
            <h3>${campeon.nombre}</h3>
            <p><strong>Rol:</strong> ${campeon.rol}</p>
            <p><strong>Región:</strong> ${campeon.region}</p>
            <p><strong>Dificultad:</strong> ${campeon.dificultad}</p>
        `;
        lista.appendChild(card); //Agregamos la tarjeta a la lista
    });
}

cargarCampeones(); //Llamamos a la función para cargar los campeones al iniciar la página