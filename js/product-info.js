document.addEventListener('DOMContentLoaded', function () {
  const productId = localStorage.getItem('productId');

  if (!productId) {
    window.location.href = 'products.html';
    return;
  }

  let autosId = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

  let fetchJSONData = function (url) {
    let result = {};
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(function (response) {
        result.status = 'ok';
        result.data = response;
        return result;
      })
      .catch(function (error) {
        result.status = 'error';
        result.data = error;
        return result;
      });
  };

  let producto;

  fetchJSONData(autosId).then(function (respObj) {
    if (respObj.status === "ok") {
      producto = respObj.data;
      mostrarProducto(producto)
    } else {
      console.error("Error al obtener los datos: ", respObj.data);
    }
  });
});

function mostrarProducto(producto) {
  let container = document.getElementById('mostrarProducto');

  // Build carousel items as an array of HTML strings
  const carouselItems = producto.images.map((element, index) => {
    return `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <img src="${element}" class="d-block w-100" alt="...">
    </div>
  `;
  }).join('');

  // Construct the complete card HTML
  const card = `
  <div class="container-info mt-4">
    <div id="carouselExample" class="carousel slide pointer-event">
      <h1 id="product-name">${producto.name}</h1>
      <div class="carousel-inner">
        ${carouselItems}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="product-info-description mt-4">
      <div class="containerVendCat">
      <p id="sold-count">Se han vendido ${producto.soldCount}</p>
      <h2 id="product-category">Categoría: ${producto.category}</h2>
      </div>
      <div class="borde">
        <h3 id="product-price">USD ${producto.cost}</h3>
        <p id="product-description">${producto.description}</p>
        <input type="number" class="cntd" min="1"> <br>
        <button id="add-to-cart" class="btn btn-primary">AGREGAR AL CARRITO</button>
      </div>
    </div>
  </div>
`;

  // Set the innerHTML of the container
  container.innerHTML = card;

}