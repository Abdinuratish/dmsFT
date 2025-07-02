function UsersModel() {

    // ✅ Add User
    this.addUser = function (username, password, role) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO `users` (username, password, role) VALUES (?, ?, ?)';
            const values = [username, password, role];
            connection.query(query, values, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    };

    // ✅ View All Users
    this.getAllUsers = function () {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `users` ORDER BY id DESC';
            connection.query(query, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    };

    // 🗑️ Optional: Delete User
    this.deleteUser = function (id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM `users` WHERE id = ?';
            connection.query(query, [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    };

    // ✏️ Optional: Edit User
    this.editUser = function (id, username, password, role) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE `users` SET username = ?, password = ?, role = ? WHERE id = ?';
            const values = [username, password, role, id];
            connection.query(query, values, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    };
}

module.exports = new UsersModel();
