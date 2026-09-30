// =========================================================
// VARIELET - JAVASCRIPT PRINCIPAL
// =========================================================

console.log("Varielet: JavaScript cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {

    console.log("Varielet: página cargada correctamente");
  
  
  
    // =====================================================
    // DATOS DE PRODUCTOS
    // =====================================================

    const productos = {

        "taza-momentos": {
            nombre: "Taza Momentos",
            categoria: "Tazas y vasos",
            precio: "Desde RD$650",
            imagen: "img/taza-momentos.jpg",
            descripcion: "Una taza personalizada para convertir momentos especiales en recuerdos únicos."
        },

        "vaso-brilla": {
            nombre: "Vaso Brilla",
            categoria: "Tazas y vasos",
            precio: "Desde RD$850",
            imagen: "img/vaso-brilla.jpg",
            descripcion: "Vaso personalizado ideal para regalar y celebrar momentos especiales."
        },

        "termo-aura": {
            nombre: "Termo Aura",
            categoria: "Termos",
            precio: "Desde RD$1,250",
            imagen: "img/termo-aura.jpg",
            descripcion: "Termo personalizado pensado para acompañarte durante el día con un diseño único."
        },

        "libreta-tus-ideas": {
            nombre: "Libreta Tus Ideas",
            categoria: "Libretas",
            precio: "Desde RD$780",
            imagen: "img/libreta-tus-ideas.jpg",
            descripcion: "Libreta personalizada para escribir, organizar y guardar tus ideas."
        },

        "camiseta-equipo": {
            nombre: "Camiseta Equipo",
            categoria: "Camisetas",
            precio: "Desde RD$950",
            imagen: "img/camiseta-equipo.jpg",
            descripcion: "Camiseta personalizada ideal para equipos, grupos y ocasiones especiales."
        },

        "llavero-inicial": {
            nombre: "Llavero Inicial",
            categoria: "Llaveros",
            precio: "Desde RD$350",
            imagen: "img/llavero-inicial.jpg",
            descripcion: "Llavero personalizado con iniciales para llevar un detalle especial contigo."
        },

        "recuerdo-madera": {
            nombre: "Recuerdo en Madera",
            categoria: "Grabados en madera",
            precio: "Desde RD$1,450",
            imagen: "img/recuerdo-madera.jpg",
            descripcion: "Pieza personalizada en madera para conservar momentos importantes."
        },

        "caja-celebra": {
            nombre: "Caja Celebra",
            categoria: "Regalos",
            precio: "Desde RD$1,850",
            imagen: "img/caja-celebra.jpg",
            descripcion: "Caja personalizada para sorprender y celebrar una ocasión especial."
        },

        "kit-nuestra-boda": {
            nombre: "Kit Nuestra Boda",
            categoria: "Eventos",
            precio: "Cotizar",
            imagen: "img/kit-nuestra-boda.jpg",
            descripcion: "Kit personalizado para complementar momentos especiales de una boda."
        }

    };


        // =====================================================
    // CARGAR PRODUCTO SEGÚN LA URL
    // =====================================================

    const parametrosURL = new URLSearchParams(window.location.search);
    const productoID = parametrosURL.get("id");

    const productoActual = productos[productoID];

    if (productoActual) {

        const productName = document.querySelector(".product-information h1");
        const productCategory = document.querySelector(".product-category");
        const productPrice = document.querySelector(".product-price");
        const productDescription = document.querySelector(".product-description");
        const productImage = document.querySelector(".product-main-image");

        if (productName) {
            productName.textContent = productoActual.nombre;
        }

        if (productCategory) {
            productCategory.textContent = productoActual.categoria;
        }

        if (productPrice) {
            productPrice.textContent = productoActual.precio;
        }

        if (productDescription) {
            productDescription.textContent = productoActual.descripcion;
        }

        if (productImage) {
            productImage.src = productoActual.imagen;
            productImage.alt = productoActual.nombre;
        }

        console.log("Producto cargado:", productoActual.nombre);

    }
       // =====================================================
    // PRODUCTO
    // =====================================================

    const colorOptions = document.querySelectorAll(".color-option");
    const quantityInput = document.querySelector("#quantity");
    const decreaseQuantity = document.querySelector("#decreaseQuantity");
    const increaseQuantity = document.querySelector("#increaseQuantity");

    // =====================================================
    // SELECCIÓN DE COLOR
    // =====================================================

    colorOptions.forEach(option => {

        option.addEventListener("click", () => {

            colorOptions.forEach(color => {
                color.classList.remove("active");
            });

            option.classList.add("active");

            console.log(
                "Color seleccionado:",
                option.textContent.trim()
            );

        });

    });

    // =====================================================
    // DISMINUIR CANTIDAD
    // =====================================================

    if (decreaseQuantity && quantityInput) {

        decreaseQuantity.addEventListener("click", () => {

            let cantidad = parseInt(quantityInput.value);

            if (cantidad > 1) {
                cantidad--;
                quantityInput.value = cantidad;
            }

        });

    }

    // =====================================================
    // AUMENTAR CANTIDAD
    // =====================================================

    if (increaseQuantity && quantityInput) {

        increaseQuantity.addEventListener("click", () => {

            let cantidad = parseInt(quantityInput.value);

            cantidad++;
            quantityInput.value = cantidad;

        });

    }

        // =====================================================
    // SOLICITAR COTIZACIÓN
    // =====================================================

    const quoteProductButton = document.querySelector("#quoteProductButton");
    const customizationInput = document.querySelector("#customization");

    if (quoteProductButton) {

        quoteProductButton.addEventListener("click", () => {

const producto = productoActual
    ? productoActual.nombre
    : "Producto no especificado";

            const colorSeleccionado =
                document.querySelector(".color-option.active");

            const color = colorSeleccionado
                ? colorSeleccionado.textContent.trim()
                : "No especificado";

            const cantidad = quantityInput
                ? quantityInput.value
                : "1";

            const personalizacion = customizationInput
                ? customizationInput.value.trim()
                : "";

            const enlaceProducto =
    `${window.location.origin}${window.location.pathname}?id=${productoID}`;

const mensaje =
    `Hola, Varielet. Me interesa cotizar este producto:

Producto: ${producto}
Color: ${color}
Cantidad: ${cantidad}
Personalización: ${personalizacion || "No especificada"}

Ver producto:
${enlaceProducto}

Quisiera recibir información sobre la cotización.`;

            const mensajeCodificado =
                encodeURIComponent(mensaje);

           const whatsappUrl =
    `https://wa.me/18298620452?text=${mensajeCodificado}`;

            window.open(whatsappUrl, "_blank");

        });

    }
   
    // =====================================================
    // CATÁLOGO
    // =====================================================

    const searchInput = document.querySelector("#searchInput");
    const searchButton = document.querySelector("#searchButton");

    const filterButtons = document.querySelectorAll(".filter-button");
    const products = document.querySelectorAll(".catalog-product");
    const resultsText = document.querySelector(".catalog-results-header");
        
    console.log("Campo de búsqueda:", searchInput);

    // Si no estamos en el catálogo, no ejecutamos esta parte
    if (!products.length) {
        return;
    }

    let categoriaSeleccionada = "Todos los productos";
   let ocasionSeleccionada = "Todas las ocasiones";

    function filtrarProductos() {

        const textoBusqueda = searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";
                console.log("Búsqueda:", textoBusqueda);

        let productosVisibles = 0;

        products.forEach(producto => {

           const nombre = producto.textContent.toLowerCase();

            const categoria = producto.dataset.categoria || "";
            const ocasion = producto.dataset.ocasion || "";

            const coincideBusqueda =
                nombre.includes(textoBusqueda);

            const coincideCategoria =
                categoriaSeleccionada === "Todos los productos" ||
                categoria === categoriaSeleccionada;

            const coincideOcasion =
                ocasionSeleccionada === "Todas las ocasiones" ||
                ocasion === ocasionSeleccionada;

            const mostrar =
                coincideBusqueda &&
                coincideCategoria &&
                coincideOcasion;

            if (mostrar) {
                producto.style.display = "";
                productosVisibles++;
            } else {
                producto.style.display = "none";
            }
       
       
       
       
       
       
        });

        // Actualizar cantidad de productos
        if (resultsText) {
            resultsText.textContent =
                `Mostrando ${productosVisibles} productos`;
        }
    }





    
    // =====================================================
    // BUSCADOR
    // =====================================================

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            filtrarProductos();
        });
    }
 
    // =====================================================
    // FILTROS
    // =====================================================

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const grupo = button.closest(".filter-group");
            const titulo = grupo?.querySelector(".filter-title");

            if (!titulo) {
                return;
            }

            const textoFiltro = button.textContent.trim();

            // Activar visualmente el botón
            grupo
                .querySelectorAll(".filter-button")
                .forEach(btn => {
                    btn.classList.remove("active");
                });

            button.classList.add("active");

           // Filtro de categoría
if (grupo.querySelector(".filter-title").textContent.includes("Categor")) {

    categoriaSeleccionada = textoFiltro;

}

// Filtro de ocasión
if (grupo.querySelector(".filter-title").textContent.includes("Ocas")) {

    ocasionSeleccionada = textoFiltro;

}

            filtrarProductos();
        });
    });

});





async function cargarProductosDesdeAPI() {
    try {
        const respuesta = await fetch("http://localhost:3000/api/productos");

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los productos");
        }

        const productosBD = await respuesta.json();

        console.log("Productos obtenidos desde MySQL:", productosBD);

        return productosBD;

    } catch (error) {
        console.error("Error al conectar con la API:", error);
        return [];
    }
}

cargarProductosDesdeAPI();