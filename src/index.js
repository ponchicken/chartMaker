import 'dotenv/config'
import express from 'express'
import fetch from 'node-fetch'

import { chart } from './chart'

const app = express()
const port = process.env.CHARTMAKER_PORT || 3300

app.use(express.json())


app.get('/', async (req, res) => {
  res.send('hello')
})

app.post('/', async (req, res) => {
  try {
    const data = req.body.data
    const svg = chart({ data })

    fetch('http://convert:3000/convert?background=black', {
        method: 'POST',
        body: svg,
    })
      .then(res => res.arrayBuffer())
      .then(d => {
        res.set('Content-Type', 'image/png')
        res.send(new Buffer.from(d))
      })
  } catch (err) {
    console.warn('ERROR', err)
    res.send(err.message)
  }
})
app.listen(port, () => console.log(`listen on http://localhost:${port}`))