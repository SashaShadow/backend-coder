
import { useState, useEffect } from "react";
import Item from "./Item.js";
import "./ItemListContainer.css";

const ItemListContainerUser = () => {

    const [products, setProducts] = useState([]); // eslint-disable-next-line
    const [loader, setLoader] = useState(true);
    const prodEndpoint = "http://localhost:8080/api/productos";

    useEffect(() => {
        fetch(prodEndpoint)
        .then(response => response.json())
        .then(data => {
            setProducts(data.productos)
            setLoader(false);
        })
    }, [])

    return (
        <>
            <h1>Productos disponibles de la tienda (user)</h1>
            <h3><a href="#">Ver Carrito</a></h3>
            { loader ? <h1>Cargando productos...</h1> : 
            <div className="ItemListContainer">
            {products.map(elem => {
                    return <Item key={elem.id} product={elem} pw={""}/>
            })}
            </div>
            } 
        </>
    )
}

export default ItemListContainerUser;