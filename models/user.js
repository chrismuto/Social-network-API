const {
  Schema,
  model
} = require('mongoose');

const userSchema = new Schema({
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
      validator: function (email) {
        return /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/.test(email);
      },
      message: "please use a valid email address"
    }
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {
  toJSON: {
    getters: true,
    virtuals: true,
  },
  id:false,
});

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

const User = model('User', userSchema);

module.exports = User;