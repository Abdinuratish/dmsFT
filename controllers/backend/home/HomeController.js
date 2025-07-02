var HomeModel = require('../../../models/backend/home/HomeModel.js');
var cashOrdersModel = require('../../../models/backend/home/CashOrdersModel.js');
function HomeController() {


   this.showLogin = function(req, res) { 
    Promise.all([])
        .then(function([]) { 
            res.render('auth/login.ejs', {
                title: 'Dental Clinic',
                content: 'Login', 
                data: {} 
            });
        })
        .catch(function(err) {
            console.error('Error:', err);
            res.status(500).send({ error: err });
        });
};



    // this.index = function(req, res) {
    //    var promise = HomeModel.insert();  
    //    promise.then(function(data){
    //        res.render('backend/home/index.ejs', {title: 'Dental clinic', content: 'Dashboard', data: data});
    //    }).catch(function(err){
    //        res.status(500).send({ error: err });
    //    });
    // } 
    
   this.index = function(req, res) {
    // Fetch counts of pending, approved, and rejected orders
    // var pendingPromise = cashOrdersModel.getCashOrdersPending();
    // var approvedPromise = cashOrdersModel.getCashOrdersAproved();
    // var rejectedPromise = cashOrdersModel.getCashOrdersRejected();

    // Resolve all promises in parallel
    Promise.all([])
        .then(function([]) {
            // Access the total count from the first row of each result
            // const pendingCount = pendingResult[0].total_count || 0;
            // const approvedCount = approvedResult[0].total_count || 0;
            // const rejectedCount = rejectedResult[0].total_count || 0;

            // Render the view with counts
            res.render('backend/home/index.ejs', {
                title: 'Dental Clinic',
                content: 'Dashboard',
                // pendingCount: pendingCount,
                // approvedCount: approvedCount,
                // rejectedCount: rejectedCount,
                data: {} // Replace with actual data if needed
            });
        })
        .catch(function(err) {
            console.error('Error:', err);
            res.status(500).send({ error: err });
        });
};
}

module.exports = new HomeController;