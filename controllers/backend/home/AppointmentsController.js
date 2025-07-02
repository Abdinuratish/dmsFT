var servicesModel = require('../../../models/backend/home/ServicesModel');
var patientsModel = require('../../../models/backend/home/PatientsModel');
var appointmentsModel = require('../../../models/backend/home/AppointmentsModel');

const { body, validationResult } = require('express-validator');

const fs = require("fs");
const path = require("path");
const multer = require("multer"); 

function AppointmentsController() {  
    this.viewAppointments = function (req, res) {
        Promise.all([servicesModel.serviceviews() ,patientsModel.getPatients(),appointmentsModel.getAppointments() ])
            .then(([services, patients, appointments]) => {
                res.render('backend/home/appointments.ejs', { 
                    title: 'Dental clinic', 
                    content: 'View Patient', 
                    services:services,
                    appointments: appointments,
                    patients : patients
                });
            })
            .catch(err => {
                res.status(500).send({ error: 'Failed to fetch data', details: err });
            });
    };  

 this.appointment_register = function (req, res) {
    const {appointment_datetime, service_id, patient_id, status} = req.body;
 
    appointmentsModel.appointment_register(appointment_datetime, service_id, patient_id ,status)
        .then(() => res.status(200).send({ message: 'Appointment inserted successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to insert Appointment', details: err }));
};  


// Route to handle student edit
this.edit_appointment = function (req, res) {
    const { patient_id, service_id,note, status, id } = req.body;  
    appointmentsModel.edit_appointment(patient_id, service_id, note,status, id)
        .then(() => res.status(200).send({ message: 'appointment updated successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to update appointment', details: err }));
};

// Route to handle Appointment delete
this.delete_appointment = function (req, res) {
    const { id } = req.body;
    appointmentsModel.delete_appointment(id)
        .then(() => res.status(200).send({ message: 'Appointment deleted successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to delete appointment', details: err }));
};
 


this.user_register = function (req, res) {
    const {confirmPassword, password, email } = req.body;
     usersModel.user_register(password, email)
         .then(() => res.status(200).send({ message: 'User registered successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to insert user', details: err }));
};  



   // Route to handle student edit
   this.studentControll_register = function (req, res) {
    const { stdid,desc } = req.body;
   if (!desc || !stdid) {
       return res.status(400).json({ message: 'All fields are required' });
   } 
 
   
   servicesModel.studentControll_register(stdid,desc )
       .then(() => res.status(200).send({ message: 'student controll insert successfully!' }))
       .catch(err => res.status(500).send({ error: 'Failed to insert student controll', details: err }));
};  

    // Route to handle student controll edit
    this.edit_std_controll = function (req, res) {
        const { description, id } = req.body;
    
        console.log('Incoming Data:', { description, id });
    
        if (!description || !id) {
            return res.status(400).send({ error: 'Missing required fields: description or id' });
        }
    
        servicesModel.edit_std_controll(description, id)
            .then(() => res.status(200).send({ message: 'Student controll updated successfully!' }))
            .catch(err => {
                console.error('Update Error:', err);
                res.status(500).send({ error: 'Failed to update student controll', details: err });
            });
    };
    


    // Route to handle student controll delete
this.delete_std_controll = function (req, res) {
    const { id } = req.body;
    servicesModel.delete_std_controll(id)
        .then(() => res.status(200).send({ message: 'student controll deleted successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to delete student controll', details: err }));
};



 this.getAllstdControl_filter = function (req, res) {
     // Check if the body is empty
     if (Object.keys(req.body).length === 0) {
         // If body is empty, call orderviews
         this.vistudentcontroll(req, res);
         return;
     }
 
     const { startDate, endDate } = req.body;
     console.log('Incoming Data new :', { startDate, endDate });

     // Fetch both filtered orders and students
     Promise.all([
        servicesModel.getAllstdControl_filter(startDate, endDate),
        servicesModel.getAllstudents()
     ])
     .then(([stdcontrol, students]) => {
         res.render('backend/home/StudentsControll.ejs', {
             title: 'Dental clinic',
             content: 'Filtered Control std',
             stdcontrol: stdcontrol,
             students: students
         });
     })
     .catch(err => {
         res.status(500).send({ error: 'Failed to fetch data', details: err });
     });
 }; 

 this.visgraduatestudents = function (req, res) {
    Promise.all([servicesModel.getAllstudents(), servicesModel.getGraduateStudents()])
        .then(([students, graduateStudents]) => {
            res.render('backend/home/Graduatestudents.ejs', { 
                title: 'Dental clinic', 
                content: 'Dental clinic', 
                graduateStudents: graduateStudents, 
                students: students 
            });
        })
        .catch(err => {
            res.status(500).send({ error: 'Failed to fetch data', details: err });
        });
}; 

   // Route to handle graduate students
   this.visgraduatestudents_register = function (req, res) {

    const { stdid,description, graduatedate } = req.body;

    console.log('Incoming Data new :', graduatedate + description + stdid);


   if (!description || !stdid  || !graduatedate) {
       return res.status(400).json({ message: 'All fields are required' });
   } 
 
   servicesModel.GraduateStudents_register(stdid,description, graduatedate )
       .then(() => res.status(200).send({ message: 'Graduate insert successfully!' }))
       .catch(err => res.status(500).send({ error: 'Failed to insert Graduate', details: err }));
};  

this.getGraduateStudents_filter = function (req, res) {
    // Check if the body is empty
    if (Object.keys(req.body).length === 0) {
        // If body is empty, call orderviews
        this.visgraduatestudents(req, res);
        return;
    }

    const { startDate, endDate } = req.body;

    console.log('Incoming Data new :', { startDate, endDate });

    // Fetch both filtered orders and students
    Promise.all([
       servicesModel.getGraduateStudents_filter(startDate, endDate),
       servicesModel.getAllstudents()
    ])
    .then(([graduateStudents, students]) => {
        res.render('backend/home/Graduatestudents.ejs', {
            title: 'Dental clinic',
            content: 'Filtered Control std',
            graduateStudents: graduateStudents,
            students: students
        });
    })
    .catch(err => {
        res.status(500).send({ error: 'Failed to fetch data', details: err });
    });
}; 


   // Route to handle  edit graduates
   this.edit_graduates = function (req, res) {
    const { description, id } = req.body;

    console.log('Incoming Data:', { description, id });

    if (!description || !id) {
        return res.status(400).send({ error: 'Missing required fields: description or id' });
    }

    servicesModel.edit_graduates(description, id)
        .then(() => res.status(200).send({ message: 'Graduate student updated successfully!' }))
        .catch(err => {
            console.error('Update Error:', err);
            res.status(500).send({ error: 'Failed to update Graduate student ', details: err });
        });
};



    // Route to handle student controll delete
    this.delete_graduates = function (req, res) {
        const { id } = req.body;
        servicesModel.delete_graduates(id)
            .then(() => res.status(200).send({ message: 'Graduate student deleted successfully!' }))
            .catch(err => res.status(500).send({ error: 'Failed to delete Graduate student ', details: err }));
    };




}
module.exports = new AppointmentsController;