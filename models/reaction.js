const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    reactionText: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        getters: true,
    },
});

module.exports = reactionSchema;