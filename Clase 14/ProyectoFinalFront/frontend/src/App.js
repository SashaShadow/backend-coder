import './App.css';
import ItemListContainer from "./components/ItemListContainer.js";
import ProductForm from './components/ProductForm';
import Cart from "./components/Cart.js";
import Enter from "./components/Enter.js";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// eslint-disable-next-line
import {useState, useEffect} from "react"; // eslint-disable-next-line


function App() {

  const [pw, setPw] = useState("");

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Enter setPw={setPw} pw={pw}/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/products' element={<ItemListContainer pw={pw}/>}/> 
        <Route path='/newProd' element={<ProductForm pw={pw}/>}/> 
      </Routes>
      {/* { pw === "" && pw !== "fx88fx" ? 
      <Enter setPw={setPw} pw={pw}/> : 
      pw === "fx88fx" ? 
      <ItemListContainer pw={pw}/> : 
      <ItemListContainerUser/>} */}
    </div>
    </BrowserRouter>
  );
}

export default App;
