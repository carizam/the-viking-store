const User = require('./User');
const bcrypt = require('bcrypt');

class UserDao {
  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    return newUser.save();
  }

  async findUserByEmail(email) {
    return User.findOne({ email });
  }

  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
}

module.exports = new UserDao();
