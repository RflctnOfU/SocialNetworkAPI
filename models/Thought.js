const { Schema, model } = require('mongoose');
const date = require('date-and-time');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => date.format(createdAtVal, 'MM/DD/YYYY')
        },
        username: {
            type: String,
            require: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
    {
        timestamps: true,
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;