import { useState, useEffect } from "react";
import CartProd from "./CartProd.js";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {

    const [loader, setLoader] = useState(true);
    const [carts, setCarts] = useState([]);
    const cartEndpoint = "http://localhost:8080/api/carrito";

    useEffect(() => {
        fetch(cartEndpoint)
        .then(response => response.json())
        .then(data => {
            setCarts(data.Carritos)
            setLoader(false);
        });
    }, [loader])

    const newCart = () => {
        return fetch(`http://localhost:8080/api/carrito/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({newcart: "new"}),
        }).then(setLoader(true));
    }

    const deleteCart = (id) => {
        return fetch(`http://localhost:8080/api/carrito/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({deletecart: "bye"}),
        }).then(setLoader(true));
    }

    return (
        <>
        {carts ? <><h2>Carritos</h2> 
        <Link to="/products"><h3>Volver al listado de productos</h3></Link>
        <a onClick={() => newCart()}><h3>Crear un nuevo carrito</h3></a>
        {carts.map(cart => {
            return <div className="Cart">
                <h3>Carrito {cart.id}</h3>
                <a onClick={() => deleteCart(cart.id)}><h3>Eliminar este carrito</h3></a>
                <div className="prodContainer">
                {cart.productos.length ? cart.productos.map(product => {
                    if (product !== undefined) {
                        return <CartProd setLoader={setLoader} product={product} key={cart.id} cart={cart.id}/>
                    } else {
                        return <h3>No hay productos en este carrito</h3>
                    }
                   
                }) : <h3>No hay productos en este carrito</h3>}
                </div>
            </div>
        })}</>
        : 
        <h2>No tenés ningun carrito. Crea uno.</h2>}
        </>
    )
}

export default Cart;