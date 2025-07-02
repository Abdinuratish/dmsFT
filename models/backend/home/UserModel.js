const db = require('../../../db'); // adjust path as needed

module.exports = {
  getAllUsers: async function () {
    return db.query('SELECT * FROM users');
  },
  addUser: async function (username, password, role_id) {
    return db.query('INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)', [username, password, role_id]);
  },
  deleteUser: async function (id) {
    return db.query('DELETE FROM users WHERE id = ?', [id]);
  },
  editUser: async function (id, username, password, role_id) {
    return db.query('UPDATE users SET username=?, password=?, role_id=? WHERE id=?', [username, password, role_id, id]);
  }
};