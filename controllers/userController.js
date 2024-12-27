const User = require("../models/user");

exports.postAddUser = (req, res) => {
  User.create(req.body)
    .then(() => res.status(201).send("User added"))
    .catch((err) => res.status(500).send(err));
};

exports.getUserData = (req, res) => {
  User.findAll()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).send(err));
};

exports.postDeleteUser = (req, res) => {
  User.destroy({ where: { id: req.body.id } })
    .then(() => res.send("User deleted"))
    .catch((err) => res.status(500).send(err));
};
exports.postUpdateUser = (req, res) => {
  const { id, username, email, phone } = req.body;

  User.update({ username, email, phone }, { where: { id } })
    .then(() => res.send("User updated successfully"))
    .catch((err) => res.status(500).send(err));
};
