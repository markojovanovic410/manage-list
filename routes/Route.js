const express = require("express");
const UserController = require("../controller/UserController");
const route = express.Router();

const User = new UserController();
route.get('/contacts', User.getAllUser);
route.post('/add-contact', User.createUser);
route.get('/contact/:id', User.getUserById);
route.put('/update-contact/:id', User.updateUser);
route.delete('/delete-contact/:id', User.deleteOne);

module.exports = route;