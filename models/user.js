const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
          validator: function(email) {
            return /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/.test(email);
          },
          message: "please use a valid email address"
      }
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought'}],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

userSchema
  .virtual('friendCount')
  .get(function () {
      return friends.length;
  })
const User = model('user', userSchema);

module.exports = User;