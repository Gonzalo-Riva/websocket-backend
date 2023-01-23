const socket = io();
socket.on('init-products', (products) => {
    const main = document.getElementById('tiemporeal');
    main.innerHTML = ' ';
    products.forEach((product) => {
        main.innerHTML += addProductHTML(product);
    });
});

socket.on('delete-products'), (id) => {
    const product = document.getElementById('id');
    product.remove
}

socket.on('add-products', (product) => {
    const main = document.getElementById('tiemporeal');
    main.innerHTML = addProductHTML(product);
})

const addProductHTML = (product) => {
    return `<div class="col mb-5">
                <div class="card h-100">
                    <!-- Product image-->
                    <div style="position:relative; width: 100%; height: 200px; overflow: hidden">
                        <div style="position: absolute; left: 0%; top: 0%;">
                            <img class="card-img-top" src="${product.thumbnail}" alt="..." />
                        </div>
                    </div>

                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${product.title}</h5>
                            <!-- Product price-->
                            <p><strong>$${product.price}</strong></p>
                            <p><small class="text-muted">Stock: ${product.stock}</small></p>
                            <p><small>${product.description}</small></p>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Añadir</a></div>
                    </div>
                </div>
            </div>`
}