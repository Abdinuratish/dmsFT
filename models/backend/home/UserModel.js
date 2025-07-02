
function UserModel() {
    // View all users
    this.getAllUsers = function () {
    return new Promise((resolve, reject) => {
        const query = `
             select * from users
        `;
        connection.query(query, (err, rows) => {
            if (err) {
                console.error('Database Fetch Error:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}; 

    // Add a user
    this.addUser = function (username, password, role) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
            connection.query(query, [username, password, role], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    };
}

module.exports = new UserModel();