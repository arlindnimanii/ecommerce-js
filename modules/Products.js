function composeProductsHTML(products) {
    let result = ''

    products.forEach(product => {
        result += `
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 mb-3">
            <div class="card py-4">
                <a href="view-product.html?id=${product.id}" class="text-link">
                    <img src="${product.image}" alt="${product.title}" class="product-img" />
                </a>
                <div class="card-body">
                    <a href="view-product.html?id=${product.id}" class="text-link">
                        <h5 class="card-title">${product.title}</h5>
                    </a>
                    <p class="card-text">
                        <span class="badge bg-primary">${product.category}</span>
                        <span class="description">${product.description.substring(0, 80)}...</span>
                    </p>
                </div>
            </div>
        </div>
        `
    });

    return result
}

function composeAPIURL(options) {
    let url = 'https://fakestoreapi.com/products'
    const limit = (options.limit !== null) ? options.limit : null
    const sort = (options.sort !== null) ? options.sort : null

    if(limit !== null && sort !== null) {
        return `${url}?limit=${limit}&sort=${sort}`
    } 
    else if(limit !== null) {
        return `${url}?limit=${limit}`
    }
    else if(sort !== null) {
        return `${url}?sort=${sort}`
    } else {
        return url
    }
}

function composeProductHTML(product) {
    let result = ''

    result += `
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3">
            <img src="${product.image}" alt="${product.title}" class="product-img img-fluid" />
        </div>
        <div class="col-xl-7 offset-xl-1 col-lg-7 offset-lg-1 col-md-7 offset-ms-1 col-sm-12 offset-sm-0 mb-3">
            <h3>${product.title}</h3>
            <p><span class="badge bg-primary">${product.category}</span></p>
            <p>${product.description}</p>
            <p class="mt-4"><b>${product.price} EUR</p>
            <form class="d-flex justify-content-start">
                <input type="number" name="qty" value="1" min="0" max="10" class="form-control w-25 me-2" />
                <input type="hidden" name="id" value="${product.id}" />
                <button type="submit" class="btn btn-sm btn-primary">Add to cart</button>
            </form>
        </div>
    `

    return result
}

export function getProducts(div, options) {
    fetch(composeAPIURL(options))
    .then(response => response.json())
    .then(data => {
        div.innerHTML = composeProductsHTML(data)
    })
}

export function getProductByID(div, id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(response => response.json())
    .then(data => {
        div.innerHTML = composeProductHTML(data)
    })
}