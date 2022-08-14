const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this ID' })
                    : res.json(thought)
            )
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: _id } },
                { new: true }
            )
            )
            .then((user) =>
                !user
                    ? res.status(400).json({ message: 'No user found with this ID' })
                    : res.json(user)
            )
            .catch((err) => res.json(err))
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $set: req.body }, { runValidators: true, new: true })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this ID' })
                    : User.findOneAndUpdate({ username: req.body.username }, { $pull: { thoughts: { _id: req.params.thoughtId } } })
            )
            .then(() => res.json({ message: 'Thought has been deleted' }))
            .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'No thought found with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'No thought found with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
}