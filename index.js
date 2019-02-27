const express = require('express')

const PORT = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
