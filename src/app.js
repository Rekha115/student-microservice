const express = require("express");

const app = express();

app.use(express.json());

// Sample student data
let students = [
    {
        id: 1,
        name: "Rekha",
        course: "CSE",
        year: 2
    },
    {
        id: 2,
        name: "Aman",
        course: "CSE",
        year: 2
    }
];

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Student Management Microservice is running!"
    });
});

// Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// Get student by ID
app.get("/students/:id", (req, res) => {
    const student = students.find(
        student => student.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// Add a new student
app.post("/students", (req, res) => {
    const { name, course, year } = req.body;

    if (!name || !course || !year) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name: name,
        course: course,
        year: year
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// Delete a student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(
        student => student.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

// Port
const PORT = process.env.PORT || 3000;

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;