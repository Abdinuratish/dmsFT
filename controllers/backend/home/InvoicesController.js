var medicineModel = require('../../../models/backend/home/MedicineModel');
var appointmentsModel = require('../../../models/backend/home/AppointmentsModel');
var patientsModel = require('../../../models/backend/home/PatientsModel');
var prescriptionsModel = require('../../../models/backend/home/PrescriptionsModel');
var InvoicesModel = require('../../../models/backend/home/InvoicesModel');
const { body, validationResult } = require('express-validator');
function InvoicesController() { 

this.getInvoices = function (req, res) {
    Promise.all([
        InvoicesModel.getInvoices() 
    ])
    .then(([invoices]) => {
        res.render('backend/home/Invoices.ejs', {
            title: 'Dental clinic',
            content: 'View Invoices',
           invoices
        });
    })
    .catch(err => {
        res.status(500).send({ error: 'Failed to fetch data', details: err });
    });
}; 
}
module.exports = new InvoicesController;