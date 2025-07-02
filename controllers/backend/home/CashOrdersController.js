var orderModel = require('../../../models/backend/home/CashOrdersModel.js');
var studentModel = require('../../../models/backend/home/StudentModel');

function CashOrdersController() {
 
     
this.orderviews = function (req, res) {
    Promise.all([orderModel.getAllorders(), studentModel.getAllstudents()])
        .then(([orders, students]) => {
            res.render('backend/home/CashOrders.ejs', { 
                title: 'Dental clinic', 
                content: 'New orders', 
                orders: orders, 
                students: students 
            });
        })
        .catch(err => {
            res.status(500).send({ error: 'Failed to fetch data', details: err });
        });
};

this.orderviews_filter = function (req, res) {
    // Check if the body is empty
    if (Object.keys(req.body).length === 0) {
        // If body is empty, call orderviews
        this.orderviews(req, res);
        return;
    }

    const { startDate, endDate, status } = req.body;
    // Fetch both filtered orders and students
    Promise.all([
        orderModel.getAllorders_filter(startDate, endDate, status),
        studentModel.getAllstudents()
    ])
    .then(([orders, students]) => {
        res.render('backend/home/CashOrders.ejs', {
            title: 'Dental clinic',
            content: 'Filtered orders',
            orders: orders,
            students: students
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
module.exports = new CashOrdersController;