// Función fetchJSONData fuera de DOMContentLoaded
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
      .then(response => {
          result.status = 'ok';
          result.data = response;
          return result;
      })
      .catch(error => {
          result.status = 'error';
          result.data = error;
          return result;
      });
};

document.addEventListener('DOMContentLoaded', function () {
  const productId = localStorage.getItem('productId');

  if (!productId) {
      window.location.href = 'products.html';
      return;
  }

  const productUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
  const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

  fetchJSONData(productUrl).then(respObj => {
      if (respObj.status === "ok") {
          mostrarProducto(respObj.data);
      } else {
          console.error("Error al obtener los datos: ", respObj.data);
      }
  });

  fetchJSONData(commentsUrl).then(respObj => {
      if (respObj.status === "ok") {
          mostrarComentarios(respObj.data);
      } else {
          console.error("Error al obtener los comentarios: ", respObj.data);
      }
  });

  // Lógica para el envío de nuevos comentarios
  document.getElementById('enviarComentario').addEventListener('click', function () {
      const usuario = document.getElementById('usuario').value;
      const comentario = document.getElementById('comentario').value;
      const calificacion = document.querySelector('.calificacion .estrella.checked')?.getAttribute('data-valor');

      if (usuario && comentario && calificacion) {
          agregarComentario(usuario, comentario, calificacion);
      } else {
          alert('Por favor completa todos los campos.');
      }
  });

  // Inicializar el evento de las estrellas
  document.querySelectorAll('.calificacion .estrella').forEach(star => {
      star.addEventListener('click', () => {
          const valor = star.dataset.valor;
          document.querySelectorAll('.calificacion .estrella').forEach(s => {
              s.classList.remove('checked');
          });
          for (let i = 0; i < valor; i++) {
              document.querySelectorAll('.calificacion .estrella')[i].classList.add('checked');
          }
      });
  });

  // Funciones de mostrarProducto y mostrarComentarios
  function mostrarProducto(producto) {
      let container = document.getElementById('mostrarProducto');

      const carouselItems = producto.images.map((image, index) => `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${image}" class="d-block w-100" alt="Imagen de ${producto.name}">
          </div>
      `).join('');

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
                  <div class="borde">
                      <h2 id="product-category">Categoría: ${producto.category}</h2>
                      <h1 id="product-name">${producto.name}</h1>
                      <h3 id="product-price">USD ${producto.cost}</h3>
                      <p id="product-description">${producto.description}</p>
                      <p id="sold-count">Se han vendido ${producto.soldCount}</p>
                      <input type="number" class="cntd" min="1"> <br>
                      <button id="add-to-cart" class="btn btn-primary">AGREGAR AL CARRITO</button>
                  </div>
              </div>
          </div>
      </div>
      `;

      container.innerHTML = card;

      // Llamo a la función para mostrar productos relacionados
      mostrarProductosRelacionados(producto.category);
  }

  function mostrarProductosRelacionados(catID) {
      const container = document.querySelector('.related-products-container');
      const relatedProductsUrl = `https://japceibal.github.io/emercado-api/cats_products/101.json`;

      fetchJSONData(relatedProductsUrl).then(respObj => {
          if (respObj.status === "ok") {
              const productsHTML = respObj.data.products.map(prod => `
                  <div class="related-product" data-id="${prod.id}">
                      <img src="${prod.image}" alt="${prod.name}" />
                      <h3>${prod.name}</h3>
                      <p>USD ${prod.cost}</p>
                      <button class="btn btn-secondary ver-producto">Ver producto</button>
                  </div>
              `).join('');

              container.innerHTML = productsHTML || '<p>No se encontraron productos relacionados.</p>';

              // Agregar el evento de clic a cada botón "Ver producto"
              document.querySelectorAll('.ver-producto').forEach(button => {
                  button.addEventListener('click', function () {
                      const productId = this.parentElement.getAttribute('data-id');
                      verProducto(productId);
                  });
              });
          } else {
              console.error("Error al obtener productos de la categoría: ", respObj.data);
              container.innerHTML = '<p>Error al cargar productos relacionados. Verifique la categoría.</p>';
          }
      }).catch(error => {
          console.error("Error al obtener productos de la categoría: ", error);
          container.innerHTML = '<p>Error al cargar productos relacionados. Por favor intente más tarde.</p>';
      });
  }

  function verProducto(id) {
      localStorage.setItem('productId', id); // Almacena el ID del producto en el localStorage
      window.location.href = `product-info.html?id=${id}`; // Redirige al usuario
  }

//   function mostrarComentarios(comentarios) {
//       let container = document.getElementById('mostrarComentarios');

//       const comentariosHTML = comentarios.map(comentario => `
//           <div class="card mb-3">
//               <div class="card-body">
//                   <h5 class="card-title">${comentario.user}</h5>
//                   <h6 class="card-subtitle mb-2 text-muted">${new Date(comentario.dateTime).toLocaleString()}</h6>
//                   <p class="card-text">${comentario.description}</p>
//                   <div class="rating">
//                       ${mostrarEstrellas(comentario.score)}
//                   </div>
//               </div>
//           </div>
//       `).join('');

//       container.innerHTML = comentariosHTML;
//   }

//   function mostrarEstrellas(score) {
//       let estrellasHTML = '';
//       for (let i = 1; i <= 5; i++) {
//           estrellasHTML += i <= score ? 
//               '<span class="fa fa-star checked" style="color: gold;"></span>' : 
//               '<span class="fa fa-star" style="color: gray;"></span>';
//       }
//       return estrellasHTML;
//   }

//   function agregarComentario(usuario, comentario, calificacion) {
//       const nuevoComentario = `
//           <div class="card mb-3">
//               <div class="card-body">
//                   <h5 class="card-title">${usuario}</h5>
//                   <h6 class="card-subtitle mb-2 text-muted">${new Date().toLocaleString()}</h6>
//                   <p class="card-text">${comentario}</p>
//                   <div class="rating">${mostrarEstrellas(calificacion)}</div>
//               </div>
//           </div>
//       `;

//       const container = document.getElementById('mostrarComentarios');
//       container.innerHTML += nuevoComentario;

//       // Limpiar los campos después de enviar
//       document.getElementById('usuario').value = '';
//       document.getElementById('comentario').value = '';
//       document.querySelectorAll('.calificacion .estrella').forEach(star => star.classList.remove('checked'));
//   }
});


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
})