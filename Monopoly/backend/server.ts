import express, { Express } from 'express'
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express()
const port = process.env.PORT || 4000

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})