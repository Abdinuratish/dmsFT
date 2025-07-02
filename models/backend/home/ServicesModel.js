
function ServicesModel(){

this.serviceviews = function () {
    return new Promise((resolve, reject) => {
        const query = `
SELECT DATE_FORMAT(created_at, '%Y/%m/%d %H:%i:%s') AS created_at, id ,description, category, price, duration_minutes, name, is_active
FROM services
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

this.service_register = function (name, description, category, price, duration_minutes, is_activ) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO services (name, description, category, price, duration_minutes, is_active) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [name, description, category, price, duration_minutes, is_activ];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}; 

// Update a order's information my CashOrdersModel();

this.edit_services= function (name, description, status, id) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE `services` SET name = ?, description = ?, is_active = ? WHERE id = ?';
        const values = [name, description,status,id];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Delete a order
this.delete_services = function (id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `services` WHERE id = ?';
        connection.query(query, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}; 
}
module.exports = new ServicesModel();