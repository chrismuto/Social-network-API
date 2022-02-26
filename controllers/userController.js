const { User } = require('../models');

const updateUser = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
      )
      console.log(user)
      !user
      ? res.status(404).json({ message: "That thought does not exist!" })
      : res.json(user)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
}

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find({}).populate("thoughts", {
      thoughtText: 1,
      username: 1,
      createdAt: 1
    })
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
  },
  createUser(req, res) {
    User.create(req.body)
    .then(newUser => {
      if (!newUser) {
        return res.status(404).json("User was not created!")
      }
      res.json(newUser)
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  getOneUser(req, res) {
    User.findOne( { _id: req.params.id } ).populate("thoughts", {
      thoughtText: 1,
      username: 1,
      createdAt: 1
    })
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : User.deleteMany({ _id: { $in: user.Thought } })
      )
      .then(() => res.json({ message: 'User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  updateUser
}