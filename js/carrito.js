let carrito = $("#carrito");
console.log(carrito);
let label = $("#label");

let canasta = JSON.parse(localStorage.getItem("data")) || [];

let calcular = () => {
  let carrCont = $("#carrito-cont");
  carrCont.html(canasta.map((x) => x.item).reduce((x, y) => x + y, 0));
};

calcular();

let generarItems = () => {
  if (canasta.length !== 0) {
    return carrito.html(
      canasta
        .map((x) => {
          let { id, item } = x;
          let buscar = productosJuegos.find((x) => x.id === id) || [];
          let { img, precio, nombre } = buscar;
          return `
      <div class="item-carrito">
        <img width="100" src=${img} alt="" />

        <div class="detalles">
        
          <div class="titulo-precio-x">
            <h4 class="titulo-precio">
              <p>${nombre}</p>
              <p class="precio-item-carrito">S/. ${precio}</p>
            </h4>
            <i onclick="removerItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div>
            <div class="botonesProd">
              <i onclick="reducir(${id})" class="bi bi-dash-lg"></i>
              <div id=${id}>${item}</div>
              <i onclick="aumentar(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>

          <h3>S/. ${item * precio}</h3>
        
        </div>
      </div>
      `;
        })
        .join("")
    );
  } else {
    carrito.html("");
    label.html(`
    <h2>El carrito esta vacio</h2>
    <a href="index.html">
      <button class="BtnInicio">Volver al Inicio</button>
    </a>
    `);
  }
};

generarItems();

let aumentar = (id) => {
  let itemSeleccionado = id;
  let buscar = canasta.find((x) => x.id === itemSeleccionado.id);

  if (buscar === undefined) {
    canasta.push({
      id: itemSeleccionado.id,
      item: 1,
    });
  } else {
    buscar.item += 1;
  }

  generarItems();
  actualizar(itemSeleccionado.id);
  localStorage.setItem("data", JSON.stringify(canasta));
};

let reducir = (id) => {
  let itemSeleccionado = id;
  let buscar = canasta.find((x) => x.id === itemSeleccionado.id);

  if (buscar === undefined) return;
  else if (buscar.item === 0) return;
  else {
    buscar.item -= 1;
  }

  actualizar(itemSeleccionado.id);
  canasta = canasta.filter((x) => x.item !== 0);
  generarItems();
  localStorage.setItem("data", JSON.stringify(canasta));
};

let actualizar = (id) => {
  let buscar = canasta.find((x) => x.id === id);
  $(`#${id}`).html(buscar.item);
  calcular();
  MontoTotal();
};

let removerItem = (id) => {
  let itemSeleccionado = id;
  canasta = canasta.filter((x) => x.id !== itemSeleccionado.id);
  calcular();
  generarItems();
  MontoTotal();
  localStorage.setItem("data", JSON.stringify(canasta));
};

let MontoTotal = () => {
  if (canasta.length !== 0) {
    let monto = canasta
      .map((x) => {
        let { id, item } = x;
        let filtrarData = productosJuegos.find((x) => x.id === id);
        return filtrarData.precio * item;
      })
      .reduce((x, y) => x + y, 0);

    return label.html(`
    <h2>Monto Total : S/. ${monto}</h2>
    <button class="pagar">Pagar</button>
    <button onclick="limpiarCarrito()" class="limpiar">Limpiar Carrito</button>
    `);
  } else return;
};

MontoTotal();

let limpiarCarrito = () => {
  canasta = [];
  generarItems();
  calcular();
  localStorage.setItem("data", JSON.stringify(canasta));
};
