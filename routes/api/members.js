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

  const member = members.filter(
    member => member.id === parseInt(req.params.id)
  )[0]

  return res.json(member)
})

// Create member
router.post('/', (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res
      .status(400)
      .json({ msg: 'Missing required name and email params' })
  }

  members.push({
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  })

  return res.json(members)
})

// Update member
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (!found) {
    return res
      .status(404)
      .json({ msg: `Could not find member with id ${req.params.id}` })
  }

  const member = members.filter(
    member => member.id === parseInt(req.params.id)
  )[0]

  if (req.body.name) member.name = req.body.name
  if (req.body.email) member.email = req.body.email

  return res.json({
    msg: `Successfully updated member with id ${req.params.id}`,
    member
  })
})

// Delete member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (!found) {
    return res
      .status(404)
      .json({ msg: `Could not find member with id ${req.params.id}` })
  }

  return res.json({
    msg: `Successfully deleted member with id ${req.params.id}`,
    members: members.filter(member => member.id !== parseInt(req.params.id))
  })
})

module.exports = router
