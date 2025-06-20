const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'generic_avatar.png',
  },  
  posts: {
    type: Number,
    default: 0
  },
  specialty: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  }
});

module.exports = model('User', userSchema);