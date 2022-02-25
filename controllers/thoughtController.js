const { Thought, User } = require('../models');

module.exports = {
    // Post thought
    postThoughts(req, res) {
      Thought.create(req.body)
        .then(newPost => {
          return User.findOneAndUpdate(
            {_id: req.body._id},
            { thoughts: newPost._id },
            {new: true},
            res.json(newPost)
          )
        })
        .then(postCheck => {
            if (!postCheck) {
                return res.status(404).json("your thought was bad")
            }
            return res.json("you shared a thought!")
        })
        .catch((err) => res.status(500).json("Server made a whoopsie!"));
    },
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => {
            return res.json(thoughts);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
      },
      getOneThought(req, res) {
        Thought.findOne({ _id: req.params.id } )
          .then((thoughts) => {
            return res.json(thoughts);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
      },
}