import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Item from "./Item.js";
import PutForm from "./PutForm.js";
import "./ItemListContainer.css";

const ItemListContainer = ({pw}) => {

    const [products, setProducts] = useState([]); // eslint-disable-next-line
    const [loader, setLoader] = useState(true);
    const [mod, setMod] = useState([false, ""]);
    const [carts, setCarts] = useState([]);
    const cartEndpoint = "http://localhost:8080/api/carrito";
    const prodEndpoint = "http://localhost:8080/api/productos";

    useEffect(() => {
        fetch(prodEndpoint)
        .then(response => response.json())
        .then(data => {
            setProducts(data.productos);
            fetch(cartEndpoint)
            .then(response => response.json())
            .then(data => {
                setCarts(data.Carritos);
                setLoader(false);
            });
        })
    }, [loader])

    return (
        <>
        {mod[0] ? <PutForm pw={pw} id={mod[1]} setMod={setMod} setLoader={setLoader}/> :
            <>
            <h1>Productos disponibles de la tienda</h1>
            <h3><Link to="/">Volver a la pantalla de inicio</Link></h3>
            { pw === "fx88fx" ? 
            <h3><Link to="/newProd">Agregar un producto nuevo</Link></h3> : <h3><Link to="/cart">Ver Carrito</Link></h3> }
            { loader ? <h1>Cargando productos...</h1> : 
            <div className="ItemListContainer">
            {products.map(elem => {
                    return <Item key={elem.id} product={elem} 
                    pw={pw} setLoader={setLoader} 
                    mod={mod} setMod={setMod}
                    carts={carts}/>
            })}
            </div>
            }
            </> }
        </>
    )
}

export default ItemListContainer;