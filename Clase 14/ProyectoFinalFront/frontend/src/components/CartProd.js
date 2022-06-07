import "./CartProd.css";

const CartProd = ({product, cart, setLoader}) => {

    const deleteFromCart = () => {
        return fetch(`http://localhost:8080/api/carrito/${cart}/productos/${product.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"pw": "a borrar"}),
    }).then(response => console.log(response)).then(setLoader(true))
    }

    return (
        <div className="CartProd">
            <p>{product.name} ID: {product.id}</p>
            <img src={product.photo}/>
            <button onClick={() => deleteFromCart()}>Eliminar del carrito</button>
        </div>
    )
}

export default CartProd;