import "./Item.css";
import { useState, useEffect } from "react";

const Item = ({product, pw, setLoader, mod, setMod, carts}) => {

    const [cid, setCid] = useState(carts ? carts[0].id : "");

    useEffect(() => {
        console.log(cid);
    }, [cid])

    const deleteProd = (id) => {
        return fetch(`http://localhost:8080/api/productos/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"pw": pw}),
    }).then(response => console.log(response)).then(setLoader(true))
    }

    const addToCart = () => {
        return fetch(`http://localhost:8080/api/carrito/${cid}/productos`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"name": product.name, "price": product.price,
            "desc": product.desc, "photo": product.photo, "code": product.code,
            "stock": product.stock, "id": product.id}),
        }).then(response => console.log(response)).then(setLoader(true))
    }

    return (
        <>
        <div className="Item">
            {pw === "fx88fx" ? <><p>{product.name} ID: {product.id}</p>
             <p>Descripción: {product.desc}</p>
             <img src={product.photo} alt={product.name}/>
             <p>Precio: {product.price}</p>
             <p>Stock: {product.stock}</p>
             <button onClick={() => setMod([!mod[0], product.id])}>Modificar producto</button>
             <button onClick={() => deleteProd(product.id)}>Eliminar producto</button></> : 
             
             <><p>{product.name} ID:{product.id}</p>
             <p>Descripción: {product.desc}</p>
             <img src={product.photo} alt={product.name}/>
             <p>Precio: {product.price}</p>
             <p>Stock: {product.stock}</p>
             <form>
                <button onClick={() => addToCart()}>Agregar al carrito número</button>
                <select name="cart" onChange={(e) => setCid(e.target.value)}>
                    {carts.map(cart => {
                        return <option key={cart.id} value={cart.id}>{cart.id}</option>
                    })}
                </select>
             </form></>
        }
        </div>
        </>
    )
}

export default Item;