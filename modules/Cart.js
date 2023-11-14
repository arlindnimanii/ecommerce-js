export function getCartItems() {
    const cart = localStorage.getItem('cart') ?? null
    if(cart === null) return []
    return JSON.parse(cart)
}


export function add(product_id, qty) {
    fetch(`https://fakestoreapi.com/products/${product_id}`)
    .then(res=>res.json())
    .then(product => {
        let cart  = getCartItems()
        let eproduct = cart.filter(product => product.id === product_id)

        if(eproduct.length > 0) {
            for(let i = 0; i < cart.length; i++) {
                if(cart[i].id === product_id) {
                    cart[i].qty += qty
                }
            }
        } else {
            cart.push({...product, id: product_id, qty: qty})
        }

        localStorage.setItem('cart', JSON.stringify(cart))
    })
}

export function remove(product_id) {
    let cart  = getCartItems()
    let ucart = cart.filter(product => product.id !== product_id)
    localStorage.setItem('cart', JSON.stringify(ucart))
}

export function empty() {
    localStorage.removeItem('cart')
}


