
function AppointmentsModel(){

this.getAppointments = function () {
    return new Promise((resolve, reject) => {
        const query = `
SELECT 
    a.id,
    DATE_FORMAT(a.created_at, '%Y/%m/%d %H:%i:%s') AS created_at,
    DATE_FORMAT(a.appointment_datetime, '%Y/%m/%d %H:%i:%s') AS appointment_datetime,
    a.status,
    a.notes,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    s.name AS service_name
FROM appointments a
JOIN patients p ON a.patient_id = p.id
LEFT JOIN services s ON a.service_id = s.id
ORDER BY a.appointment_datetime DESC
        `;

        connection.query(query, (err, rows) => {
            if (err) {
                console.error('Database Fetch Error (Appointments):', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};


this.appointment_register = function (appointment_datetime, service_id, patient_id, status) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO appointments (appointment_datetime, service_id, patient_id, status) VALUES (?, ?, ?, ?)';
        const values = [appointment_datetime, service_id, patient_id, status];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}; 

// Update a order's information my CashOrdersModel();

this.edit_appointment= function (patient_id, service_id, note, status,id) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE `appointments` SET patient_id = ?, service_id = ?,notes = ? ,status = ? WHERE id = ?';
        const values = [patient_id, service_id, note,status, id];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Delete a order
this.delete_appointment = function (id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `appointments` WHERE id = ?';
        connection.query(query, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}; 
}
module.exports = new AppointmentsModel();