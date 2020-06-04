import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from './router.ts'

const app = new Application()
const port: number = 8000

app.use(oakCors())
app.use(router.routes())
app.use(router.allowedMethods())


console.log(`server started on port ${port}`)
await app.listen({port})


