import { createApp } from 'https://deno.land/x/servest@v1.3.1/mod.ts';
import { config } from "https://deno.land/x/dotenv/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const app = createApp();

console.log(config());
console.log(Deno.env.get('GREETING'));

const port = Number(Deno.env.get('PORT')) || 8080;

app.handle('/', async req => {
  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'text/html'
    }),
    body: `<h2>Hola Seguidores de Coderhouse!</h2>`
  })
})
app.listen({port: port});

//deno run --allow-env --allow-read server.ts
