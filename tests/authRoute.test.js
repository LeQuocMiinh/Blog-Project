const request = require('supertest');
const express = require('express');
const authRouter = require('../src/routes/author'); // Đường dẫn đến file authRouter
const authorController = require('../src/app/controllers/AuthorController');
const { authenticate } = require('../src/app/middlewares/authorized');

const app = express();
app.use(express.json()); // Để xử lý các request với JSON body
app.use('/api/v1/auth', authRouter); // Sử dụng authRouter với prefix "/api/v1/auth"

jest.mock('../src/app/controllers/AuthorController'); // Mock authorController
jest.mock('../src/app/middlewares/authorized'); // Mock middleware authenticate

describe('Test authRouter', () => {

    it('should call fetchUser with authentication middleware on GET /fetch-user', async () => {
        authenticate.mockImplementation((req, res, next) => next()); // Giả lập authenticate middleware luôn cho phép
        authorController.fetchUser.mockImplementation((req, res) => res.status(200).send({ message: 'Success' }));

        const res = await request(app).get('/api/v1/auth/fetch-user');
        expect(authenticate).toHaveBeenCalled(); // Kiểm tra middleware được gọi
        expect(authorController.fetchUser).toHaveBeenCalled(); // Kiểm tra controller được gọi
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Success');
    });

    it('should call register on POST /register', async () => {
        const mockUser = { name: 'testuser', email: '123123@gmail.com', password: 'password' };

        // Mock implementation for the register function
        authorController.register.mockImplementation((req, res) => res.status(201).send({ message: 'User registered' }));

        // Send POST request to the API
        const response = await request(app).post('/api/v1/auth/register').send(mockUser);

        // Verify the controller was called
        expect(authorController.register).toHaveBeenCalled();

        // Check the response status and body
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered');
    });


    it('should call login on POST /login', async () => {
        const mockLogin = { email: '123123@gmail.com', password: 'password' };

        // Mock implementation for the login function
        authorController.login.mockImplementation((req, res) => res.status(200).send({ token: 'fake-jwt-token' }));

        // Send POST request to the API
        const response = await request(app).post('/api/v1/auth/login').send(mockLogin);

        // Verify the controller was called
        expect(authorController.login).toHaveBeenCalled();

        // Check the response status and body
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBe('fake-jwt-token');
    });


    it('should call logout on POST /logout', async () => {
        authorController.logout.mockImplementation((req, res) => res.status(200).send({ message: 'Logged out' }));

        const res = await request(app).post('/api/v1/auth/logout');
        expect(authorController.logout).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Logged out');
    });
});
