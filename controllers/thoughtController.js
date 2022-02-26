const {
  Thought,
  User
} = require('../models');

// Create a new post
const postThoughts = async (req, res) => {
  try {
    let newThought = await Thought.create(req.body)
    let user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
      );
    return res.json(newThought)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Update a new post
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

// Get all posts
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

// Get a specific post
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

// Delete a post
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

// Reactions are a sin
function deleteReaction(req, res) {
  Thought.findOneAndDelete({
      _id: req.params.id
    })
    .then((reaction) =>
      !reaction ?
      res.status(404).json({
        message: 'No reaction with that ID'
      }) :
      Thought.deleteMany({
        _id: {
          $in: reaction.Thought
        }
      })
    )
    .then(() => res.json({
      message: 'Course and students deleted!'
    }))
    .catch((err) => res.status(500).json(err));
}

// Reactions are a sin against Nature
function getReaction(req, res) {
  Thought.find()
    .then((thoughts) => {
      return res.json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

// Reactions are the worst
const createReaction = async (req, res) => {
  try {
    let newReaction = await reactionSchema.create(req.body)
    let user = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { thoughts: newReaction._id } },
      { new: true }
      );
      console.log(newReaction)
    return res.json(newReaction)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  postThoughts,
  getThoughts,
  getOneThought,
  deleteThought,
  updateThought,
  getReaction,
  createReaction,
  deleteReaction
}