const {
  Thought,
  User
} = require('../models');

// module.exports = {
// Post thought
// postThoughts(req, res) {
//   Thought.create(req.body)
//     .then(newPost => {
//       console.log(req.body)
//       User.findOneAndUpdate(
//         { _id: req.body.userId },
//         { $addToSet: { thoughts: newPost._id } },
//         {new: true},
//         )
//         res.json(newPost)
//     })
//     .then(postCheck => {
//       console.log(postCheck)
//         if (!postCheck) {
//             return res.status(404)
//         }
//         return res.json("you shared a thought!")
//     })
//     .catch((err) => res.status(500));
// },
const postThoughts = async (req, res) => {
  try {
    let newThought = await Thought.create(req.body)
    let newThoughtId = newThought._id;

    let user = await User.findOne({
      id: req.body.userId
    });
    console.log(user)
    user.thoughts = user.thoughts.concat(newThoughtId)
    await user.save()

    return res.json(newThought)
  } catch (err) {
    res.status(500)
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
  deleteThought
}