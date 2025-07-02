var StudentModel = require('../../../models/backend/home/StudentModel');
 
const fs = require("fs");
const path = require("path");
const multer = require("multer"); 
function StudentController() { 

      this.newstudents = function (req, res) { 
        Promise.all([StudentModel.getStudentLevels()])
        .then(([levels]) => {
                res.render('backend/home/students.ejs', { title: 'Dental clinic', content: 'New students', 
                    levels: levels            
                });
            })
            .catch(err => {
                res.status(500).send({ error: 'Failed to fetch students data', details: err });
            });
    }; 

    



 this.studentviews = function (req, res) {
    
    StudentModel.getAllstudents()
        .then(students => {
            res.render('backend/home/studentsview.ejs', { title: 'Dental clinic', content: 'Students', data: students });
        })
        .catch(err => {
            res.status(500).send({ error: 'Failed to fetch students data', details: err });
        });
}; 

 

this.vistudentcontroll = function (req, res) {
    Promise.all([StudentModel.getAllstudents(), StudentModel.getAllControllStudents()])
        .then(([students, stdcontrol]) => {
            res.render('backend/home/StudentsControll.ejs', { 
                title: 'Dental clinic', 
                content: 'Dental clinic', 
                stdcontrol: stdcontrol, 
                students: students 
            });
        })
        .catch(err => {
            res.status(500).send({ error: 'Failed to fetch data', details: err });
        });
};




// Student Registration Function
this.student_register = function (req, res) {

    console.log("✅ Multer executed successfully");

// Define upload directory (Ensure it's correct)

const uploadDir = path.join(__dirname, "../../../assets/dist/users");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("✅ Upload directory created:", uploadDir);
} else {
    console.log("✅ Upload directory exists:", uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      //  console.log("📁 Saving file to:", uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = "user_" + Date.now() + path.extname(file.originalname);
        console.log("📝 Generated filename:", uniqueName);
        cb(null, uniqueName);
    }
});

// File Type Checking Function
function checkFileType(file, cb) {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.error("❌ Invalid file type:", file.mimetype);
        cb(new Error("Invalid file type"), false);
    }
}

// Multer Middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit: 10MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single("userimages"); // Ensure this matches the form field name



    console.log("📩 Student registration request received");

    upload(req, res, (err) => {
        if (err) {
            console.error("❌ Multer error:", err);
            return res.status(500).json({ error: "File upload failed", details: err.message });
        } 

        let fileUrl = null;
        if (req.file) {
           // console.log("🖼️ Uploaded file details:", req.file);
            fileUrl = req.file.path.replace(/\\/g, "/"); // Normalize path
            // Optionally, you can store the path in your database here
        } else {
            console.warn("⚠️ No file uploaded");
        }

        
    const { name, phone, email, address, gender, editLevel } = req.body;

    if (!name || !phone || !email || !address || gender === undefined || editLevel === undefined) {
        console.warn("⚠️ Missing required fields");
        return res.status(400).json({ message: "All fields are required" });
    }
    

    
        console.log("Data for analyse : " + editLevel)

        // Insert student record into the database
        StudentModel.student_register(name, phone, email, address, gender, editLevel, fileUrl)
            .then(() => {
                console.log("✅ Student inserted successfully!");
                res.status(200).send({ message: "Student inserted successfully!", fileUrl });
            })
            .catch(err => {
                console.error("❌ Database error:", err);
                res.status(500).send({ error: "Failed to insert student", details: err });
            });
    });
};



// Route to handle student edit
this.edit_student = function (req, res) {
    const { id, name, email, address } = req.body; 

   // console.log('Incoming Data new :', { id, name, email, address } );

    StudentModel.edit_student(id, name, email, address)
        .then(() => res.status(200).send({ message: 'student updated successfully!' }))
        .catch(err => res.status(500).send({ error: 'Failed to update student', details: err }));
};

// Route to handle student delete
this.delete_student = function (req, res) {
    const { id } = req.body;
    StudentModel.delete_student(id)
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
 
   
   StudentModel.studentControll_register(stdid,desc )
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
    
        StudentModel.edit_std_controll(description, id)
            .then(() => res.status(200).send({ message: 'Student controll updated successfully!' }))
            .catch(err => {
                console.error('Update Error:', err);
                res.status(500).send({ error: 'Failed to update student controll', details: err });
            });
    };
    


    // Route to handle student controll delete
this.delete_std_controll = function (req, res) {
    const { id } = req.body;
    StudentModel.delete_std_controll(id)
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
        StudentModel.getAllstdControl_filter(startDate, endDate),
        StudentModel.getAllstudents()
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
    Promise.all([StudentModel.getAllstudents(), StudentModel.getGraduateStudents()])
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
 
   StudentModel.GraduateStudents_register(stdid,description, graduatedate )
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
       StudentModel.getGraduateStudents_filter(startDate, endDate),
       StudentModel.getAllstudents()
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

    StudentModel.edit_graduates(description, id)
        .then(() => res.status(200).send({ message: 'Graduate student updated successfully!' }))
        .catch(err => {
            console.error('Update Error:', err);
            res.status(500).send({ error: 'Failed to update Graduate student ', details: err });
        });
};



    // Route to handle student controll delete
    this.delete_graduates = function (req, res) {
        const { id } = req.body;
        StudentModel.delete_graduates(id)
            .then(() => res.status(200).send({ message: 'Graduate student deleted successfully!' }))
            .catch(err => res.status(500).send({ error: 'Failed to delete Graduate student ', details: err }));
    };




}
module.exports = new StudentController;