var GuestModel = require('../../../models/backend/home/GuestModel.js');

function GuestController() {
 
    this.newguests = function(req, res) {
             res.render('backend/home/newguests.ejs', {title: 'Dental clinic', content: 'New guests', data: []});
      } 

//       this.guestviews = function(req, res) {
//         res.render('backend/home/guestview.ejs', {title: 'Dental clinic', content: 'Guest view', data: []});
//  }



 this.guestviews = function (req, res) {
    GuestModel.getAllGuests()
        .then(guests => {
            res.render('backend/home/guestview.ejs', { title: 'Dental clinic', content: 'New guests', data: guests });
        })
        .catch(err => {
            res.status(500).send({ error: 'Failed to fetch guests data', details: err });
        });
}; 



    // Route to handle guest edit
    this.guest_register = function (req, res) {
        const {phone, name, email, address } = req.body;
        GuestModel.guest_register(phone, name, email, address)
            .then(() => res.status(200).send({ message: 'Guest insert successfully!' }))
            .catch(err => res.status(500).send({ error: 'Failed to insert guest', details: err }));
    }; 
    
    // Route to handle guest edit
this.edit_guest = function (req, res) {
    const { id, name, email, address } = req.body;
    GuestModel.edit_guest(id, name, email, address)
        .then(() => res.status(200).send({ message: 'Guest updated successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to update guest', details: err }));
};

// Route to handle guest delete
this.delete_guest = function (req, res) {
    const { id } = req.body;
    GuestModel.delete_guest(id)
        .then(() => res.status(200).send({ message: 'Guest deleted successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to delete guest', details: err }));
};
 


this.user_register = function (req, res) {
    const {confirmPassword, password, email } = req.body;
     usersModel.user_register(password, email)
         .then(() => res.status(200).send({ message: 'User registered successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to insert user', details: err }));
}; 

}
module.exports = new GuestController;