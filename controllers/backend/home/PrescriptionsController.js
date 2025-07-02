
var medicineModel = require('../../../models/backend/home/MedicineModel');
var appointmentsModel = require('../../../models/backend/home/AppointmentsModel');
var patientsModel = require('../../../models/backend/home/PatientsModel');
var prescriptionsModel = require('../../../models/backend/home/PrescriptionsModel');

const { body, validationResult } = require('express-validator');
  
function PrescriptionsController() { 

this.viewPrescriptions = function (req, res) {
    Promise.all([
        medicineModel.Medicineviews(),
        appointmentsModel.getAppointments(),
        patientsModel.getPatients(),
        prescriptionsModel.getPrescriptions()
    ])
    .then(([medicines, appoint, patients, prescriptions]) => {
        res.render('backend/home/Prescriptions.ejs', {
            title: 'Dental clinic',
            content: 'View Prescriptions',
            medicines, appoint, patients, prescriptions
        });
    })
    .catch(err => {
        res.status(500).send({ error: 'Failed to fetch data', details: err });
    });
};


this.prescriptions_register = function (req, res) {
  const {
    patient_id,
    appointment_id,
    medicine_id,
    dosage,
    frequency,
    duration,
    instructions
  } = req.body;

  //console.log('Incoming Prescription:', req.body);

  prescriptionsModel.prescriptions_register(
    patient_id,
    appointment_id,
    medicine_id,
    dosage,
    frequency,
    duration,
    instructions
  )
  .then(() => res.status(200).send({ message: 'Prescription added successfully!' }))
  .catch(err => {
    console.error('Failed to insert prescription:', err);
    res.status(500).send({ error: 'Failed to insert prescription', details: err });
  });
};



this.prescription_edit = function (req, res) {
    const {
        prescription_id,
        patient_id,
        appointment_id,
        medicine_id,
        dosage,
        frequency,
        duration,
        instructions
    } = req.body;

    console.log('Updating Prescription:', {
        prescription_id,
        patient_id,
        appointment_id,
        medicine_id,
        dosage,
        frequency,
        duration,
        instructions
    });

    prescriptionsModel.prescription_edit(
        prescription_id,
        patient_id,
        appointment_id,
        medicine_id,
        dosage,
        frequency,
        duration,
        instructions
    )
    .then(() => res.status(200).send({ message: 'Prescription updated successfully!' }))
    .catch(err => res.status(500).send({ error: 'Failed to update prescription', details: err }));
};


// Route to handle Appointment delete
this.prescription_delete = function (req, res) {
    const { id } = req.body;
    prescriptionsModel.prescription_delete(id)
        .then(() => res.status(200).send({ message: 'prescription deleted successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to delete prescription', details: err }));
}; 
}
module.exports = new PrescriptionsController;