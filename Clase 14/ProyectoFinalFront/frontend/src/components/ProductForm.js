import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductForm.css";

const ProductForm = ({pw}) => {

    const [product, setProduct] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        return fetch(`http://localhost:8080/api/productos/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"name": event.target.name.value, "price":event.target.price.value,
        "desc": event.target.desc.value, "photo": event.target.photo.value, "code": event.target.code.value,
        "stock": event.target.stock.value, "pw": pw}),})
      }

    return (
        <> 
            <Link to="/products"><h3>Volver al listado de productos</h3></Link>

            <div className="myFormContainer">
                <h3>Agregar un producto</h3>
                <form onSubmit={(e) => handleSubmit(e)} className="myForm" encType="application/json">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name"/>
                    <label htmlFor="price">Precio</label>
                    <input type="number" name="price"/>
                    <label htmlFor="desc">Descripción</label>
                    <input type="text" name="desc"/>
                    <label htmlFor="photo">Imagen (url)</label>
                    <input type="text" name="photo"/>
                    <label htmlFor="code">Code</label>
                    <input type="text" name="code"/>
                    <label htmlFor="stock">Stock</label>
                    <input type="number" name="stock"/>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    )
}

export default ProductForm;