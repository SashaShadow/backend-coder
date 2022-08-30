import express from 'express'
import twilio from 'twilio'

const PORT = parseInt(process.argv[2]) || 8080
const app = express()
 
app.listen(PORT, () => { console.log(`Servidor express escuchando en el puerto ${PORT}`);})

const accountSid = ''
const authToken = ''

const client = twilio(accountSid, authToken)

try {
   const message = await client.messages.create({
      body: 'Hola soy un SMS desde Node.js!',
      from: '+15704634279',
      to: '+541130931945'
   })
   console.log(message)
} catch (error) {
   console.log(error)
}