const { Schema, model, Mongoose, default: mongoose } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, default: new mongoose.ObjectId },
        reactionBody: { type: String, require: true, maxLength: 280 },
        username: { type: String, require: true },
        createdAt: {
            type: Date,
            default: Date.now,
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

thoughtSchema.virtual('reactionCount')