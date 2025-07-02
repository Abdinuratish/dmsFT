/* Routes 

app.get || app.post || app.put || app.delete || app.all

More: http://expressjs.com/en/guide/routing.html

 */

const GuestController = require('../controllers/backend/home/GuestController.js');
var HomeController = require('../controllers/backend/home/HomeController.js');
var studentController = require('../controllers/backend/home/StudentController.js');
var cashOrdersController = require('../controllers/backend/home/CashOrdersController.js');
var mainAccountsController = require('../controllers/backend/home/MainAccountsController.js');
var patientsController = require('../controllers/backend/home/PatientsController.js');
var servicesController= require('../controllers/backend/home/ServicesController.js');
var appointmentsController= require('../controllers/backend/home/AppointmentsController.js');
var medicineController= require('../controllers/backend/home/MedicineController.js');
var invoicesController= require('../controllers/backend/home/InvoicesController.js');
const AuthController = require('../controllers/backend/home/AuthController');

var prescriptionsController = require('../controllers/backend/home/PrescriptionsController.js');

 
module.exports = function(app) { 

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
   // res.redirect('/login');
   app.get('/login', HomeController.showLogin);
  }
}

   // Middleware for session check
  function isAuthenticated(req, res, next) {
    if (req.session.user) return next();
    res.redirect('/login');
  }

  // Auth routes (do NOT protect these)
  app.get('/login', AuthController.showLogin);
  app.post('/login', AuthController.login);
  app.get('/logout', AuthController.logout);

  // Protected Home Route
  app.get('/', isAuthenticated, (req, res) => {
    HomeController.index(req, res);
  });




    app.route('/viguestviews').get(function (req, res) {
      GuestController.guestviews(req, res);
    });

    app.route('/userregister').get(function (req, res) {
      GuestController.guestviews(req, res);
    });
    

    app.route('/vinewguests').get(function (req, res) {
      GuestController.newguests(req, res);
    });  

      
    
    // app.route('/vinewguests').get(function (req, res) {
    //   GuestController.newguests(req, res);
    // });  
 


    app.post('/guest_register', GuestController.guest_register);
    app.post('/edit_guest', GuestController.edit_guest);
    app.post('/delete_guest', GuestController.delete_guest);
   
    app.route('/vistudentviews').get(function (req, res) {
      studentController.studentviews(req, res);
    });
    

    app.route('/vistudentcontroll').get(function (req, res) {
      studentController.vistudentcontroll(req, res);
    });





    app.post('/student_register', studentController.student_register);
    app.post('/edit_student', studentController.edit_student);
    app.post('/delete_student', studentController.delete_student);
    


    
    
    app.route('/vicashordersview').get(function (req, res) {
      cashOrdersController.orderviews(req, res);
    });  

    app.post('/orderviews_filter', cashOrdersController.orderviews_filter);


     app.post('/edit_order', cashOrdersController.edit_order);     
    app.post('/delete_order', cashOrdersController.delete_order);

    app.post('/cashorder_register', cashOrdersController.order_register);

    app.post('/studentControll_register', studentController.studentControll_register);
    app.post('/edit_std_controll', studentController.edit_std_controll);     
    app.post('/delete_std_controll', studentController.delete_std_controll);

    app.post('/getAllstdControl_filter', studentController.getAllstdControl_filter);

    
    

    app.route('/visgraduatestudents').get(function (req, res) {
      studentController.visgraduatestudents(req, res);
    });

    app.post('/getGraduateStudents_filter', studentController.getGraduateStudents_filter);
    app.post('/visgraduatestudents_register', studentController.visgraduatestudents_register);
    app.post('/edit_graduates', studentController.edit_graduates);     
    app.post('/delete_graduates', studentController.delete_graduates);


    app.route('/vimainaccountsview').get(function (req, res) {
      mainAccountsController.viewMainAccounts(req, res);
    });











   




















    // new development
    app.route('/newpatients').get(function (req, res) {
      patientsController.newpatients(req, res);
    });    

    app.post('/patients_register', patientsController.patients_register);

    app.route('/patientviews').get(function (req, res) {
      patientsController.patientviews(req, res);
    });  

      //Services
    // app.route('/newservices').get(function (req, res) {
    //   servicesController.newservices(req, res);
    // });
  
    // app.post('/services_register', servicesController.services_register);
  
    app.route('/serviceviews').get(function (req, res) {
      servicesController.serviceviews(req, res);
    });

    app.post('/delete_services', servicesController.delete_services);
    app.post('/edit_services', servicesController.edit_services); 

    app.post('/service_register', servicesController.service_register);

  
  
    app.route('/viewAppointments').get(function (req, res) {
      appointmentsController.viewAppointments(req, res);
    });

    app.post('/appointment_register', appointmentsController.appointment_register); 

    app.post('/delete_appointment', appointmentsController.delete_appointment);

    app.post('/edit_appointment', appointmentsController.edit_appointment); 





      app.route('/viewMedicine').get(function (req, res) {
      medicineController.viewMedicine(req, res);
    });
    app.post('/medicine_register', medicineController.medicine_register);
    app.post('/medicine_delete', medicineController.medicine_delete);
    app.post('/medicine_edit', medicineController.medicine_edit); 





    app.route('/viewPrescriptions').get(function (req, res) {
      prescriptionsController.viewPrescriptions(req, res);
    });

    app.post('/prescriptions_register', prescriptionsController.prescriptions_register);

    app.post('/prescription_edit', prescriptionsController.prescription_edit);
       
    app.post('/prescription_delete', prescriptionsController.prescription_delete);

    app.route('/viewInvoices').get(function (req, res) {
      invoicesController.getInvoices(req, res);
    });
  };
 
