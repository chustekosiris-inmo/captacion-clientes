// Esperamos a que toda la página HTML cargue antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {

  // Buscamos el formulario en el HTML por su id
  var formulario = document.getElementById("formulario-contacto");

  // Cuando el usuario hace clic en "Enviar", se ejecuta esta función
  formulario.addEventListener("submit", function (evento) {

    // Evitamos que la página se recargue (comportamiento por defecto de los formularios)
    evento.preventDefault();

    // Leemos el valor de cada campo que completó el usuario
    var nombre   = document.getElementById("nombre").value.trim();
    var email    = document.getElementById("email").value.trim();
    var telefono = document.getElementById("telefono").value.trim();
    var mensaje  = document.getElementById("mensaje").value.trim();

    // Creamos un objeto (como una ficha) con los datos del cliente
    var nuevoCliente = {
      nombre:   nombre,
      email:    email,
      telefono: telefono,
      mensaje:  mensaje,
      fecha:    new Date().toLocaleString("es-AR") // guardamos cuándo se registró
    };

    // Cargamos la lista de clientes ya guardados desde el almacenamiento del navegador
    // Si no hay ninguno todavía, usamos una lista vacía []
    var clientesGuardados = JSON.parse(localStorage.getItem("clientes") || "[]");

    // Agregamos el nuevo cliente al final de la lista
    clientesGuardados.push(nuevoCliente);

    // Guardamos la lista actualizada de vuelta en el navegador
    // JSON.stringify convierte la lista a texto para poder guardarla
    localStorage.setItem("clientes", JSON.stringify(clientesGuardados));

    // Limpiamos el formulario para que quede vacío
    formulario.reset();

    // Mostramos el mensaje de éxito que está oculto en el HTML
    var avisoExito = document.getElementById("mensaje-exito");
    avisoExito.style.display = "block";

    // Ocultamos el mensaje después de 3 segundos
    setTimeout(function () {
      avisoExito.style.display = "none";
    }, 3000);
  });

});
