let tienda = $("#tienda");
let canasta = JSON.parse(localStorage.getItem("data")) || [];

let generarTienda = function () {
  return tienda.html(
    productosJuegos
      .map((x) => {
        let { id, nombre, precio, img } = x;
        let buscar = canasta.find((y) => y.id === id) || [];
        return `
                    <div id=producto-id-${id} class="item">
                        <img width="220" src=${img} alt="">
                        <div class="detalles text-center">
                            <h3 class="fw-bolder">${nombre}</h3>
                            <div class="precio">
                                <h4>S/. ${precio}</h4>
                                <div class="botonesProd">
                                    <i onclick="reducir(${id})" class="bi bi-dash-lg"></i>
                                    <div id=${id}>
                                        ${
                                          buscar.item === undefined
                                            ? 0
                                            : buscar.item
                                        }
                                    </div>
                                    <i onclick="aumentar(${id})" class="bi bi-plus-lg"></i>
                                </div>
                            </div>
                        </div>
                    </div>`;
      })
      .join("")
  );
};

generarTienda();

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

  console.log(canasta);
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
  console.log(canasta);
  localStorage.setItem("data", JSON.stringify(canasta));
};

let actualizar = (id) => {
  let buscar = canasta.find((x) => x.id === id);
  $(`#${id}`).html(buscar.item);
  calcular();
};

let calcular = () => {
  let iconoCarrito = $("#carrito-cont");
  iconoCarrito.html(canasta.map((x) => x.item).reduce((x, y) => x + y, 0));
};

calcular();
