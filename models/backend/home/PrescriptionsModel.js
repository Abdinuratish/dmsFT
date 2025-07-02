function PrescriptionsModel() {

    // Fetch all prescriptions with related data
    this.getPrescriptions = function () {
        return new Promise((resolve, reject) => {
            const query = `
SELECT 
    pr.prescription_id,
    DATE_FORMAT(pr.prescribed_date, '%Y/%m/%d %H:%i:%s') AS prescribed_date,
    pr.dosage,
    pr.frequency,
    pr.duration,
    pr.instructions,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    m.name AS medicine_name,
    DATE_FORMAT(a.appointment_datetime, '%Y/%m/%d %H:%i:%s') AS appointment_datetime
FROM prescriptions pr
JOIN patients p ON pr.patient_id = p.id
JOIN medicines m ON pr.medicine_id = m.medicine_id
JOIN appointments a ON pr.appointment_id = a.id
ORDER BY pr.prescribed_date DESC
            `;

            connection.query(query, (err, rows) => {
                if (err) {
                    console.error('Database Fetch Error (Prescriptions):', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    // Register a new prescription
    this.prescriptions_register = function (patient_id, appointment_id, medicine_id, dosage, frequency, duration, instructions) {
        return new Promise((resolve, reject) => {
            const query = `
INSERT INTO prescriptions 
(patient_id, appointment_id, medicine_id, dosage, frequency, duration, instructions) 
VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [patient_id, appointment_id, medicine_id, dosage, frequency, duration, instructions];
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

    // Edit an existing prescription
   this.prescription_edit = function (
  prescription_id,
  patient_id,
  appointment_id,
  medicine_id,
  dosage,
  frequency,
  duration,
  instructions
) {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE prescriptions 
      SET patient_id = ?, appointment_id = ?, medicine_id = ?, dosage = ?, frequency = ?, duration = ?, instructions = ? 
      WHERE prescription_id = ?
    `;
    const values = [patient_id, appointment_id, medicine_id, dosage, frequency, duration, instructions, prescription_id];
    connection.query(query, values, (err, rows) => {
      if (err) {
        console.error('Update Error:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


    // Delete a prescription
    this.prescription_delete = function (prescription_id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM prescriptions WHERE prescription_id = ?';
            connection.query(query, [prescription_id], (err, rows) => {
                if (err) {
                    console.error('Delete Error:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

}

module.exports = new PrescriptionsModel();
