const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, ref: 'User' },
        reactionBody: { type: String, require: true, maxLength: 280 },
        username: { type: String, require: true },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: () => format date
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
)

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
            // get: () => format dates
        },
        username: {
            type: String,
            require: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;