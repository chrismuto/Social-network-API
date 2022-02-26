const {
  Thought,
  User
} = require('../models');

const postThoughts = async (req, res) => {
  try {
    let newThought = await Thought.create(req.body)
    let newThoughtId = newThought._id;

    let user = await User.findOne({
      id: req.body.userId
    });
    user.thoughts = user.thoughts.concat(newThoughtId)
    await user.save()

    return res.json(newThought)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateThought = async (req, res) => {
  try {
    let thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
      )
      !thought
      ? res.status(404).json({ message: "That thought does not exist!" })
      : res.json(thought)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
}

function getThoughts(req, res) {
  Thought.find()
    .then((thoughts) => {
      return res.json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

function getOneThought(req, res) {
  Thought.findOne({
      _id: req.params.id
    })
    .then((thoughts) => {
      return res.json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

function deleteThought(req, res) {
  Thought.findOneAndDelete({
      _id: req.params.id
    })
    .then((thought) =>
      !thought ?
      res.status(404).json({
        message: 'No thought with that ID'
      }) :
      User.deleteMany({
        _id: {
          $in: thought.User
        }
      })
    )
    .then(() => res.json({
      message: 'Course and students deleted!'
    }))
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  postThoughts,
  getThoughts,
  getOneThought,
  deleteThought,
  updateThought
}