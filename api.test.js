const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Mock Prisma Client to avoid hitting the actual database during tests
jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        udyamRegistration: {
            create: jest.fn(),
            findUnique: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

// We need to re-require the app setup after mocking
let app;
let prisma;

describe('Udyam API Endpoints', () => {

    beforeAll(() => {
        // Load the app after mocks are set up
        const api = require('./index'); // Assuming your express app is exported from index.js
        app = api.app; // You'll need to export your app from index.js
        prisma = api.prisma; // And prisma instance
    });

    beforeEach(() => {
        // Reset mocks before each test
        prisma.udyamRegistration.create.mockClear();
        prisma.udyamRegistration.findUnique.mockClear();
    });

    // Test case for a successful registration
    test('POST /api/register should create a new registration with valid data', async () => {
        const validData = {
            aadhaarNumber: "123456789012",
            entrepreneurName: "Test User",
            enterpriseName: "TestCorp",
            enterpriseType: "pvt_ltd",
            panNumber: "FGHIJ5678K",
            mobileNumber: "9988776655",
            emailId: "test.success@example.com",
            district: "silchar",
            pinCode: "788001"
        };
        
        // Mock the successful database creation
        prisma.udyamRegistration.create.mockResolvedValue({ id: 1, ...validData, registrationId: 'UDYAM-AS-MOCK123' });

        const response = await request(app)
            .post('/api/register')
            .send(validData);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Registration submitted successfully!');
        expect(response.body).toHaveProperty('registrationId');
    });

    // Test case for invalid data
    test('POST /api/register should return 400 for invalid data (e.g., bad PAN)', async () => {
        const invalidData = {
            aadhaarNumber: "123456789012",
            entrepreneurName: "Test User",
            enterpriseName: "TestCorp",
            enterpriseType: "pvt_ltd",
            panNumber: "INVALID_PAN", // Invalid PAN
            mobileNumber: "9988776655",
            emailId: "test.fail@example.com",
            district: "silchar",
            pinCode: "788001"
        };

        const response = await request(app)
            .post('/api/register')
            .send(invalidData);

        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('Invalid PAN number format.');
    });
    
    // Test case for missing required field
    test('POST /api/register should return 400 for missing required field (e.g., district)', async () => {
        const missingData = {
            aadhaarNumber: "123456789012",
            entrepreneurName: "Test User",
            enterpriseName: "TestCorp",
            enterpriseType: "pvt_ltd",
            panNumber: "FGHIJ5678K",
            mobileNumber: "9988776655",
            emailId: "test.missing@example.com",
            // district is missing
            pinCode: "788001"
        };
        
        const response = await request(app)
            .post('/api/register')
            .send(missingData);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('District is required.');
    });
});