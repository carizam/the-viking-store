const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  role: { type: String, default: 'user' }
});

const User = model('User', userSchema);

module.exports = User;
