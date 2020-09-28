import { mostrarAlerta,validar } from './funciones.js';
import { editarCliente, obtenerCliente } from './API.js';
(function() {
    // campos formulario
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const empresaInput = document.querySelector('#empresa');
    const telefonoInput = document.querySelector('#telefono');
    const idInput = document.querySelector('#id');


    document.addEventListener('DOMContentLoaded', async () => {
        const parametrosUrl = new URLSearchParams(window.location.search);
        const idCliente = parseInt(parametrosUrl.get('id'));

        const cliente = await obtenerCliente(idCliente);

        mostrarCliente(cliente);

        // submit al formulario
        const formulario = document.querySelector('#formulario');
        formulario.addEventListener('submit', validarCliente);
    });

    function mostrarCliente(cliente){
        const { nombre,empresa,email,telefono,id} = cliente;
        nombreInput.value = nombre;
        empresaInput.value = empresa;
        emailInput.value = email;
        telefonoInput.value = telefono;
        idInput.value = id;
    }

    function validarCliente(e){
        e.preventDefault();
        // Campos del formulario
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;
        // validar
        const cliente = {
            nombre: nombreInput.value,
            email : emailInput.value,
            telefono : telefonoInput.value,
            empresa : empresaInput.value,
            id : parseInt(idInput.value)
        }
        if(!validar(cliente)){
            //mensaje alerta
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }
        // reescribe el objeto
        editarCliente(cliente);
    }
})();