import 'dotenv/config'
import fs from 'fs'
import express from 'express'
import { convert } from 'convert-svg-to-png'

import { chart } from './chart'

const app = express()
const port = process.env.CHARTMAKER_PORT || 3300
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello!!')
})

app.post('/', async (req, res) => {
  try {
    const data = req.body.data
    const png = await convert(chart({ data }), {
      background: 'rgba(0,0,0,.85)'
    })
    res.set('Content-Type', 'image/png')
    res.send(png)
  } catch (err) {
    res.send(err)
  }
})

app.listen(port, () => console.log(`listen on http://localhost:${port}`))
