import { Application, Router } from './deps.ts';
import { getColors, createColor } from './handlers/colors.ts';
import "https://deno.land/x/dotenv/load.ts";

const port = Number(Deno.env.get('PORT')) || 8080;

const app = new Application()

const router = new Router()
.get('/api/colors', getColors)
.post('/api/colors', createColor)

app.use(router.routes());

await app.listen({ port })
