let carrito = document.getElementById("carrito-cont");
let addProducto = document.getElementsByClassName('addCar');
for (let boton of addProducto) {
    boton.setAttribute("cantComprar", 0);
    boton.addEventListener(
        'click', (e) => {
            let contador = +carrito.innerHTML;
            carrito.innerHTML = contador + 1;
        }
    )
}

let prod1 = +document.getElementById("subtotalProd1").innerHTML;
let prod2 = +document.getElementById("subtotalProd2").innerHTML;
let prod3 = +document.getElementById("subtotalProd3").innerHTML;

function calcPrecioFinal() {
    let cant1 = +document.getElementById("cantProd1").value;
    let cant2 = +document.getElementById("cantProd2").value;
    let cant3 = +document.getElementById("cantProd3").value;
    let total = prod1 * cant1 + prod2 * cant2 + prod3 * cant3;
    let subtotal = +((total / 1.18).toFixed(2));
    let impuesto = +((total - subtotal).toFixed(2));
    document.getElementById("subtotal").innerHTML = subtotal;
    document.getElementById("impuesto").innerHTML = impuesto;
    document.getElementById("total").innerHTML = total;
}