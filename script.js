class UdyamRegistrationForm {
    constructor() {
        this.currentStep = 1;
        // This is changed: formData is now populated in one go.
        this.formData = {}; 
        this.initializeEventListeners();
        this.setupValidation();
    }

    initializeEventListeners() {
        // Step 1 - OTP Generation
        document.getElementById('validateOtpBtn').addEventListener('click', () => {
            this.handleOtpGeneration();
        });

        // Step 1 - OTP Verification
        document.getElementById('verifyOtpBtn').addEventListener('click', () => {
            this.handleOtpVerification();
        });

        // Step 2 - Back button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.goToStep(1);
        });

        // Form submission
        document.getElementById('udyamForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // PIN code auto-fill
        document.getElementById('pinCode').addEventListener('blur', () => {
            this.handlePinCodeLookup();
        });

        // Real-time validation
        this.setupRealTimeValidation();
    }

    setupRealTimeValidation() {
        // Aadhaar number formatting and validation
        document.getElementById('aadhaarNumber').addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
            this.validateAadhaar(value.replace(/\s/g, ''));
        });

        // PAN number validation
        document.getElementById('panNumber').addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
            this.validatePAN(e.target.value);
        });

        // Mobile number validation
        document.getElementById('mobileNumber').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            this.validateMobile(e.target.value);
        });

        // Email validation
        document.getElementById('emailId').addEventListener('blur', (e) => {
            this.validateEmail(e.target.value);
        });
    }

    setupValidation() {
        this.validationRules = {
            aadhaar: /^\d{12}$/,
            pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
            mobile: /^[6-9]\d{9}$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            pincode: /^\d{6}$/,
            gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
        };
    }

    validateAadhaar(aadhaar) {
        const errorElement = document.getElementById('aadhaarError');
        const inputElement = document.getElementById('aadhaarNumber');
        
        if (aadhaar.length === 0) {
            this.clearValidation(inputElement, errorElement);
            return false;
        }

        if (!this.validationRules.aadhaar.test(aadhaar)) {
            this.showValidationError(inputElement, errorElement, 'Please enter a valid 12-digit Aadhaar number');
            return false;
        }

        this.showValidationSuccess(inputElement, errorElement);
        return true;
    }

    validatePAN(pan) {
        const errorElement = document.getElementById('panError');
        const inputElement = document.getElementById('panNumber');
        
        if (pan.length === 0) {
            this.clearValidation(inputElement, errorElement);
            return false;
        }

        if (!this.validationRules.pan.test(pan)) {
            this.showValidationError(inputElement, errorElement, 'Please enter a valid PAN number (e.g., ABCDE1234F)');
            return false;
        }

        this.showValidationSuccess(inputElement, errorElement);
        return true;
    }

    validateMobile(mobile) {
        const errorElement = document.getElementById('mobileError');
        const inputElement = document.getElementById('mobileNumber');
        
        if (mobile.length === 0) {
            this.clearValidation(inputElement, errorElement);
            return false;
        }

        if (!this.validationRules.mobile.test(mobile)) {
            this.showValidationError(inputElement, errorElement, 'Please enter a valid 10-digit mobile number');
            return false;
        }

        this.showValidationSuccess(inputElement, errorElement);
        return true;
    }

    validateEmail(email) {
        const errorElement = document.getElementById('emailError');
        const inputElement = document.getElementById('emailId');
        
        if (email.length === 0) {
            this.clearValidation(inputElement, errorElement);
            return false;
        }

        if (!this.validationRules.email.test(email)) {
            this.showValidationError(inputElement, errorElement, 'Please enter a valid email address');
            return false;
        }

        this.showValidationSuccess(inputElement, errorElement);
        return true;
    }

    showValidationError(inputElement, errorElement, message) {
        inputElement.classList.add('error');
        errorElement.textContent = message;
    }

    showValidationSuccess(inputElement, errorElement) {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
    }

    clearValidation(inputElement, errorElement) {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
    }

    async handleOtpGeneration() {
        const aadhaar = document.getElementById('aadhaarNumber').value.replace(/\s/g, '');
        const name = document.getElementById('entrepreneurName').value.trim();
        const consent = document.getElementById('aadhaarConsent').checked;

        // Validate inputs
        let isValid = true;
        
        if (!this.validateAadhaar(aadhaar)) {
            isValid = false;
        }

        if (!name) {
            this.showValidationError(
                document.getElementById('entrepreneurName'),
                document.getElementById('nameError'),
                'Please enter the entrepreneur name'
            );
            isValid = false;
        }

        if (!consent) {
            alert('Please provide consent for Aadhaar usage');
            isValid = false;
        }

        if (!isValid) return;

        // Show loading
        const spinner = document.getElementById('otpSpinner');
        const btn = document.getElementById('validateOtpBtn');
        spinner.style.display = 'inline-block';
        btn.disabled = true;

        try {
            // Simulate API call
            await this.simulateApiCall(2000);
            
            // Show OTP section
            document.getElementById('otpSection').style.display = 'block';
            document.getElementById('validateOtpBtn').textContent = 'Resend OTP';
            
            // Show success message
            alert('OTP sent successfully to your registered mobile number');
            
        } catch (error) {
            alert('Failed to send OTP. Please try again.');
        } finally {
            spinner.style.display = 'none';
            btn.disabled = false;
        }
    }

    async handleOtpVerification() {
        const otp = document.getElementById('otpCode').value.trim();
        
        if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
            this.showValidationError(
                document.getElementById('otpCode'),
                document.getElementById('otpError'),
                'Please enter a valid 6-digit OTP'
            );
            return;
        }

        // Show loading
        const spinner = document.getElementById('verifySpinner');
        const btn = document.getElementById('verifyOtpBtn');
        spinner.style.display = 'inline-block';
        btn.disabled = true;

        try {
            // Simulate API call
            await this.simulateApiCall(1500);
            
            // Move to step 2
            this.goToStep(2);
            
        } catch (error) {
            this.showValidationError(
                document.getElementById('otpCode'),
                document.getElementById('otpError'),
                'Invalid OTP. Please try again.'
            );
        } finally {
            spinner.style.display = 'none';
            btn.disabled = false;
        }
    }

    async handlePinCodeLookup() {
        const pinCode = document.getElementById('pinCode').value.trim();
        
        if (this.validationRules.pincode.test(pinCode)) {
            // Simulate PIN code lookup API
            try {
                const locationData = await this.lookupPinCode(pinCode);
                if (locationData) {
                    // Auto-populate district if found
                    const districtSelect = document.getElementById('district');
                    const matchingOption = Array.from(districtSelect.options).find(
                        option => option.text.toLowerCase().includes(locationData.district.toLowerCase())
                    );
                    if (matchingOption) {
                        districtSelect.value = matchingOption.value;
                    }
                }
            } catch (error) {
                console.log('PIN code lookup failed');
            }
        }
    }

    async lookupPinCode(pinCode) {
        // Simulate PIN code lookup - in real implementation, use PostPin API
        const mockData = {
            '788001': { district: 'Silchar', state: 'Assam' },
            '781001': { district: 'Guwahati', state: 'Assam' },
            '786001': { district: 'Dibrugarh', state: 'Assam' },
            '785001': { district: 'Jorhat', state: 'Assam' },
            '784001': { district: 'Tezpur', state: 'Assam' }
        };
        
        await this.simulateApiCall(500);
        return mockData[pinCode] || null;
    }

    async handleFormSubmission() {
        // Validate all Step 2 fields
        let isValid = this.validateStep2();
        
        if (!isValid) {
            alert('Please fix all validation errors before submitting');
            return;
        }

        // Show loading spinner
        const spinner = document.getElementById('submitSpinner');
        const btn = document.getElementById('submitBtn');
        spinner.style.display = 'inline-block';
        btn.disabled = true;

        try {
            // Collect all form data
            this.collectFormData();
            
            // --- UPDATED ---
            // Send data to the real backend API
            const result = await this.submitRegistration();
            
            // Show success message with the real registration ID from the server
            this.showSuccessMessage(result.registrationId);
            
        } catch (error) {
            // Display specific error from the server, or a generic one
            alert(`Registration failed: ${error.message}`);
        } finally {
            // Hide loading spinner
            spinner.style.display = 'none';
            btn.disabled = false;
        }
    }

    validateStep2() {
        let isValid = true;
        
        // Enterprise name
        const enterpriseName = document.getElementById('enterpriseName').value.trim();
        if (!enterpriseName) {
            this.showValidationError(
                document.getElementById('enterpriseName'),
                document.getElementById('enterpriseNameError'),
                'Please enter enterprise name'
            );
            isValid = false;
        }

        // Enterprise type
        const enterpriseType = document.getElementById('enterpriseType').value;
        if (!enterpriseType) {
            this.showValidationError(
                document.getElementById('enterpriseType'),
                document.getElementById('enterpriseTypeError'),
                'Please select enterprise type'
            );
            isValid = false;
        }

        // PAN validation
        const pan = document.getElementById('panNumber').value.trim();
        if (!this.validatePAN(pan)) {
            isValid = false;
        }

        // GSTIN validation (if provided)
        const gstin = document.getElementById('gstinNumber').value.trim();
        if (gstin && !this.validationRules.gstin.test(gstin)) {
            this.showValidationError(
                document.getElementById('gstinNumber'),
                document.getElementById('gstinError'),
                'Please enter a valid GSTIN number'
            );
            isValid = false;
        }

        // Mobile validation
        const mobile = document.getElementById('mobileNumber').value.trim();
        if (!this.validateMobile(mobile)) {
            isValid = false;
        }

        // Email validation
        const email = document.getElementById('emailId').value.trim();
        if (!this.validateEmail(email)) {
            isValid = false;
        }

        // District validation
        const district = document.getElementById('district').value;
        if (!district) {
            this.showValidationError(
                document.getElementById('district'),
                document.getElementById('districtError'),
                'Please select district'
            );
            isValid = false;
        }

        // PIN code validation
        const pinCode = document.getElementById('pinCode').value.trim();
        if (!this.validationRules.pincode.test(pinCode)) {
            this.showValidationError(
                document.getElementById('pinCode'),
                document.getElementById('pinError'),
                'Please enter a valid 6-digit PIN code'
            );
            isValid = false;
        }

        return isValid;
    }

    collectFormData() {
        // Collects all data just before submission
        this.formData = {
            aadhaarNumber: document.getElementById('aadhaarNumber').value.replace(/\s/g, ''),
            entrepreneurName: document.getElementById('entrepreneurName').value.trim(),
            enterpriseName: document.getElementById('enterpriseName').value.trim(),
            enterpriseType: document.getElementById('enterpriseType').value,
            panNumber: document.getElementById('panNumber').value.trim(),
            gstinNumber: document.getElementById('gstinNumber').value.trim(),
            mobileNumber: document.getElementById('mobileNumber').value.trim(),
            emailId: document.getElementById('emailId').value.trim(),
            district: document.getElementById('district').value,
            pinCode: document.getElementById('pinCode').value.trim()
        };
    }

    async submitRegistration() {
        // --- NEW: This function now sends a real API request ---
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.formData),
        });

        const result = await response.json();

        if (!response.ok) {
            // Handle errors from the server (e.g., validation, duplicates)
            let errorMessage = result.error || 'An unknown server error occurred.';
            if (result.errors) {
                // Combine validation errors into a single string
                errorMessage = result.errors.map(e => e.msg).join(', ');
            }
            throw new Error(errorMessage);
        }
        
        // Return the successful response from the server
        return result;
    }

    showSuccessMessage(registrationId) {
        // --- UPDATED: Accepts registrationId from the server ---
        const successHtml = `
            <div style="text-align: center; padding: 2rem; background: #f0fff4; border: 2px solid #68d391; border-radius: 8px; margin: 2rem 0;">
                <h2 style="color: #22543d; margin-bottom: 1rem;">Registration Submitted Successfully!</h2>
                <p style="color: #2d3748; margin-bottom: 1rem;">
                    Your Udyam Registration has been submitted successfully.
                </p>
                <div style="background: white; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
                    <strong>Registration ID: ${registrationId}</strong>
                </div>
                <p style="font-size: 0.9rem; color: #4a5568;">
                    Please save this Registration ID for future reference. 
                    You will receive a confirmation email at ${this.formData.emailId}
                </p>
                <button onclick="window.print()" style="margin-top: 1rem; padding: 0.5rem 2rem; background: #4299e1; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Print Receipt
                </button>
            </div>
        `;
        
        document.querySelector('.form-container').innerHTML = successHtml;
    }

    goToStep(step) {
        // Hide all steps
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'none';
        
        // Show target step
        document.getElementById('step' + step).style.display = 'block';
        
        // Update progress tracker
        document.querySelectorAll('.step').forEach((stepEl, index) => {
            if (index + 1 <= step) {
                stepEl.classList.add('active');
            } else {
                stepEl.classList.remove('active');
            }
        });
        
        this.currentStep = step;
    }

    async simulateApiCall(delay = 1000) {
        // This is now only used for the OTP simulation
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) { // 90% success rate
                    resolve();
                } else {
                    reject(new Error('API call failed'));
                }
            }, delay);
        });
    }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UdyamRegistrationForm();
});
if (typeof window !== 'undefined') {
    window.UdyamRegistrationForm = UdyamRegistrationForm;
}