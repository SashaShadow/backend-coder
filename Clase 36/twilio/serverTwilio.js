import express from 'express'
import twilio from 'twilio'

const PORT = parseInt(process.argv[2]) || 8080
const app = express()
 
app.listen(PORT, () => { console.log(`Servidor express escuchando en el puerto ${PORT}`);})

const accountSid = 'ACaa4ead39f5a98762271be36901f8b629'
const authToken = '64aed2e27de8055cbbe5fc723636c8e5'

const client = twilio(accountSid, authToken)

// const options = {
//    body: 'Hola soy un WSP desde Node.js!',
//    // mediaUrl: [ 'https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg' ],
//    from: 'whatsapp:+14155238886',
//    to: 'whatsapp:+5491100000000'
// }

app.get('/msg', async (req, res) => {

   const msg = req.query.msg;

   try {
      const message = await client.messages.create({
         body: msg,
         from: 'whatsapp:+14155238886',
         to: 'whatsapp:+5491130931945'
      }).then(() => res.send('mensaje enviado'))
      console.log(message)
   } catch (error) {
      console.log(error)
   }
})



