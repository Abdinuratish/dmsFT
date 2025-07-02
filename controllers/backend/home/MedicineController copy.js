
var medicineModel = require('../../../models/backend/home/MedicineModel');

const { body, validationResult } = require('express-validator');

const fs = require("fs");
const path = require("path");
const multer = require("multer"); 

function MedicineController() { 

    this.viewMedicine = function (req, res) {
        Promise.all([medicineModel.Medicineviews()   ])
            .then(([medicines]) => {
                res.render('backend/home/Medicines.ejs', { 
                    title: 'Dental clinic', 
                    content: 'View Patient', 
                    medicines:medicines 
                });
            })
            .catch(err => {
                res.status(500).send({ error: 'Failed to fetch data', details: err });
            });
    };  

this.medicine_register = function (req, res) {
    const { name, description, quantity, price, expiry_date } = req.body;
    console.log('Incoming Data:', { name, description, quantity, price, expiry_date });

    medicineModel.medicine_register(name, description, quantity, price, expiry_date)
        .then(() => res.status(200).send({ message: 'Medicine inserted successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to insert Medicine', details: err }));
};


this.medicine_edit = function (req, res) {
    const { id, name, description, quantity, price, expiry_date } = req.body;
   // Log the incoming update data
    console.log('Updating Medicine:', {
        id,
        name,
        description,
        quantity,
        price,
        expiry_date
    });
    
    medicineModel.medicine_edit(id, name, description, quantity, price, expiry_date)
        .then(() => res.status(200).send({ message: 'Medicine updated successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to update medicine', details: err }));
};


 
// Route to handle Appointment delete
this.medicine_delete = function (req, res) {
    const { id } = req.body;
    medicineModel.medicine_delete(id)
        .then(() => res.status(200).send({ message: 'Medicine deleted successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to delete Medicine', details: err }));
}; 
    



}
module.exports = new MedicineController;