const express = require('express')
const router = express.Router()
const members = require('../../Members')

router.get('/', (req, res) => res.json(members))
router.get('/:id', (req, res) => {
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

module.exports = router
