import express from 'express'
import { createTransport } from 'nodemailer';

const PORT = parseInt(process.argv[2]) || 8080
const app = express()
 
app.listen(PORT, () => { console.log(`Servidor express escuchando en el puerto ${PORT}`);})

const TEST_MAIL = 'emie.carroll82@ethereal.email'

const transporter = createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
       user: TEST_MAIL,
       pass: 'qD47EpDQ5uxHG37zqp'
   }
});

const mailOptions = {
    from: 'Servidor Node.js de Sashimi',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}

// try {
//     const info = await transporter.sendMail(mailOptions)
//     console.log(info)
//  } catch (error) {
//     console.log(err)
//  }
 
