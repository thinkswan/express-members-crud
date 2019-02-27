const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
// const logger = require('./middleware/logger')

const PORT = process.env.PORT || 5000

const app = express()

// app.use(logger)

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Render Handlebars view
app.get('/', (req, res) => res.render('index'))

// Set `public/` as static folder
app.use(express.static(path.join(__dirname, 'public')))

// Use `/api/members` routes
app.use('/api/members', require('./routes/api/members'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
