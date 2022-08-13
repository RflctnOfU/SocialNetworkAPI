const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema(
    {
        username: { type: String, require: true, unique: true, trim: true },
        email: { type: String, require: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/] },
        thoughts: [Thought],
        friends: [User],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
    },
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;