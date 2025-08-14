# Backend

This document outlines the backend architecture and logic.

## REST API Correctness

The backend exposes a single REST API endpoint: `POST /api/register`. This endpoint is responsible for handling the submission of the Udyam registration form. The implementation follows RESTful principles:

-   **HTTP Verb:** It correctly uses the `POST` verb to create a new resource (a new registration).
-   **Status Codes:** It returns appropriate HTTP status codes:
    -   `201 Created` on successful submission.
    -   `400 Bad Request` if validation fails.
    -   `409 Conflict` if a registration with the same email already exists.
    -   `500 Internal Server Error` for other server-side errors.
-   **Response Body:** The response body for a successful submission includes the newly created registration data, including the unique `registrationId`.

## Validation Logic

The backend implements robust validation logic using the `express-validator` library. The validation rules are defined in `index.js` and are applied to the incoming request body of the `/api/register` endpoint. The validation covers:

-   **Format Validation:** It uses regular expressions to validate the format of fields like Aadhaar number, PAN number, mobile number, and GSTIN.
-   **Presence Validation:** It ensures that required fields like `entrepreneurName` and `enterpriseName` are not empty.
-   **Email Validation:** It uses the `isEmail()` validator to ensure that the email address is in a valid format.
-   **Enum Validation:** It checks that the `enterpriseType` is one of the allowed values.

## Database Schema Design

The database schema is defined in `prisma/schema.prisma` and is managed using Prisma ORM. The schema consists of a single model, `UdyamRegistration`, which maps to a table in the PostgreSQL database. The schema is well-designed for the application's needs:

-   **Fields:** The model includes all the necessary fields to store the registration data.
-   **Data Types:** The data types are appropriate for the data being stored (e.g., `String`, `Int`, `DateTime`).
-   **Constraints:** It uses the `@unique` attribute to enforce uniqueness on the `registrationId` and `emailId` fields, which prevents duplicate registrations.
-   **Default Values:** It uses the `@default(now())` attribute to automatically set the `submittedAt` timestamp when a new registration is created.
