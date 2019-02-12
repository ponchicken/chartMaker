import 'dotenv/config'
import fs from 'fs'
import express from 'express'
// import sharp from 'sharp'
import { convert } from 'convert-svg-to-png'
import puppeteer from 'puppeteer'

import { chart } from './chart'

const app = express()
const port = process.env.CHARTMAKER_PORT || 3300

app.use(express.json())

const extraFlags = [
  '--no-sandbox',
  '--disable-web-security',
]

puppeteer.launch({ args: extraFlags })

app.get('/', async (req, res) => {
  res.send('hello')
})

app.post('/', async (req, res) => {
  try {
    const data = req.body.data
    // const png = await sharp(
    //   new Buffer.from(chart({ data }))
    // ).webp().toBuffer()
    const png = await convert(chart({ data }), {
      background: 'rgba(0,0,0,.85)'
    })
    res.set('Content-Type', 'image/webp')
    res.send(png)
  } catch (err) {
    console.warn(err)
    res.send(err.message)
  }
})
app.listen(port, () => console.log(`listen on http://localhost:${port}`))