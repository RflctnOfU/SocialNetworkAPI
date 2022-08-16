const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, ref: 'User' },
        reactionBody: { type: String, require: true, maxLength: 280 },
        username: { type: String, require: true },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => date.format(createdAtVal, 'MM/DD/YYYY')
        }
    },
    {
        toJSON: {
            getters: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = reactionSchema;