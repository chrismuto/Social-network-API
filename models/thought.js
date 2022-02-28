const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')

// Schema to create thought model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        unique: true,
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
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
});

const Reaction = model( 'Reaction', reactionSchema);
const Thought = model('Thought', thoughtSchema);

module.exports = { Thought, Reaction };