import express from 'express'
import { createTransport } from 'nodemailer';

const PORT = parseInt(process.argv[2]) || 8080
const app = express()
 
app.listen(PORT, () => { console.log(`Servidor express escuchando en el puerto ${PORT}`);})

const TEST_MAIL = 'caballerosasha@gmail.com'

const transporter = createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   auth: {
       user: 'caballerosasha@gmail.com',
       pass: 'roxgzlrnsugjywyo'
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
//  } catch (err) {
//     console.log(err)
//  }
 
