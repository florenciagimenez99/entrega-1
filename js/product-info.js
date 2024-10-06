document.addEventListener('DOMContentLoaded', function () {
  const productId = localStorage.getItem('productId');

  if (!productId) {
    window.location.href = 'products.html';
    return;
  }

  let autosId = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
  let comentariosId = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

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

  fetchJSONData(comentariosId).then(function (respObj) {
    console.log(respObj); // Agrega esto para verificar los datos obtenidos
    if (respObj.status === "ok") {
      mostrarComentarios(respObj.data);
    } else {
      console.error("Error al obtener los comentarios: ", respObj.data);
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
      </div>
=======
>>>>>>> Stashed changes
      <div class="borde">
      <h2 id="product-category">Categoría: ${producto.category}</h2>
      <h1 id="product-name">${producto.name}</h1>
        <h3 id="product-price">USD ${producto.cost}</h3>
        <p id="product-description">${producto.description}</p>
<<<<<<< Updated upstream
        <p id="sold-count">Se han vendido ${producto.soldCount}</p>
=======
        <div class="containerVendCat">
      <p id="sold-count">Se han vendido ${producto.soldCount}</p>
    
      </div>
>>>>>>> Stashed changes
        <input type="number" class="cntd" min="1"> <br>
        <button id="add-to-cart" class="btn btn-primary">AGREGAR AL CARRITO</button>
      </div>
    </div>
  </div>
`;

  // Set the innerHTML of the container
  container.innerHTML = card;


  // Obtener todas las estrellas
  const estrellas = document.querySelectorAll('.estrella');

  // Añadir evento de clic a cada estrella
  estrellas.forEach(estrella => {
    estrella.addEventListener('click', function () {
      // Obtener el valor de la estrella seleccionada
      const valorSeleccionado = this.getAttribute('data-valor');

      // Resetear todas las estrellas (remover la clase 'seleccionada')
      estrellas.forEach(e => {
        e.classList.remove('seleccionada');
      });

      // Marcar todas las estrellas hasta la seleccionada
      estrellas.forEach(e => {
        if (e.getAttribute('data-valor') <= valorSeleccionado) {
          e.classList.add('seleccionada');
        }
      });
    });
  });


}


//funcion comentarios
function mostrarComentarios(comentarios) {
  let container = document.getElementById('mostrarComentarios');

  // Generar comentarios en formato de tarjeta
  const comentariosHTML = comentarios.map(comentario => {
    return `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${comentario.user}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${new Date(comentario.dateTime).toLocaleString()}</h6>
          <p class="card-text">${comentario.description}</p>
          <div class="rating">
            ${mostrarEstrellas(comentario.score)}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Insertar los comentarios en el contenedor
  container.innerHTML = comentariosHTML;
}

function mostrarEstrellas(score) {
  let estrellasHTML = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      estrellasHTML += '<span class="fa fa-star checked" style="color: gold;"></span>';
    } else {
      estrellasHTML += '<span class="fa fa-star" style="color: gray;"></span>';
    }
  }

  return estrellasHTML;
}

// Desafiate:

document.addEventListener('DOMContentLoaded', () => {
  const enviarComentarioBtn = document.getElementById('enviarComentario');
  const mostrarComentarios = document.getElementById('mostrarComentarios');
  const estrellas = document.querySelectorAll('.estrella');
  let calificacion = 0;

  estrellas.forEach((estrella) => {
    estrella.addEventListener('click', () => {
      calificacion = estrella.dataset.valor;
      estrellas.forEach((estrella) => {
        estrella.classList.remove('checked');
      });
      for (let i = 0; i < calificacion; i++) {
        estrellas[i].classList.add('checked');
      }
    });
  });

  enviarComentarioBtn.addEventListener('click', () => {
    const usuario = document.getElementById('usuario').value.trim();
    const comentario = document.getElementById('comentario').value.trim();

    if (usuario && comentario && calificacion) {

      const comentarioItem = document.createElement('div');
      const estrellasHTML = Array.from({ length: 5 }, (_, index) => {
        return `<span class="fa fa-star ${index < calificacion ? 'checked' : ''}" style="color: ${index < calificacion ? 'gold' : 'gray'};"></span>`;
      }).join('');
      comentarioItem.classList.add('comentario-item', 'mb-2');
      comentarioItem.innerHTML = `
           
          <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${usuario} </h5>
          <h6 class="card-subtitle mb-2 text-muted"></h6>
          <p class="card-text">${comentario}</p>
          <div class="rating">
           ${estrellasHTML}
          </div>
        </div>
      </div>
          `;

      mostrarComentarios.appendChild(comentarioItem);

      document.getElementById('usuario').value = '';
      document.getElementById('comentario').value = '';
      calificacion = 0;
      estrellas.forEach((estrella) => {
        estrella.classList.remove('checked');
      });
    } else {
      alert('Por favor, completa todos los campos y selecciona una calificación.');
    }
  });
});
=======
//PRODUCTOS RELACIONADOS




>>>>>>> Stashed changes
