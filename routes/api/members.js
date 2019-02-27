const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const members = require('../../Members')

// List all members
router.get('/', (req, res) => res.json(members))

// List member
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

// Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if (!newMember.name || !newMember.email) {
    return res
      .status(400)
      .json({ msg: 'Missing required name and email params' })
  }

  members.push(newMember)

  return res.json(members)
})

module.exports = router
