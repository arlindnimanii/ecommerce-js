export function getCartItems() {
    const cart = localStorage.getItem('cart') ?? []
    return (cart.length > 0) ? JSON.parse(cart) : []
}

export function getOrders() {
    const orders = localStorage.getItem('orders') ?? []
    return (orders.length > 0) ? JSON.parse(orders) : []
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

export function checkout(data) {
    const cart = getCartItems()
    const order = {
        ...data,
        'total': cart.reduce((s, i) => s + (i.price * i.qty), 0)
    }
    localStorage.setItem('orders', JSON.stringify([...getOrders(), order]))
    localStorage.removeItem('cart')
    return true
}

