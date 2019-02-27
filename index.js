const path = require('path')
const express = require('express')
// const logger = require('./middleware/logger')
const members = require('./Members')

const PORT = process.env.PORT || 5000

const app = express()

// app.use(logger)

app.get('/api/members', (req, res) => res.json(members))
app.get('/api/members/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (!found) {
    return res
      .status(404)
      .json({ msg: `Could not find member with id ${req.params.id}` })
  }

  return res.json(
    members.filter(member => member.id === parseInt(req.params.id))
  )
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
