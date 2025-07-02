
var UserModel= require('../../../models/backend/home/UserModel');
const { body, validationResult } = require('express-validator');
const fs = require("fs");
const path = require("path");
const multer = require("multer"); 
function UserController() {
  this.userviews = function (req, res) {
        Promise.all([UserModel.getAllUsers()])
            .then(([users]) => {
                res.render('backend/home/usermanagement.ejs', { 
                    title: 'Dental clinic', 
                    content: 'View Users', 
                    users: users 
                });
            })
            .catch(err => {
                res.status(500).send({ error: 'Failed to fetch data', details: err });
            });
    }; 

 this.newuser = function (req, res) {
        res.render('backend/home/userRegister.ejs', {
            title: 'Dental clinic',
            content: 'New User',
        });
    };


    // Route to handle user register

this.user_register = [
  // Validate and sanitize input
  body('username').notEmpty().withMessage('Username is required').trim().escape(),
  body('password').notEmpty().withMessage('Password is required').trim().escape(),
  body('role').notEmpty().withMessage('Role is required').trim().escape(),

  // Handle the request
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

   UserModel.addUser(username, password, role)

      .then(() => res.status(200).send({ message: 'User registered successfully!' }))
      .catch(err => {
        console.error(err); // Log the error for debugging
        res.status(500).send({ error: 'Failed to register user', details: err.message });
      });
  }
];
    this.editUser = function (id, username, password, role) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
        connection.query(query, [username, password, role, id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
};




}
    

module.exports = UserController;
