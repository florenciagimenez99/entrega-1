let catID = localStorage.getItem("catID"); 
let catAutos = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

let fetchJSONData = function(url) {
    let result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
};

document.addEventListener("DOMContentLoaded", function() {
    fetchJSONData(catAutos).then(function(respObj) {
        if (respObj.status === "ok") {
            todosProductos = respObj.data.products; 
            mostrarProducts(todosProductos); 
        } else {
            console.error("Error al obtener los datos: ", respObj.data);
        }
    });

    document.getElementById('aplicarPrecio').addEventListener('click', function() {
        mostrarProducts(todosProductos); 
    });

    document.getElementById('aplicarOrden').addEventListener('click', function() {
        mostrarProducts(todosProductos); 
    });
});

function mostrarProducts(products) {
    let mostrar = document.getElementById("mostrar");
    mostrar.innerHTML = '';

    let minPrice = parseFloat(document.getElementById('precioMin').value) || 0;
    let maxPrice = parseFloat(document.getElementById('precioMax').value) || Infinity;
    let sortOption = document.getElementById('ordenar').value;

    products = products.filter(product => 
        product.cost >= minPrice && product.cost <= maxPrice
    );

    if (sortOption === 'menorAMayor') {
        products.sort((a, b) => a.cost - b.cost);
    } else if (sortOption === 'mayorAMenor') {
        products.sort((a, b) => b.cost - a.cost);
    }

    products.forEach((element) => {
        let cardHTML = `
            <div class="card" onclick='almacenamiento(${element.id})'>
                <div class="row g-0">
                    <div class="col-md-4 d-flex justify-content-center align-items-center">
                        <img src="${element.image}" class="img-fluid" alt="${element.name}" style="max-width: 170px; height: auto;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body text-center">
                            <h3 class="card-title">${element.name}</h3>
                            <h5 class="card-text">${element.currency} ${element.cost}</h5>
                            <p class="card-text">${element.description}</p>
                            <footer class="blockquote-footer">Se han vendido ${element.soldCount}</footer>
                        </div>
                    </div>
                </div>
            </div>
        `;
        mostrar.innerHTML += cardHTML;

        console.log(`${element.name}`);
        console.log(`El precio es ${element.currency} ${element.cost}`);
        console.log(`${element.description}`);
        console.log(`Se han vendido: ${element.soldCount}`);
        console.log('id:', element.id)
    });
}


var nombreUsuario = localStorage.getItem('usuario');
if (nombreUsuario) {
    document.getElementById('usuarioBarra').textContent = nombreUsuario;
}

function almacenamiento(elementId) {
    //Guardar el id del elemento en local storage

    localStorage.setItem("productId", elementId);

    window.location.href = '/product-info.html';
}



// document.addEventListener('DOMContentLoaded', function() {
//     // Obtener el ID de categoría de localStorage
//     let catID = localStorage.getItem("catID"); 
//     let catAutos = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

//     // Función para obtener datos JSON
//     let fetchJSONData = function(url) {
//         return fetch(url)
//             .then(response => response.json())
//             .then(data => ({ status: 'ok', data }))
//             .catch(error => ({ status: 'error', data: error }));
//     };

//     // Obtener datos de productos y mostrar
//     fetchJSONData(catAutos).then(function(respObj) {
//         if (respObj.status === "ok") {
//             const todosProductos = respObj.data.products; 
//             mostrarProducts(todosProductos); 
//         } else {
//             console.error("Error al obtener los datos: ", respObj.data);
//         }
//     });

//     // Aplicar filtros y orden
//     document.getElementById('aplicarPrecio').addEventListener('click', function() {
//         mostrarProducts(todosProductos); 
//     });
//     document.getElementById('aplicarOrden').addEventListener('click', function() {
//         mostrarProducts(todosProductos); 
//     });
// });

// function mostrarProducts(products) {
//     let mostrar = document.getElementById("mostrar");
//     mostrar.innerHTML = '';

//     let minPrice = parseFloat(document.getElementById('precioMin').value) || 0;
//     let maxPrice = parseFloat(document.getElementById('precioMax').value) || Infinity;
//     let sortOption = document.getElementById('ordenar').value;

//     // Filtrar productos
//     products = products.filter(product => 
//         product.cost >= minPrice && product.cost <= maxPrice
//     );

//     // Ordenar productos
//     if (sortOption === 'menorAMayor') {
//         products.sort((a, b) => a.cost - b.cost);
//     } else if (sortOption === 'mayorAMenor') {
//         products.sort((a, b) => b.cost - a.cost);
//     }

//     // Mostrar productos
//     products.forEach((element) => {
//         let cardHTML = `
//             <div class="col-md-4 mb-4">
//                 <a href="/product-info.html" class="product-card" data-id="${element.id}">
//                     <div class="card">
//                         <img src="${element.image}" class="card-img-top" alt="${element.name}">
//                         <div class="card-body">
//                             <h5 class="card-title">${element.name}</h5>
//                             <p class="card-text">${element.currency} ${element.cost}</p>
//                         </div>
//                     </div>
//                 </a>
//             </div>
//         `;
//         mostrar.innerHTML += cardHTML;
//     });

//     // Agregar eventos a los enlaces de las tarjetas
//     document.querySelectorAll('.product-card').forEach(link => {
//         link.addEventListener('click', function() {
//             const productId = this.getAttribute('data-id');
            localStorage.setItem('productId', productId);
//         });
//     });
// }
