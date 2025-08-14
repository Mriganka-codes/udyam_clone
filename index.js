const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Validation Rules (from your script.js) ---
const validationRules = {
    aadhaar: /^\d{12}$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    mobile: /^[6-9]\d{9}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pincode: /^\d{6}$/,
    gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
};

const enterpriseTypes = [
    "proprietorship", "partnership", "llp", "pvt_ltd", "public_ltd",
    "huf", "cooperative", "trust", "society"
];

// --- API Endpoint: POST /api/register ---
app.post(
    '/api/register',
    [
        // 1. Aadhaar and Entrepreneur Name Validation
        body('aadhaarNumber').matches(validationRules.aadhaar).withMessage('Invalid 12-digit Aadhaar number.'),
        body('entrepreneurName').notEmpty().withMessage('Entrepreneur name is required.'),

        // 2. Enterprise Details Validation
        body('enterpriseName').notEmpty().withMessage('Enterprise name is required.'),
        body('enterpriseType').isIn(enterpriseTypes).withMessage('Invalid enterprise type.'),
        body('panNumber').matches(validationRules.pan).withMessage('Invalid PAN number format.'),
        body('gstinNumber').optional().matches(validationRules.gstin).withMessage('Invalid GSTIN number format.'),
        body('mobileNumber').matches(validationRules.mobile).withMessage('Invalid 10-digit mobile number.'),
        body('emailId').isEmail().withMessage('Invalid email address.'),
        body('district').notEmpty().withMessage('District is required.'),
        body('pinCode').matches(validationRules.pincode).withMessage('Invalid 6-digit PIN code.'),
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const formData = req.body;

        try {
            // Generate a unique registration ID
            const registrationId = `UDYAM-AS-${Date.now()}`;

            // Save submission to PostgreSQL using Prisma
            const newRegistration = await prisma.udyamRegistration.create({
                data: {
                    ...formData,
                    registrationId,
                },
            });

            console.log('Registration submitted:', newRegistration);

            res.status(201).json({
                message: 'Registration submitted successfully!',
                registrationId: newRegistration.registrationId,
                data: newRegistration,
            });

        } catch (error) {
            // Handle potential errors, like a duplicate email
            if (error.code === 'P2002' && error.meta?.target?.includes('emailId')) {
                return res.status(409).json({ error: 'An account with this email already exists.' });
            }
            console.error('Registration failed:', error);
            res.status(500).json({ error: 'Registration failed. Please try again.' });
        }
    }
);

// --- Start the Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
module.exports = { app, prisma };