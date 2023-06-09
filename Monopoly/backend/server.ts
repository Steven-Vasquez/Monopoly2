import express, { Express } from 'express'
const app: Express = express()
const port = 3000

require("dotenv").config();

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})