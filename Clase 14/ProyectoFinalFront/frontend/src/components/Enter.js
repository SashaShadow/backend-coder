import "./Enter.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Enter = ({setPw, pw}) => {

    const [newPw, setNewPw] = useState("");
    const [enterBut, setEnterBut] = useState(false);

    const pwHandler = (e) => {
        e.preventDefault();
        if (newPw !== "fx88fx") {
            alert("Contraseña incorrecta, ingresarás como cliente");
        }
        setPw(newPw);
        setEnterBut(true);
    }

    return (
        <div className="Enter">
            <div className="Box">
                <h2>Entrar como admin</h2>
                <form onSubmit={e => pwHandler(e)}>
                    <input name="pw" placeholder={"Ingrese la contraseña"} 
                    onChange={({ target }) => setNewPw(target.value)} maxLength={15}/>
                    <button type="submit" onClick={pwHandler}>Enviar</button>
                </form>
                {enterBut && <Link to="/products">Entrar</Link>}
            </div>
            <div className="Box">
                <Link to="/products" onClick={() => setPw("cliente")}><h2>Entrar como cliente</h2></Link>
            </div>
        </div>
    )
}

export default Enter;