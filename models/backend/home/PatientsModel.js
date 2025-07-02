function PatientsModel(){
    this.patients_register = function (first_name, last_name, gender, date_of_birth, phone, email, address, city, state, zip_code) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO `patients` (first_name, last_name, gender, date_of_birth, phone, email, address, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [first_name, last_name, gender, date_of_birth, phone, email, address, city, state, zip_code];
            connection.query(query, values, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    };
    
 

this.getPatients = function () {
    return new Promise((resolve, reject) => {
        const query = `
             select * from patients
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
module.exports = new PatientsModel();