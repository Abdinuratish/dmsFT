function GuestModel(){

    //     this.guest_register = function(name, phone, email, address) {
    //     return new Promise(function(resolve, reject) {
    //         const query = 'INSERT INTO `guests` (name, phone, email, address) VALUES (?, ?, ?, ?)';
    //         const values = [name, phone, email, address];    
    //         connection.query(query, values, function(err, rows) {
    //             if (!err) {
    //                 resolve(rows);
    //             } else {
    //                 reject(err);
    //             }
    //         });
    //     });
    // };  

        // Insert a guest's information
this.guest_register = function (phone, name, email, address) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO `guests` (name, phone, email, address) VALUES (?, ?, ?, ?)';
        const values = [phone, name, email, address];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

    

    this.getAllGuests = function () {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `guests`';
            connection.query(query, (err, rows) => {
                if (err) {
                    console.error('Database Fetch Error:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };




    // Update a guest's information
this.edit_guest = function (id, name, email, address) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE `guests` SET name = ?, email = ?, address = ? WHERE id = ?';
        const values = [name, email, address, id];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Delete a guest
this.delete_guest = function (id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `guests` WHERE id = ?';
        connection.query(query, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};





}
module.exports = new GuestModel();