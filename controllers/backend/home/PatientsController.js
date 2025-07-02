var patientsModel = require('../../../models/backend/home/PatientsModel');
const { body, validationResult } = require('express-validator');

const fs = require("fs");
const path = require("path");
const multer = require("multer"); 
function PatientsController() { 

    
    this.patientviews = function (req, res) {
        Promise.all([patientsModel.getPatients()])
            .then(([patients]) => {
                res.render('backend/home/Patients.ejs', { 
                    title: 'Dental clinic', 
                    content: 'View Patient', 
                    patients: patients 
                });
            })
            .catch(err => {
                res.status(500).send({ error: 'Failed to fetch data', details: err });
            });
    }; 



    this.newpatients = function (req, res) {
        res.render('backend/home/patientreg.ejs', {
            title: 'Dental clinic',
            content: 'New Patient',
        });
    };
    

    
 // Route to handle patient register

this.patients_register = [
  // Validate and sanitize input
  body('first_name').notEmpty().withMessage('First name is required').trim().escape(),
  body('last_name').notEmpty().withMessage('Last name is required').trim().escape(),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('date_of_birth').isDate().withMessage('Invalid date of birth'),
  body('zip_code').isPostalCode('any').withMessage('Invalid zip code'),

  // Handle the request
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const {
      first_name, last_name, gender, date_of_birth, phone,
      email, address, city, state, zip_code
    } = req.body;

    patientsModel.patients_register(first_name, last_name, gender, date_of_birth, phone, email, address, city, state, zip_code)
      .then(() => res.status(200).send({ message: 'Patient inserted successfully!' }))
      .catch(err => {
        console.error(err); // Log the error for debugging
        res.status(500).send({ error: 'Failed to insert patient', details: err.message });
      });
  }
];



 this.studentviews = function (req, res) {
    
    patientsModel.getAllstudents()
        .then(students => {
            res.render('backend/home/studentsview.ejs', { title: 'Dental clinic', content: 'Students', data: students });
        })
        .catch(err => {
            res.status(500).send({ error: 'Failed to fetch students data', details: err });
        });
}; 

 

 
// Route to handle student edit
this.edit_student = function (req, res) {
    const { id, name, email, address } = req.body; 

   // console.log('Incoming Data new :', { id, name, email, address } );

    patientsModel.edit_student(id, name, email, address)
        .then(() => res.status(200).send({ message: 'student updated successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to update student', details: err }));
};

// Route to handle student delete
this.delete_student = function (req, res) {
    const { id } = req.body;
    patientsModel.delete_student(id)
        .then(() => res.status(200).send({ message: 'student deleted successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to delete student', details: err }));
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
 
   
   patientsModel.studentControll_register(stdid,desc )
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
    
        patientsModel.edit_std_controll(description, id)
            .then(() => res.status(200).send({ message: 'Student controll updated successfully!' }))
            .catch(err => {
                console.error('Update Error:', err);
                res.status(500).send({ error: 'Failed to update student controll', details: err });
            });
    };
    


    // Route to handle student controll delete
this.delete_std_controll = function (req, res) {
    const { id } = req.body;
    patientsModel.delete_std_controll(id)
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
        patientsModel.getAllstdControl_filter(startDate, endDate),
        patientsModel.getAllstudents()
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
    Promise.all([patientsModel.getAllstudents(), patientsModel.getGraduateStudents()])
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
 
   patientsModel.GraduateStudents_register(stdid,description, graduatedate )
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
       patientsModel.getGraduateStudents_filter(startDate, endDate),
       patientsModel.getAllstudents()
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

    patientsModel.edit_graduates(description, id)
        .then(() => res.status(200).send({ message: 'Graduate student updated successfully!' }))
        .catch(err => {
            console.error('Update Error:', err);
            res.status(500).send({ error: 'Failed to update Graduate student ', details: err });
        });

};
// Route to handle patient edit
this.edit_patient = function (req, res) {
    const {
        id, first_name, last_name, gender, date_of_birth, phone,
        email, address, city, state, zip_code
    } = req.body;

    if (!id || !first_name || !last_name || !gender || !date_of_birth || !phone || !email || !address || !city || !state) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    patientsModel.edit_patient(
        id, first_name, last_name, gender, date_of_birth, phone, email, address, city, state, zip_code
    )
    .then(() => res.status(200).send({ message: 'Patient updated successfully!' }))
    .catch(err => res.status(500).send({ error: 'Failed to update patient', details: err }));
};


    // Route to handle student controll delete
    




}
module.exports = new PatientsController;