const request = require("supertest");
const app = require("../src/app");

describe("Student Management Microservice", () => {

    // Test 1
    test("GET / should return running message", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            "Student Management Microservice is running!"
        );
    });

    // Test 2
    test("GET /students should return students", async () => {
        const response = await request(app).get("/students");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test 3
    test("POST /students should create a student", async () => {
        const response = await request(app)
            .post("/students")
            .send({
                name: "Riya",
                course: "CSE",
                year: 2
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("Riya");
    });

    // Test 4
    test("POST /students should reject missing data", async () => {
        const response = await request(app)
            .post("/students")
            .send({
                name: "Test Student"
            });

        expect(response.statusCode).toBe(400);
    });

    // Test 5
    test("GET /students/999 should return 404", async () => {
        const response = await request(app)
            .get("/students/999");

        expect(response.statusCode).toBe(404);
    });

});