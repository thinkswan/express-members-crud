const path = require('path')
const express = require('express')
// const logger = require('./middleware/logger')
const members = require('./Members')

const PORT = process.env.PORT || 5000

const app = express()

// app.use(logger)

app.get('/api/members', (req, res) => res.json(members))
app.get('/api/members/:id', (req, res) => {
  res.json(members.filter(member => member.id === parseInt(req.params.id)))
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
