const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Load the UdyamRegistrationForm class from the script file
const scriptFile = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
// Load the HTML file to provide a DOM for the script
const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

describe('UdyamRegistrationForm Frontend Validation', () => {
    let document;
    let form;

    beforeEach(() => {
        // Set up a new DOM environment for each test
        const dom = new JSDOM(html, { runScripts: "dangerously" });
        document = dom.window.document;

        // Execute the script within the JSDOM context
        const scriptEl = document.createElement("script");
        scriptEl.textContent = scriptFile;
        document.body.appendChild(scriptEl);
        
        // The script initializes the form automatically on DOMContentLoaded
        // We can access the instance if needed, or just test the DOM changes.
        form = new dom.window.UdyamRegistrationForm();
    });

    test('should show an error for an invalid PAN number', () => {
        const panInput = document.getElementById('panNumber');
        const panError = document.getElementById('panError');

        panInput.value = 'INVALIDPAN';
        // Manually trigger the validation function
        const isValid = form.validatePAN(panInput.value);

        expect(isValid).toBe(false);
        expect(panInput.classList.contains('error')).toBe(true);
        expect(panError.textContent).toBe('Please enter a valid PAN number (e.g., ABCDE1234F)');
    });

    test('should show success for a valid PAN number', () => {
        const panInput = document.getElementById('panNumber');
        const panError = document.getElementById('panError');

        panInput.value = 'ABCDE1234F';
        const isValid = form.validatePAN(panInput.value);

        expect(isValid).toBe(true);
        expect(panInput.classList.contains('error')).toBe(false);
        expect(panError.textContent).toBe('');
    });
    
    test('should show an error for an invalid Aadhaar number', () => {
        const aadhaarInput = document.getElementById('aadhaarNumber');
        const aadhaarError = document.getElementById('aadhaarError');

        aadhaarInput.value = '1234567890'; // Only 10 digits
        const isValid = form.validateAadhaar(aadhaarInput.value);

        expect(isValid).toBe(false);
        expect(aadhaarInput.classList.contains('error')).toBe(true);
        expect(aadhaarError.textContent).toBe('Please enter a valid 12-digit Aadhaar number');
    });

    test('should show success for a valid Aadhaar number', () => {
        const aadhaarInput = document.getElementById('aadhaarNumber');
        const aadhaarError = document.getElementById('aadhaarError');

        aadhaarInput.value = '123456789012';
        const isValid = form.validateAadhaar(aadhaarInput.value);

        expect(isValid).toBe(true);
        expect(aadhaarInput.classList.contains('error')).toBe(false);
        expect(aadhaarError.textContent).toBe('');
    });

    test('should require enterprise name on Step 2 validation', () => {
        // Set up the form for step 2
        document.getElementById('enterpriseName').value = ''; // Empty name
        document.getElementById('enterpriseType').value = 'proprietorship';
        document.getElementById('panNumber').value = 'ABCDE1234F';
        document.getElementById('mobileNumber').value = '9876543210';
        document.getElementById('emailId').value = 'test@test.com';
        document.getElementById('district').value = 'guwahati';
        document.getElementById('pinCode').value = '781001';

        const isValid = form.validateStep2();
        const nameError = document.getElementById('enterpriseNameError');

        expect(isValid).toBe(false);
        expect(nameError.textContent).toBe('Please enter enterprise name');
    });
});