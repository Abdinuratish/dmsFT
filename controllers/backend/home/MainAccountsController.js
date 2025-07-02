var orderModel = require('../../../models/backend/home/CashOrdersModel.js');
var mainAccountsModel = require('../../../models/backend/home/MainAccountsModel.js');

function MainAccountsController() {
 
this.viewMainAccounts = function (req, res) {
    Promise.all([mainAccountsModel.getAccounts()])
        .then(([accounts]) => {
            res.render('backend/home/Mainaccounts.ejs', { 
                title: 'Dental clinic', 
                content: 'Accounts', 
                accounts: accounts 
            });
        })
        .catch(err => {
            res.status(500).send({ error: 'Failed to fetch data', details: err });
        });
}; 

    // Route to handle order edit
    this.order_register = function (req, res) {
        const {studentId,editAmount1,description} = req.body;
        orderModel.order_register(studentId,editAmount1,description)
            .then(() => res.status(200).send({ message: 'order insert successfully!' }))
            .catch(err => res.status(500).send({ error: 'Failed to insert order', details: err }));
    }; 
    
    // Route to handle order edit
this.edit_order = function (req, res) { 
    const { id, amount, statusid } = req.body;
   // console.log('Incoming Data:', { id, amount, statusid });

    if (!id || !amount || !statusid) {
        return res.status(400).send({ error: 'Missing required fields' });
    }

    //const { id, amount, statusid} = req.body;

    orderModel.edit_order(amount, statusid, id)
        .then(() => res.status(200).send({ message: 'order updated successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to update order', details: err }));
};

// Route to handle order delete
this.delete_order = function (req, res) {
    const { id } = req.body;
    orderModel.delete_order(id)
        .then(() => res.status(200).send({ message: 'order deleted successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to delete order', details: err }));
}; 

}
module.exports = new MainAccountsController;