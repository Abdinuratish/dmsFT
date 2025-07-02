const User = require('../../../models/backend/home/Usermodel');

const UserController = {
  viewUsers: async (req, res) => {
    try {
      const users = await User.getAllUsers(); // Use MySQL model
      res.render('backend/user/usermanagement.ejs', {
        users: users,
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  addUser: async (req, res) => {
    try {
      const { username, password, role_id } = req.body;
      await User.addUser(username, password, role_id); // Use model
      res.json({ message: 'User added successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add user' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.body;
      await User.deleteUser(id); // Use model
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }
};

module.exports = UserController;
