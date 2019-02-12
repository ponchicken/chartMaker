import 'dotenv/config'
import fs from 'fs'
import express from 'express'
import request from 'request'
// import sharp from 'sharp'
const fetch = require('node-fetch')

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
    // curl -X POST -d '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"></svg>' http://localhost:8999/convert?background=black > svg.png
    const svg = chart({ data })
    // request({
    //   url: 'http://convert:3000/convert?background=black',
    //   method: 'POST',
    //   body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"></svg>',
    //   json: false
    // }, (error, resp, body) => {
    //   console.log({error, resp, body})
    //   res.set('Content-Type', 'image/png')
    //   res.send(JSON.stringify(resp))
    // })
    fetch('http://convert:3000/convert?background=black', {
      method: 'POST'
    })
      .then(res => {
        console.log(res)
        res.set('Content-Type', 'image/png')
        res.send(svg)
      })
  } catch (err) {
    console.warn(err)
    res.send(err.message)
  }
})
app.listen(port, () => console.log(`listen on http://localhost:${port}`))