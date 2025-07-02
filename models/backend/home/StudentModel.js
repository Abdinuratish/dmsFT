function StudentModel(){

        // Insert a student's information
this.student_register = function (phone, name, email, address, gender, editLevel, url) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO `students` (name, phone, email, address, gender, level,url) VALUES (?, ?, ?, ?, ?, ?,?)';
        const values = [phone, name, email, address, gender, editLevel, url];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};   


this.studentControll_register = function (stdid,desc ) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO `studentsconrtoll` (`stdid`, `description`) VALUES (?, ?)';
        const values = [stdid,desc ];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};   



this.getStudentLevels = function () {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM `levels`';
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


this.getAllstudents = function () {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                s.id,
                s.name,
                s.email,
                s.address,
                l.NAME AS LEVEL,  
                s.phone,
                SUBSTRING_INDEX(s.url, 'assets', -1) AS url, 
                DATE_FORMAT(s.createddate, '%Y/%m/%d %H:%i:%s') AS createddate
            FROM 
                students s
            JOIN 
                levels l 
            ON 
                l.id = s.LEVEL;
        `;

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


this.getAllstudents222 = function () {
    return new Promise((resolve, reject) => {
    const query = `
        SELECT s.id,
             s.name,
             s.email,
             s.address,
             l.NAME LEVEL,  
             s.phone,
             s.url url,
             DATE_FORMAT(s.createddate, '%Y/%m/%d %H:%i:%s') AS createddate
        FROM 
            students s
        JOIN 
            levels l 
        ON 
            l.id = s.LEVEL;
    `;
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


    this.getAllControllStudents = function () {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT 
                c.id,
                s.name,
                c.description AS \`desc\`, 
                s.phone,
                DATE_FORMAT(c.createddate, '%Y/%m/%d %H:%i:%s') AS createddate
            FROM 
                students s
            JOIN 
                studentsconrtoll c 
            ON 
                c.stdid = s.id;
        `;
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

    // Update a student's information
this.edit_student = function (id, name, email, address) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE `students` SET name = ?, email = ?, address = ? WHERE id = ?';
        const values = [name, email, address, id];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Delete a student
this.delete_student = function (id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `students` WHERE id = ?';
        connection.query(query, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}; 

  // Update a student's controll  information
  this.edit_std_controll = function (description, id) {
    return new Promise((resolve, reject) => {
      //  console.log('Updating:', { description, id }); // Log input data
        const query = 'UPDATE `studentsconrtoll` SET `description` = ? WHERE `id` = ?';
        const values = [description, id];

        connection.query(query, values, (err, result) => {
            if (err) {
                //console.error('SQL Error:', err); // Log SQL error
                return reject(err);
            }
            if (result.affectedRows === 0) {
                //console.warn('No rows updated. Check if the ID exists.'); // Log warning
                return reject(new Error('No rows updated'));
            }
           // console.log('Update successful:', result); // Log success
            resolve(result);
        });
    });
};


// Delete a student controll
this.delete_std_controll = function (id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `studentsconrtoll` WHERE id = ?';
        connection.query(query, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};  

this.getAllstdControl_filter = function (startdate, enddate) {
    // Log the startdate and enddate 
  return new Promise((resolve, reject) => {
      const query = `
          SELECT 
                c.id,
                s.name,
                c.description AS \`desc\`, 
                s.phone,
                DATE_FORMAT(c.createddate, '%Y/%m/%d %H:%i:%s') AS createddate
          FROM 
              students s
          JOIN 
              studentsconrtoll c 
          ON 
              s.id = c.stdid
          WHERE 
              c.createddate BETWEEN ? AND ? 
      `;

      // Use parameters to safely pass values
      const params = [startdate, enddate];

      connection.query(query, params, (err, rows) => {
          if (err) {
              console.error('Database Fetch Error:', err);
              reject(err);
          } else {
              resolve(rows);
          }
      });
  });
};


this.getGraduateStudents_filter = function (startdate, enddate) {
    // Log the startdate and enddate 
  return new Promise((resolve, reject) => {
      const query = `
          SELECT 
                g.id,
                s.name,
                g.description AS \`description\`, 
                s.phone,
                DATE_FORMAT(g.createddate, '%Y/%m/%d %H:%i:%s') AS createddate
          FROM 
              students s
          JOIN 
              Graduatestudents g 
          ON 
              s.id = g.stdid
          WHERE 
              g.createddate BETWEEN ? AND ? 
      `;

      // Use parameters to safely pass values
      const params = [startdate, enddate];

      connection.query(query, params, (err, rows) => {
          if (err) {
              console.error('Database Fetch Error:', err);
              reject(err);
          } else {
              resolve(rows);
          }
      });
  });
};

this.getGraduateStudents = function () {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT 
                g.id,
                s.name,
                g.description AS \`description\`, 
                s.phone,
                DATE_FORMAT(g.createddate, '%Y/%m/%d %H:%i:%s') AS createddate
          FROM 
              students s
          JOIN 
              Graduatestudents g 
          ON 
              s.id = g.stdid          
    `;
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




this.GraduateStudents_register = function (stdid,description , graduatedate) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO `Graduatestudents` (`stdid`, `description` , `graduatedate`) VALUES (?, ?, ?)';
        const values = [stdid,description , graduatedate];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}; 



  // Update a student's controll  information
  this.edit_graduates = function (description, id) {
    return new Promise((resolve, reject) => {
      //  console.log('Updating:', { description, id }); // Log input data
        const query = 'UPDATE `Graduatestudents` SET `description` = ? WHERE `id` = ?';
        const values = [description, id];

        connection.query(query, values, (err, result) => {
            if (err) {
                //console.error('SQL Error:', err); // Log SQL error
                return reject(err);
            }
            if (result.affectedRows === 0) {
                //console.warn('No rows updated. Check if the ID exists.'); // Log warning
                return reject(new Error('No rows updated'));
            }
           // console.log('Update successful:', result); // Log success
            resolve(result);
        });
    });
}; 

// Delete a student controll
this.delete_graduates = function (id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `Graduatestudents` WHERE id = ?';
        connection.query(query, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}; 


}
module.exports = new StudentModel();