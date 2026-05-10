document.addEventListener("DOMContentLoaded", function () {

  // Buscamos el contenedor donde vamos a mostrar las tarjetas de clientes
  var contenedor = document.getElementById("lista-clientes");

  // Buscamos el botón para borrar todos los clientes
  var btnLimpiar = document.getElementById("btn-limpiar");

  // Esta función dibuja todos los clientes guardados en la pantalla
  function mostrarClientes() {

    // Leemos la lista guardada en el navegador
    var clientes = JSON.parse(localStorage.getItem("clientes") || "[]");

    // Vaciamos lo que había antes para redibujar desde cero
    contenedor.innerHTML = "";

    // Si no hay clientes, mostramos un mensaje
    if (clientes.length === 0) {
      contenedor.innerHTML = '<p class="sin-clientes">Todavía no hay clientes registrados.</p>';
      return;
    }

    // Recorremos cada cliente y creamos una tarjeta HTML para cada uno
    // Usamos slice().reverse() para mostrar el más reciente primero
    clientes.slice().reverse().forEach(function (cliente) {

      // Creamos un elemento div que será la tarjeta
      var tarjeta = document.createElement("div");
      tarjeta.className = "cliente-card";

      // Llenamos la tarjeta con los datos del cliente
      // El || "—" significa: si el campo está vacío, mostrar un guión
      tarjeta.innerHTML =
        '<p class="nombre">' + cliente.nombre + "</p>" +
        '<p class="detalle">📧 ' + (cliente.email    || "—") + "</p>" +
        '<p class="detalle">📞 ' + (cliente.telefono || "—") + "</p>" +
        (cliente.mensaje
          ? '<div class="mensaje-texto">💬 ' + cliente.mensaje + "</div>"
          : "") +
        '<p class="fecha">Registrado el ' + cliente.fecha + "</p>";

      // Agregamos la tarjeta al contenedor en la página
      contenedor.appendChild(tarjeta);
    });
  }

  // Ejecutamos la función al cargar la página para mostrar los clientes existentes
  mostrarClientes();

  // Cuando el usuario hace clic en "Borrar todo"
  btnLimpiar.addEventListener("click", function () {

    // Pedimos confirmación antes de borrar (para evitar errores)
    var confirmar = confirm("¿Seguro que querés borrar todos los clientes? Esta acción no se puede deshacer.");

    if (confirmar) {
      // Borramos la lista del almacenamiento del navegador
      localStorage.removeItem("clientes");

      // Actualizamos la pantalla
      mostrarClientes();
    }
  });

});
