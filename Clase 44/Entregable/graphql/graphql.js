import {Schema} from "./Schema.js";
import ProductRepository from "../repository/productRepository.js";
import ProductsService from "../services/productsService.js";
import CartService from "../services/cartService.js";
import DAOFactory from "../factory/DAOfactory.js";
import MessageRepository from "../repository/messageRepository.js";
import MessageService from "../services/messageService.js";
import OrderService from "../services/orderService.js";
import { graphqlHTTP } from 'express-graphql';

export const productsStorage = new ProductRepository();
export const productService = new ProductsService(productsStorage);
const myDAO = new DAOFactory();
export const cartStorage = myDAO.getCartDAO();
export const cartService = new CartService(cartStorage);
export const messagesStorage = new MessageRepository();
export const messageService = new MessageService(messagesStorage);
export const orderStorage = myDAO.getOrderDAO();
export const orderService = new OrderService(orderStorage);

const getProducts = () => productService.getProducts();
const getProduct = ({id}) => productService.getProduct(id);
const createProduct = ({product}) => productService.createProduct(product);
const updateProduct = ({prodId, prodMod}) => productService.changeProduct(prodId, prodMod);
const deleteProduct = ({prodId}) => productService.deleteProduct(prodId);

const getCarts = () => cartService.getCarts();
const getOwnCart = ({id}) => cartService.getOwnCart(id);
const getCartProducts = ({id}) => cartService.getCartProducts(id);
const addToCart = ({product, ownerId}) => cartService.addToCart(product, ownerId);
const deleteCart = ({id}) => cartService.deleteCart(id);
const deleteCartProd = ({ownerId, prodId}) => cartService.deleteProd(ownerId, prodId);

const getMessages = () => messageService.getMsgs();
const createMessage = ({message}) => messageService.createMsgs(message);

const getOrders = () => orderService.getOrders();
const createOrder = ({order}) => orderService.createOrder(order);


const root  = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCarts,
  getOwnCart,
  getCartProducts,
  addToCart,
  deleteCart,
  deleteCartProd,
  getMessages,
  createMessage,
  getOrders,
  createOrder
}

export const myGraphqlHTTP = graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true,
 });

