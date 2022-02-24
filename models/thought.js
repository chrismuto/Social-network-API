const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

// Schema to create thought model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        unique: true,
        length: [1, 280],
    },
    createdAt: {
        type: Date,
        default: "insert current time stamp - use getter method to format",
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
    },
});

const thought = model('thought', thoughtSchema);

module.exports = thought;