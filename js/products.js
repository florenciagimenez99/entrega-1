let catAutos = "https://japceibal.github.io/emercado-api/cats_products/101.json"; 

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
            mostrarAutos(respObj.data.products); 
        } else {
            console.error("Error al obtener los datos: ", respObj.data);
        }
    });
});

function mostrarAutos(products) {
    let mostrar = document.getElementById("mostrar"); 
    mostrar.innerHTML = '';

    products.forEach((element) => {
        let cardHTML = `
             <div class="card">
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center align-items-center">
      <img src="${element.image}" class="img-fluid" class="img-auto" alt="${element.name}" style="max-width: 170px; height: auto;">
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
    });
} 

var nombreUsuario = localStorage.getItem('usuario');

if (nombreUsuario) {
    document.getElementById('usuarioBarra').textContent = nombreUsuario;
}

