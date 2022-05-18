const socket = io();

// const params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesario');
}

const usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function () {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (resp) => {

        // console.log('Usuarios conectados: ', resp);
        renderizarUsuarios(resp);

    });
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', (mensaje) => {

    // console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();

});

// Escuchar cambios de usuarios
// cuando un usuario sale del chat
socket.on('listaPersonas', (personas) => {

    // console.log(personas);
    renderizarUsuarios(personas);

});

// Mensajes privados
socket.on('mensajePrivado', (mensaje) => {
    console.log('Mensaje privado: ', mensaje);
})