import "./ProductForm.css";
import { useState, useEffect } from "react";


const PutForm = ({pw, id, setMod, setLoader}) => {

    const [product, setProduct] = useState([])
    const prodEndpoint = `http://localhost:8080/api/productos/${id}`;

    useEffect(() => {
        fetch(prodEndpoint)
        .then(response => response.json())
        .then(data => {
            setProduct(data.producto)
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(event.target.name.value)
        return fetch(`http://localhost:8080/api/productos/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"name": event.target.name.value, "price":event.target.price.value,
        "desc": event.target.desc.value, "photo": event.target.photo.value, "code": event.target.code.value,
        "stock": event.target.stock.value, "pw": pw}),}).then(setLoader(true)).then(setMod([false, ""]))
      }

    return (
        <> 
            <a onClick={() => setMod([false, ""])}><h3>Volver al listado de productos</h3></a>

            <div className="myFormContainer">
                <h3>Modificar el producto</h3>
                <form onSubmit={(e) => handleSubmit(e)} className="myForm" encType="application/json">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" value={product.name} onChange={e => setProduct({...product, name: e.target.value})}/>
                    <label htmlFor="price">Precio</label>
                    <input type="number" name="price" value={product.price} onChange={e => setProduct({...product, price: e.target.value})}/>
                    <label htmlFor="desc">Descripción</label>
                    <input type="text" name="desc" value={product.desc} onChange={e => setProduct({...product, desc: e.target.value})}/>
                    <label htmlFor="photo">Imagen (url)</label>
                    <input type="text" name="photo" value={product.photo} onChange={e => setProduct({...product, photo: e.target.value})}/>
                    <label htmlFor="code">Code</label>
                    <input type="text" name="code" value={product.code} onChange={e => setProduct({...product, code: e.target.value})}/>
                    <label htmlFor="stock">Stock</label>
                    <input type="number" name="stock" value={product.stock} onChange={e => setProduct({...product, stock: e.target.value})}/>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    )
}

export default PutForm;