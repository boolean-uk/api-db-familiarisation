const express = require('express');
const data = require('../../data.js');
const router = express.Router();

// GET requests
// get all users with this url localhost:3030/users
app.get('/', (req, res) => {
  //callback function takes two arguments req(http request), res
  res.json({ data: data.users });
});

// get users by ID with this url localhost:3030/users/2
router.get('/:id', (req, res) => {
  console.log('got get by id request!', req.params.id);
  const user = data.users.find((user) => user.id === parseInt(req.params.id));
  res.json({ user });
});

// POST request
// create a user with this url: localhost:3030/users
// include similar to following in the header: Content application/json and the body: raw {"email":"test@test.com"}
router.post('/', (req, res) => {
  const lastuser = data.users[data.users.length - 1];
  console.log('in post USERS, body is:', req.body);
  const newUser = {
    id: lastuser.id + 1,
    email: req.body.email,
  };
  data.users.push(newUser);
  res.json({ user: newUser });
});

// DELETE request
// url: localhost:3030/users/2
router.delete('/:id', (req, res) => {
  console.log('in delete USERS request', req.params.id);
  const userId = parseInt(req.params.id);
  const userToDelete = data.users.find((user) => user.id === userId);
  if (!userToDelete) {
    res.status(404);
    res.json({ error: 'user does not exist' });
    return;
  }
  data.users = data.users.filter((user) => user !== userToDelete);
  res.json({ user: userToDelete });
});

// PATCH request
// patch users by ID with this url localhost:3030/users/2
// include similar to following in the header: Content application/json and the body: raw {"email":"testother@testother.com"}
router.patch('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const existingUser = data.users.find((user) => user.id === userId);
  if (!existingUser) {
    res.status(404);
    res.json({ error: 'user does not exist' });
    return;
  }
  if (req.body.email) {
    existingUser.email = req.body.email;
  }
  //return the updated buser
  res.json({ user: existingUser });
});

// Export router
module.exports = router;
