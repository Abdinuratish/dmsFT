
function MedicineModel(){

this.Medicineviews = function () {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                medicine_id,
                name,
                description,
                quantity,
                price,
                DATE_FORMAT(expiry_date, '%Y/%m/%d') AS expiry_date,
                DATE_FORMAT(created_at, '%Y/%m/%d %H:%i:%s') AS created_at
            FROM medicines
            ORDER BY expiry_date ASC
        `;

        connection.query(query, (err, rows) => {
            if (err) {
                console.error('Database Fetch Error (Medicines):', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};



this.medicine_register = function (name, description, quantity, price, expiry_date) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO medicines (name, description, quantity, price, expiry_date)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [name, description, quantity, price, expiry_date];

        connection.query(query, values, (err, rows) => {
            if (err) {
                console.error('Insert Error:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};


// Update a order's information my CashOrdersModel();

 this.medicine_edit = function (id, name, description, quantity, price, expiry_date) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE medicines 
            SET name = ?, description = ?, quantity = ?, price = ?, expiry_date = ?
            WHERE medicine_id = ?
        `;
        const values = [name, description, quantity, price, expiry_date, id];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Update Error (Medicine):', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};



// Delete a order
this.medicine_delete = function (id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `medicines` WHERE medicine_id = ?';
        connection.query(query, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}; 
}
module.exports = new MedicineModel();