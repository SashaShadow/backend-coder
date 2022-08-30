import contenedorMongoDB from "./contenedorMongoDB.js";
import { db, Order, cartModel} from "./dbsConfig.js";
import twilio from 'twilio';
import { logger, loggerError } from "./logger.js";
import { createTransport } from 'nodemailer';

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSid, authToken);
const ADMIN_NUMBER = 'whatsapp:+5491130931945';
const ADMIN_MAIL = 'caballerosasha@hotmail.com';

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'caballerosasha@gmail.com',
        pass: process.env.GMAILACC
    }
  });

class OrderDAOMongoDB extends contenedorMongoDB {
    constructor() {
      super(db, Order)
    }

    async getOrders(req, res) {
      return this.db
        .then(_ => this.model.find({owner: req.params.id}))
        .then(data => {
            return res.json(data)
        })
        .catch(err => {res.send(err); throw err})
    }

    async createOrder(req, res) {
        const orderData = req.body;
        orderData.order.products = JSON.parse(orderData.order.products);
        const newOrder = new this.model(orderData);

        const prodsHtml = orderData.order.products.map(prod => {
          return (`<li>${prod.name} Precio por unidad: ${prod.price} Cantidad ${prod.quantity} Total: ${prod.quantity * prod.price}</li>`)
        }).join(" ")

        return this.db
        .then(_ => newOrder.save())
        .then(async (_) => {
            logger.info('Orden creada');
            const mailOptions = {
                from: 'Tetsu Fragancias Admin',
                to: ADMIN_MAIL,
                subject: `Nuevo pedido de ${orderData.client.name} ${orderData.client.email}`,
                html: `
                <h1>Nuevo pedido</h1>
                <h2>Detalles de la orden y el usuario</h2>
                <h3>Usuario</h3>
                <ul>
                  <li>Nombre de usuario: ${orderData.client.username}</li>
                  <li>Nombre: ${orderData.client.name}</li>
                  <li>Email: ${orderData.client.email}</li>
                  <li>Teléfono: ${orderData.client.phone}</li>
                  <li>Direccion: ${orderData.client.address}</li>
                </ul>
                <h3>Orden de compra ${orderData.order.orderNo}</h3>
                <ul>
                  <h4>Productos:</h4>
                    ${prodsHtml}
                  <h4>Total a pagar: ${orderData.order.total}</h4>
                </ul>
                `
              }

            try {
              const message = await client.messages.create({
                  body: `Nuevo pedido de ${orderData.client.name} ${orderData.client.email}. Orden de compra ${orderData.order.orderNo}`,
                  from: 'whatsapp:+14155238886',
                  to: `${ADMIN_NUMBER}`,
              }).then(_ => logger.info('Nueva orden de compra'))
            } catch (error) {
              loggerError.error(error)
            }

            // try {
            //   const message = await client.messages.create({
            //       body: `${orderData.client.name}, 
            //        tu orden de compra se ha concretado. Cuando termine de procesarse se te contactará.
            //        El número de orden es ${orderData.order.orderNo}.`,
            //       from: '+15704634279',
            //       to: `+541130931945`, //acá debería ser orderData.client.phone, mis usuarios son de prueba asi que pongo mi numero
            //   }).then(_ => logger.info('Mensaje al cliente enviado'))
            // } catch (error) {
            //   loggerError.error(error)
            // }

            try {
                transporter.sendMail(mailOptions)
            } catch (err) {
                loggerError.error(err)
            }

            return cartModel.deleteOne({owner: orderData.owner})
            .then(_ => {
                logger.info('OK')
            })
            .catch(err => loggerError.error(err));
        })
    }
  }

export default OrderDAOMongoDB;