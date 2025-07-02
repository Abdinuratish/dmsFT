function MainAccountsModel(){

        // Insert a order's information cashorder_register
this.account_register = function (studentId,editAmount1,description) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO `mainaccounts` (name, amount, descriptions) VALUES (?, ?, ?)';
        const values = [studentId,editAmount1,description];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
 

this.getAccounts = function () {
    return new Promise((resolve, reject) => {
        const query = `
             select * from mainaccounts
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


// Update a order's information my CashOrdersModel();

this.edit_account = function (amount, statusid, id) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE `cashorders` SET amount = ?, statusid = ? WHERE id = ?';
        const values = [amount, statusid, id];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Delete a order
this.delete_account = function (id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `cashorders` WHERE id = ?';
        connection.query(query, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}; 
}
module.exports = new MainAccountsModel();