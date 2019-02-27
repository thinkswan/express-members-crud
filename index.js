const path = require('path')
const express = require('express')
const moment = require('moment')
const members = require('./Members')

const PORT = process.env.PORT || 5000

const app = express()

const logger = (req, res, next) => {
  console.log(
    `${moment().format()} ${req.protocol}://${req.get('host')}${
      req.originalUrl
    }`
  )
  next()
}

app.use(logger)

app.get('/api/members', (req, res) => res.json(members))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
