# Testing

This document outlines the testing strategy and coverage.

## Coverage of Edge Cases

The project has a good set of tests that cover various edge cases for both the frontend and backend.

### Frontend Testing (`script.test.js`)

The frontend tests are written using Jest and JSDOM. JSDOM is used to create a virtual DOM environment, which allows the tests to interact with the form and validate its behavior without a browser. The tests cover the following scenarios:

-   **Invalid Input:** It tests how the form handles invalid input for fields like PAN number and Aadhaar number. It asserts that the correct error messages are displayed and that the input fields are highlighted as invalid.
-   **Valid Input:** It tests that the form handles valid input correctly and that no error messages are displayed.
-   **Required Fields:** It tests that the form correctly validates that required fields, such as the enterprise name, are not empty.

### Backend Testing (`api.test.js`)

The backend tests are written using Jest and Supertest. Supertest is used to make HTTP requests to the API endpoints and assert the responses. The Prisma client is mocked to isolate the tests from the database. The tests cover the following scenarios:

-   **Successful Registration:** It tests that the API returns a `201 Created` status code and the registration data when valid data is submitted.
-   **Invalid Data:** It tests that the API returns a `400 Bad Request` status code and a list of validation errors when invalid data is submitted (e.g., an invalid PAN number).
-   **Missing Required Fields:** It tests that the API returns a `400 Bad Request` status code and a validation error when a required field is missing from the request body.

The tests for both the frontend and backend provide good coverage of edge cases and help to ensure the quality and reliability of the application.
