function InvoicesModel() {
    // Fetch all prescriptions with related data
 this.getInvoices = function () {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                i.invoice_id,
                DATE_FORMAT(i.invoice_date, '%Y/%m/%d %H:%i:%s') AS invoice_date,
                i.total_amount,i.payment_status, CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
                DATE_FORMAT(a.appointment_datetime, '%Y/%m/%d %H:%i:%s') AS appointment_datetime
            FROM invoices i
            JOIN patients p ON i.patient_id = p.id
            JOIN appointments a ON i.appointment_id = a.id
            ORDER BY i.invoice_date DESC
        `;        
        connection.query(query, (err, rows) => {
            if (err) { console.error('Database Fetch Error (Invoices):', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};
}
module.exports = new InvoicesModel();
