const { Schema, model } = require('mongoose');
// const { thoughtSchema, reactionSchema } = require('./Thought');

const userSchema = new Schema(
    {
        username: { type: String, require: true, unique: true, trim: true },
        email: { type: String, require: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/] },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    },
    {
        timestamps: true,
    },
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;