const express = require('express');
const request = require('supertest');
const route = require('../src/routes/app');
const postsRouter = require('../src/routes/posts');
const authRouter = require('../src/routes/author');
const categoryRouter = require('../src/routes/category');
const tagRouter = require('../src/routes/tag');
const mediaRouter = require('../src/routes/media');

// Mock các router để kiểm tra
jest.mock('../src/routes/posts');
jest.mock('../src/routes/author');
jest.mock('../src/routes/category');
jest.mock('../src/routes/tag');
jest.mock('../src/routes/media');

describe('Test API routes', () => {
    let app;

    beforeEach(() => {
        app = express();
        route(app); // Sử dụng route trong app
    });

    it('should use the auth router with the correct prefix', async () => {
        await request(app).get('/api/v1/auth');
        expect(authRouter).toHaveBeenCalled();
    });

    it('should use the posts router with the correct prefix', async () => {
        await request(app).get('/api/v1/posts');
        expect(postsRouter).toHaveBeenCalled();
    });

    it('should use the tag router with the correct prefix', async () => {
        await request(app).get('/api/v1/tag');
        expect(tagRouter).toHaveBeenCalled();
    });

    it('should use the category router with the correct prefix', async () => {
        await request(app).get('/api/v1/category');
        expect(categoryRouter).toHaveBeenCalled();
    });

    it('should use the media router with the correct prefix', async () => {
        await request(app).get('/api/v1/media');
        expect(mediaRouter).toHaveBeenCalled();
    });
});
