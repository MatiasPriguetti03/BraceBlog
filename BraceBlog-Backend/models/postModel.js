const {Schema, model} = require('mongoose');
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },    
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Frontend', 'Backend', 'Full-Stack', 'AI', 'Devops', 'Mobile', 'Web3','Cloud', 'Security', 'Database', 'Low-Level', 'Networking-Infrastructure', 'Uncategorized'],
        message: "{VALUE} is not a valid category",
    },    
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    thumbnail: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model('Post', postSchema);